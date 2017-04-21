import React from 'react'
import { expect } from "chai";
import { shallow, mount, unmount } from "enzyme";
import sinon from "sinon";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

// import reducers from "../../../src/reducers";
const reducers = () => ({ auth: {} });
import ConfirmationContainer, {
  ConfirmationComponent,
  renderField
} from "../../app/confirmation";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

describe.only("Container", () => {
  let sendActivationEmail, resetAuthError, props, errorMessage, subject;
  beforeEach(() => {
    sendActivationEmail = sinon.spy();
    resetAuthError = sinon.spy();
    props = {
      sendActivationEmail,
      resetAuthError,
      errorMessage: "required"
    };

    subject = mount(
      <Provider store={store}>
        <ConfirmationContainer {...props} />
      </Provider>
    );
  });

  it("renders error message", done => {
    expect(subject.find(".alert")).to.have.length(1);
    done();
  });

  it("calls sendActivationEmail on submit", done => {
    const form = subject.find("form");
    const input = subject.find("input").first();

    input.simulate("change", { target: { value: "test@gmail.com" } });
    form.simulate("submit");
    expect(sendActivationEmail.callCount).to.equal(1);
    done();
  });

  it("calls resetAuthError on unmount", done => {
    subject.unmount();
    expect(resetAuthError.calledOnce).to.equal(true);
    done();
  });
});
