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
		// This is just an example of an action that your submit handler might
		// fire. You can see I'm dispatching an action, just for example sake
		// to make it more realistic, but there's not even a reducer for the
		// action.
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
const mergeProps = (stateProps, dispatchProps, ownProps) =>
	Object.assign({}, stateProps, dispatchProps, ownProps)

ContactFormContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ContactFormContainer)

export default ContactFormContainer
