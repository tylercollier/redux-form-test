import React from 'react'
import onClickOutside from 'react-onclickoutside'

// See README for discussion of chai, enzyme, and sinon
import chai, { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'

chai.use(chaiEnzyme())




// Note: This file was originally meant to show off unit testing the npm package named redux-form.
// However, I've found it a convenient project to publicly show simple tests.
// I've removed what was originally tested in this file to work with the question posted here:
// http://stackoverflow.com/questions/38106763/using-mocha-to-test-higher-order-components-in-react




describe("ContactFormComponent", () => {
	class Component extends React.Component {
		handleClickOutside() {}
		render () {
			return (
				<div className='component' />
			)
		};
	}

	describe('Component', function () {
		it('can be mounted with the required class', function () {
			const component = shallow(
				<Component />
			);
			expect(component).to.have.className('component');
		});
	})

	const HocComponent = onClickOutside(Component)


	// THIS TEST INTENTIONALLY FAILS! It shows what the OP witnessed in the stackoverflow question.
	describe('Component wrapped in HOC, using shallow', function () {
		it('can be mounted with the required class', function () {
			const component = shallow(
				<HocComponent />
			);
			expect(component).to.have.className('component');
		});
	})

	describe('Component wrapped in HOC, using mount', function () {
		it('can be mounted with the required class', function () {
			const component = mount(
				<HocComponent />
			);
			expect(component).to.have.className('component');
		});
	})
})