import ContactFormComponent, { renderTextInput } from '../../app/ContactFormComponent'
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

describe.only("ContactFormComponent", () => {
	let subject = null
	let submitting, touched, error, reset, onSave, onSaveResponse
	beforeEach(() => {
		submitting = false
		touched = false
		error = null
		reset = sinon.spy()
		onSaveResponse = Promise.resolve()
		onSave = sinon.stub().returns(onSaveResponse)
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
			reset
		}
		return shallow(<ContactFormComponent {...props}/>)
	}

	// Here we show we can test asychronous actions triggered by our form.
	it("calls reset after onSave", () => {
		subject = buildSubject()
		subject.find('form').simulate('submit')
		expect(onSave.callCount).to.equal(1)
		return onSaveResponse.then(() => {
			expect(reset.callCount).to.equal(1)
		})
	})

	// This is a very simle test, making sure that if we pass in a certain
	// prop value, our form renders appropriately.
	context("when submitting", () => {
		it("shows a wait message while submitting", () => {
			submitting = true
			subject = buildSubject()
			const icon = subject.find('button[type="submit"]')
			expect(icon).to.have.text('Submitting (takes 1 s)')
		})
	})

})

// renderTextInput is a stateless functional component, aka just a method that
// returns a React element, so it's trivial to test. We export it from the
// ContactFormComponent file. It could be named whatever we want, but it
// should be named based on what type of input component it creates, since you
// would create a similar function for each type of component you need to
// render. If you look in renderTextInput, it outputs an <input/>, but you
// would need a different method if you wanted to output a <select/>,
// <textarea>, etc.
describe.only('renderTextInput', () => {
	let subject
	context("when in an error state", () => {
		it("renders an error message for the input", () => {
			const input = { name: 'firstName', value: '' }
			const label = 'First name'
			const meta = { touched: true, error: 'Required' }
			const element = renderTextInput({ input, label, meta })
			subject = shallow(element)
			const firstNameHelpBlock = subject.find('.help-block').first()
			expect(firstNameHelpBlock).to.exist
			expect(firstNameHelpBlock.text()).to.equal('Required')
		})
	})
})