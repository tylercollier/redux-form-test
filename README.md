# Redux-Form Test

This project shows how to do unit and integrations tests with Redux-Form.

## Basic premise

Ideally you should do both **unit tests** and **integration tests** with your form components.

First, make sure you understand the general idea of testing connected components from [the Redux "Writing Tests" doc](http://redux.js.org/docs/recipes/WritingTests.html). Search for the section called **Connected Components**.

So, you should have a "dumb" (aka presentational) React component that is separate from any connection to Redux and Redux-Form. It takes props. That's it. That's your **unit tests**.

You should also have a container React component that connects the presentational component to Redux and Redux-Form. To test this, your test becomes an **integration test** because you're hooking up your presentational component to redux's store. You're integrating them.

To make this separation clear, I named the presentational component `ContactFormComponent`, and the container `ContactFormContainer`, in 2 different files, although you could also set it up so they are in one file.

## What should I look at?

This project is very simple. Take a look at the `tests` directory and follow the code into the `app` directory. I recommend you look at the `tests/unit` directory first, and then `tests/integration`, because the former is simpler and is a basis for the latter.

The test files are commented with specific pointers.

## How to run the tests

```
$ npm install
$ npm run test
```

## How to run the site

There is no site! These are just tests! The "contact form" component is trivially simple: It has a first name label, an input for the first name, and a submit button.

## Technologies

These tests are written to run with the mocha test framework. I use the chai assertion library to make it more readable. (Additionally, chai-enzyme and sinon-chai are also used.) But what I'm trying to show off is testing Redux-Form, so of course you could use a different test framework.

Similarly, I'm using [Enzyme](http://airbnb.io/enzyme/), which is far better than the basic [Facebook React Test Utils](https://facebook.github.io/react/docs/test-utils.html). Enzyme is more convenient and intuitive to write, easier to read, and more powerful with great debug helpers. I'm using sinon as a spy library, which is how we know if the functions we pass into our components get called properly. You could exchange sinon for another spy library.

## License

MIT