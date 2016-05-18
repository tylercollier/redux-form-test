import React from 'react'
import ContactFormComponent from './ContactFormComponent'
import { reduxForm } from 'redux-form'
import * as formValidations from './formValidations'

const ContactFormContainer = reduxForm({
	form: 'contact',
	fields: ['firstName'],
	validate: formValidations.createValidator({
		firstName: formValidations.required
	})
})(ContactFormComponent)

export default ContactFormContainer
