// This file is initially from https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/utils/validation.js,
// which is linked from http://erikras.github.io/redux-form/#/examples/synchronous-validation?_k=dd5lso

const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data, props) => rules.map(rule => rule(value, data, props)).filter(error => !!error)[0 /* first error */ ];

export function getBsFeedback(value) {
	var feedback;
	feedback = {};
	if (value.touched) {
		feedback = {
			hasFeedback: true,
			bsStyle: value.valid ? 'success' : 'error',
			help: value.touched && (value.error ? value.error : '')
		};
	}
	return feedback;
}

export function email(value) {
	// Let's not start a debate on email regex. This is just for an example app!
	if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
		return 'Invalid email address';
	}
}

export function required(value) {
	if (isEmpty(value)) {
		return 'Required';
	}
}

export function minLength(min) {
	return value => {
		if (!isEmpty(value) && value.length < min) {
			return `Must be at least ${min} characters`;
		}
	};
}

export function maxLength(max) {
	return value => {
		if (!isEmpty(value) && value.length > max) {
			return `Must be no more than ${max} characters`;
		}
	};
}

export function integer(value) {
	if (!Number.isInteger(Number(value))) {
		return 'Must be an integer';
	}
}

export function oneOf(enumeration) {
	return value => {
		if (!~enumeration.indexOf(value)) {
			return `Must be one of: ${enumeration.join(', ')}`;
		}
	};
}

export function match(field) {
	return (value, data) => {
		if (data) {
			if (value !== data[field]) {
				return 'Do not match';
			}
		}
	};
}

export function arrayValidator(rules) {
	return (data = []) => {
		const errors = [];
		const validator = createValidator(rules);
		data.forEach(value => {
			const error = validator(value);
			if (error) {
				errors.push(error);
			}
		});
		return errors;
	};
}

export function createValidator(rules) {
	return (data = {}, props) => {
		const errors = {};
		Object.keys(rules).forEach((key) => {
			const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
			const error = rule(data[key], data, props);
			if (error) {
				errors[key] = error;
			}
		});
		return errors;
	};
}
