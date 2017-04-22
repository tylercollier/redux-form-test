import ContactFormContainer from '../../app/ContactFormContainer'
import React from 'react'

// See README for discussion of chai, enzyme, and sinon
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'

// In this file we're doing an integration test. Thus we need to hook up our
// form component to Redux and Redux-Form. To do that, we need to create the
// simplest redux store possible that will work with Redux-Form.
import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

describe("ContactFormContainer", () => {
	let store
	let onSave
	let subject
	beforeEach(() => {
		store = createStore(combineReducers({ form: formReducer }))
		onSave = sinon.stub().returns(Promise.resolve())
		const props = {
			onSave,
		}
		// With redux-form v5, we could do <ContactFormContainer store={store}/>.
		// However, with redux-form v6, the Field component we use is itself
		// connected to the redux store. Therefore, we must put the store into
		// context. To do that, we use <Provider/>.
		subject = mount(
			<Provider store={store}>
				<ContactFormContainer {...props}/>
			</Provider>
		)
	})
	it("shows help text when first name is set to blank", () => {
		const input = subject.find('input').first()
		// Our form component only shows error messages (help text) if the
		// field has been touched. To mimic touching the field, we simulate a
		// blur event, which means the input's onBlur method will run, which
		// will call the onBlur method supplied by Redux-Form.
		input.simulate('blur')
		const firstNameHelpBlock = subject.find('.help-block')
		// Ensure only one node is returned, otherwise our call to text() below will yell at us.
		expect(firstNameHelpBlock).to.have.length.of(1)
		expect(firstNameHelpBlock.text()).to.equal('Required')
	})

	it("calls onSave", () => {
		const form = subject.find('form')
		const input = subject.find('input').first()
		// Our form, when connected to Redux-Form, won't submit unless it's
		// valid. Thus, we type a first name here to make the form's inputs,
		// and thus the form, valid.
		input.simulate('change', { target: { value: 'Joe' } })
		form.simulate('submit')
		expect(onSave.callCount).to.equal(1)
	})
})