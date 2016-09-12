import React from 'react'
import { connect } from 'react-redux'
import ContactFormComponent from './ContactFormComponent'
import { reduxForm } from 'redux-form'
import * as formValidations from './formValidations'

let ContactFormContainer = reduxForm({
	form: 'contact',
	validate: formValidations.createValidator({
		firstName: formValidations.required
	})
})(ContactFormComponent)

const mapStateToProps = null
const mapDispatchToProps = dispatch => {
	return {
		// Note: we aren't actually doing anything with this. The ContactForm
		// component has an onSave propType, so I'm showing where it might
		// come from.
		onSave: contactFormValues => {
			console.log('Now running onSave action')
			return new Promise(resolve => {
				setTimeout(() => {
					console.log('Now dispatching action with type FORM_SUBMIT')
					dispatch({ type: 'FORM_SUBMIT', payload: contactFormValues })
					resolve()
				}, 1000)
			})
		}
	}
}

ContactFormContainer = connect(mapStateToProps, mapDispatchToProps)(ContactFormContainer)

export default ContactFormContainer
