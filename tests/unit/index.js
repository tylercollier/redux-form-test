import ContactFormComponent, { renderTextInput } from '../../app/ContactFormComponent'
import React from 'react'
import { SubmissionError } from 'redux-form'

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
	let submitting, touched, error, reset, onSave, onSaveResponse, handleSubmit
	beforeEach(() => {
		submitting = false
		touched = false
		error = null
		reset = sinon.spy()
		onSaveResponse = Promise.resolve()
		handleSubmit = fn => fn
	})
	const buildSubject = () => {
		onSave = sinon.stub().returns(onSaveResponse)
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
			handleSubmit,
			reset
		}
		return shallow(<ContactFormComponent {...props}/>)
	}

	// Here we show we can test asychronous actions triggered by our form.
	it("calls reset after onSave", () => {
		subject = buildSubject()
		subject.find('form').simulate('submit')
		expect(onSave.callCount).to.equal(1)
		// This onSaveResponse isn't the 'real' response. But using .then()
		// with it works here because it enforces that we run our expect check
		// AFTER all the form submit logic has run.
		return onSaveResponse.then(() => {
			expect(reset.callCount).to.equal(1)
		})
	})

	// This is a very simple test, making sure that if we pass in a certain
	// prop value, our form renders appropriately.
	context("when submitting", () => {
		it("shows a wait message while submitting", () => {
			submitting = true
			subject = buildSubject()
			const icon = subject.find('button[type="submit"]')
			expect(icon).to.have.text('Submitting (takes 1 s)')
		})

		context('when server returns an error', () => {
			beforeEach(() => {
				onSaveResponse = Promise.reject('some rejection')
			})

			it("throws a SubmissionError on error in the form submit handler", () => {
				let promiseReturnedFromFormHandler
				handleSubmit = fn => {
					return function() {
						// In this test, we know arguments will be empty because we
						// control it in our test when we simulate the submit, and
						// don't pass it any arguments. But it's just good practice to
						// pass them along.
						promiseReturnedFromFormHandler = fn(arguments)
					}
				}
				subject = buildSubject()
				subject.find('form').simulate('submit')
				expect(onSave.callCount).to.equal(1)
				return promiseReturnedFromFormHandler.then(() => {
					throw new Error("Submission error should have been checked but wasn't")
				}).catch(error => {
					expect(error).to.be.instanceof(SubmissionError)
				})
			})

			it("alternative approach to previous test - throws a SubmissionError on error in the form submit handler", () => {
				// In this alternative approach, we're calling the component's
				// submit handler directly. This is probably fine for simple
				// components, but I worry if the component is more complex.
				// The reason I'm showing this way is to show the use of
				// enzyme's .instance() method.
				subject = buildSubject()
				const promiseReturnedFromFormHandler = subject.instance().mySubmit({ firstName: 'somename' })
				return promiseReturnedFromFormHandler.then(() => {
					throw new Error('Should not hit this then block - test was set up incorrectly')
				}).catch(error => {
					expect(error).to.be.instanceof(SubmissionError)
				})
			})
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
describe('renderTextInput', () => {
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