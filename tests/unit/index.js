import ContactFormComponent from '../../app/ContactFormComponent'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
import { shallow } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'
import React from 'react'

chai.use(sinonChai)
chai.use(chaiEnzyme())

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

	it("calls resetForm after onSave", (done) => {
		subject = buildSubject()
		subject.find('form').simulate('submit')
		expect(onSave).to.have.been.called
		onSaveResponse.then(() => {
			expect(resetForm).to.have.been.called
			done()
		})
	})

	context("when submitting", () => {
		it("shows a spinner while submitting", () => {
			submitting = true
			subject = buildSubject()
			const icon = subject.find('button[type="submit"]').find('i')
			expect(icon).to.have.className('glyphicon-refresh glyphicon-spin')
		})
	})
})