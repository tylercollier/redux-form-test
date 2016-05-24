import redux from 'redux'
import React, { Component, PropTypes } from 'react'

class ContactForm extends Component {
	mySubmit(values) {
		this.props.onSave(values).then(() => {
			this.props.resetForm()
		})
	}

	render() {
		const { fields: { firstName } } = this.props;
		const submitClassName = "glyphicon glyphicon-" + (this.props.submitting ? "refresh glyphicon-spin" : 'ok')

		return (
			<form>
				<label>First name</label>
				<input {...firstName}/>
				{firstName.touched && firstName.error && <div className='help-block'>{firstName.error}</div>}
				<button onClick={this.props.handleSubmit(this.mySubmit.bind(this))}>
					<i className={submitClassName}/> Submit
				</button>
			</form>
		)
	}
}

ContactForm.propTypes = {
	onSave: PropTypes.func.isRequired,

	fields: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	resetForm: PropTypes.func.isRequired,
	submitting: PropTypes.bool.isRequired
}

export default ContactForm
