import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import ContactFormContainer from './ContactFormContainer'

const rootReducer = combineReducers({
	form: reduxFormReducer
})
const store = createStore(rootReducer, {}, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f))

render(
	<Provider store={store}>
		<ContactFormContainer/>
	</Provider>,
	document.getElementById('root')
)