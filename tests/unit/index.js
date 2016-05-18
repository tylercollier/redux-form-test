import ContactFormComponent from '../../app/ContactFormComponent'
import React from 'react'

// See README for discussion of chai, enzyme, and sinon
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'

chai.use(sinonChai)
chai.use(chaiEnzyme())

// In this file we're doing unit testing of our component, which means it
// really has nothing to do with Redux-Form at this point. We can pass in our
// own props (e.g. `submitting`) and make sure our form renders as we expect.

describe("ContactFormComponent", () => {
	let onSave = null
	let subject = null
	let onSaveResponse = Promise.resolve()
	let resetForm = sinon.spy()
	let submitting = false
	const buildSubject = () => {
		onSave = sinon.stub()
		onSave.returns(Promise.resolve())
		const props = {
			onSave,
			submitting: submitting,
			// The real redux form has many properties for each field,
			// including onChange and onBlur handlers. We only need to provide
			// the ones we care about, which for these tests are basically
			// none.
			fields: {
				firstName: {
					value: ''
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
		expect(onSave).to.have.been.called
		onSaveResponse.then(() => {
			expect(resetForm).to.have.been.called
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
})