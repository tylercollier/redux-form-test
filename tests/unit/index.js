import ContactFormComponent from '../../app/ContactFormComponent'
import React from 'react'

// See README for discussion of chai, enzyme, and sinon
import chai, { expect } from 'chai'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'

chai.use(chaiEnzyme())

// In this file we're doing unit testing of our component, which means it
// really has nothing to do with Redux-Form at this point. We can pass in our
// own props (e.g. `submitting`) and make sure our form renders as we expect.

describe("ContactFormComponent", () => {
	let subject = null
	let submitting, touched, error, resetForm, onSave, onSaveResponse
	beforeEach(() => {
		submitting = false
		touched = false
		error = null
		resetForm = sinon.spy()
		onSaveResponse = Promise.resolve()
		onSave = sinon.stub()
		onSave.returns(onSaveResponse)
	})
	const buildSubject = () => {
		const props = {
			onSave,
			submitting: submitting,
			// The real redux form has many properties for each field,
			// including onChange and onBlur handlers. We only need to provide
			// the ones that will change the rendered output.
			fields: {
				firstName: {
					value: '',
					touched: touched,
					error: error
				}
			},
			handleSubmit: fn => fn,
			resetForm
		}
		return shallow(<ContactFormComponent {...props}/>)
	}

	// Here we show we can test asychronous actions triggered by our form.
	it("calls resetForm after onSave", (done) => {
		subject = buildSubject()
		subject.find('form').simulate('submit')
		expect(onSave.callCount).to.equal(1)
		onSaveResponse.then(() => {
			expect(resetForm.callCount).to.equal(1)
			done()
		})
	})

	// This is a very simle test, making sure that if we pass in a certain
	// prop value, our form renders appropriately.
	context("when submitting", () => {
		it("shows a spinner while submitting", () => {
			submitting = true
			subject = buildSubject()
			const icon = subject.find('button[type="submit"]').find('i')
			expect(icon).to.have.className('glyphicon-refresh glyphicon-spin')
		})
	})

	// Again, we show that what we render is based on the props we send it. If
	// we set the props to include an error state, our form should render that
	// fact.
	context("when in an error state", () => {
		it("renders an error message for the input", () => {
			touched = true
			error = "Required"
			subject = buildSubject()
			const firstNameHelpBlock = subject.find('.help-block')
			expect(firstNameHelpBlock).to.exist
			expect(firstNameHelpBlock.text()).to.equal('Required')
		})
	})

	// See: https://github.com/tylercollier/redux-form-test/issues/4
	it.only("has access to form values in supplied submit handler in props", (done) => {
		subject = buildSubject()
		// Note: In the following line, using Enzyme's simulate(), we are
		// responsible for supplying what values are passed in the event, as
		// in the form submit. In real React, this would be a SyntheticEvent
		// object. See: https://facebook.github.io/react/docs/events.html. If
		// we used a SyntheticEvent in this test, our 'handleSubmit' function
		// (passed as a prop to ContactFormComponent) would need to do what
		// Redux-Form does: read the SyntheticEvent object, look at the form:
		// turn its inputs into a javascript object of keys and values from
		// our fields (e.g. { firstName: 'some value' }). A much easier way to
		// do this is to simply cheat: we pass the form values directly to
		// simulate(). I think it's perfectly valid for unit testing.
		subject.find('form').simulate('submit', { mykey: 'myvalue' })
		expect(onSave.callCount).to.equal(1)
		onSaveResponse.then(() => {
			// This isn't really the proof I'm trying to show off for github
			// issue #4. That proof is in the component itself. But here is
			// further proof that the values are going through. In case you're
			// not familiar, 'args' is from sinon, and it returns an array of
			// the number of calls, and each call is an array of arguments. So
			// here we look for the first call and its first (and only)
			// argument.
			expect(onSave.args[0][0]).to.eql({ mykey: 'myvalue' })
			done()
		}).catch(done)
	})
})