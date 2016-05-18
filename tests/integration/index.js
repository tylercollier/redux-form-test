import ContactFormContainer from '../../app/ContactFormContainer'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { mount } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import sinon from 'sinon'
import React from 'react'
import jsdom from 'jsdom'
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView

chai.use(sinonChai)
chai.use(chaiEnzyme())

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
		input.simulate('blur')
		const firstNameHelpBlock = subject.find('.help-block')
		expect(firstNameHelpBlock).to.exist
		expect(firstNameHelpBlock.text()).to.equal('Required')
	})

	it("calls onSave", () => {
		const form = subject.find('form')
		const input = subject.find('input').first()
		input.simulate('change', { target: { value: 'Joe' } })
		form.simulate('submit')
		expect(onSave).to.have.been.called
	})
})