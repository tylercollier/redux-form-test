import ContactFormContainer from '../../app/ContactFormContainer'
import React from 'react'

// See README for discussion of chai, enzyme, and sinon
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { mount } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'

chai.use(sinonChai)
chai.use(chaiEnzyme())

// In this file we're doing an integration test. Thus we need to hook up our
// form component to Redux and Redux-Form. To do that, we need to create the
// simplest redux store possible that will work with Redux-Form.
import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'

// To test the entire component, we're going to use Enzyme's `mount` method,
// which is the opposite of shallow rendering. To use `mount`, we need to have
// a DOM, so we use jsdom. You can alternatively run these tests in a browser
// to get a DOM, but that's more complicated to set up and usually slower.
import jsdom from 'jsdom'
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView

describe("ContactFormContainer", () => {
	let store = null
	let onSave = null
	let subject = null
	beforeEach(() => {
		store = createStore(combineReducers({ form: formReducer }))
		onSave = sinon.stub()
		onSave.returns(Promise.resolve())
		const props = {
			onSave,
			store
		}
		subject = mount(<ContactFormContainer {...props}/>)
	})
	it("shows help text when first name is set to blank", () => {
		const input = subject.find('input').first()
		// Our form component only shows error messages (help text) if the
		// field has been touched. To mimic touching the field, we simulate a
		// blur event, which means the input's onBlur method will run, which
		// will call the onBlur method supplied by Redux-Form.
		input.simulate('blur')
		const firstNameHelpBlock = subject.find('.help-block')
		expect(firstNameHelpBlock).to.exist
		expect(firstNameHelpBlock.text()).to.equal('Required')
	})

	it("does not call our onSave function because the form data is invalid", () => {
		const form = subject.find('form')
		subject.find('button').simulate('click')
		expect(onSave).to.not.have.been.called
	})
	
	context("when form data is valid", () => {
		it("calls onSave", () => {
			const form = subject.find('form')
			const input = subject.find('input').first()
			// Our form, when connected to Redux-Form, won't submit unless it's
			// valid. Thus, we type a first name here to make the form's inputs,
			// and thus the form, valid.
			input.simulate('change', { target: { value: 'Joe' } })
			subject.find('button').simulate('click')
			expect(onSave).to.have.been.called
		})
	})
})