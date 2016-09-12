import redux from 'redux'
import React, { Component, PropTypes } from 'react'
import { Field } from 'redux-form'

export const renderTextInput = field => {
	const { input, label, type, meta: { touched, error } } = field
	return (
		<div>
			<label>{label}</label>
			{' '}
			<input {...input} type={type}/>
			{' '}
			{touched && error && <span className='help-block'>{error}</span>}
		</div>
	)
}

class ContactForm extends Component {
	mySubmit(values) {
		return this.props.onSave(values).then(response => {
			this.props.reset()
			return response
		})
	}

	render() {
		return (
			<form onSubmit={this.props.handleSubmit(this.mySubmit.bind(this))}>
				<h1>Contact Form</h1>
				<Field name="firstName" component={renderTextInput} type="text" label="First name"/>
				<p></p>
				<button type="submit" disabled={this.props.submitting}>
					{this.props.submitting ? 'Submitting (takes 1 s)' : 'Submit'}
				</button>
				<p></p>
				<div className="note">Note: see submit actions in javascript console.</div>
			</form>
		)
	}
}

ContactForm.propTypes = {
	onSave: PropTypes.func.isRequired,

	handleSubmit: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired
}

export default ContactForm
