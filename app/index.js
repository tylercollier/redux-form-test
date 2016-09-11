import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import ContactFormContainer from './ContactFormContainer'

const rootReducer = combineReducers({
	form: reduxFormReducer
})
const store = createStore(rootReducer, window.devToolsExtension && window.devToolsExtension())

render(
	<Provider store={store}>
		<ContactFormContainer/>
	</Provider>,
	document.getElementById('root')
)