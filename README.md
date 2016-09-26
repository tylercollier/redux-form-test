# Redux-Form Test

This project shows how to do unit and integrations tests with Redux-Form.

## For redux-form version 6

This project now uses redux-form version 6. To see test examples for redux-form 5, see this tag: [redux-form-5](https://www.github.com/tylercollier/redux-form-test/tree/redux-form-5).

## Basic premise

Ideally you should do both **unit tests** and **integration tests** with your form components.

First, make sure you understand the general idea of testing connected components from [the Redux "Writing Tests" doc](http://redux.js.org/docs/recipes/WritingTests.html). Search for the section called **Connected Components**.

So, you should have a "dumb" (aka presentational) React component that is separate from any connection to Redux and Redux-Form. It takes props. That's it. You test that with **unit tests**.

You should also have a container React component that connects the presentational component to Redux and Redux-Form. To test this, your test becomes an **integration test** because you're hooking up your presentational component to redux's store. You're integrating them.

To make this separation clear, I named the presentational component `ContactFormComponent`, and the container `ContactFormContainer`, in 2 different files, although you could also set it up so they are in one file.

## What should I look at?

This project is very simple. First, run the site (described below) to see what the form looks like. Then view the tests. Take a look at the `tests` directory and follow the code into the `app` directory. I recommend you look at the `tests/unit` directory first, and then `tests/integration`, because the former is simpler and is a basis for the latter.

The test files are commented with specific pointers.

## How to run the site

```
$ npm install
$ npm run dev
```

This will run webpack-dev-server, which defaults to port 8080, so you can visit http://localhost:8080. The site is trivial, and exists just to give you a visual of what's happening.

**TODO:** Fix hot reloading. I installed react-hot-loader 3.0.0-beta.3 because of a warning I received when using the react-hot loader in babel, which said to put `react-hot-loader/babel` in the `plugins` section of the `.babelrc` file, but I haven't done the rest of the wiring yet.

## How to run the tests

```
$ npm install
$ npm run test
```

## Technologies

These tests are written to run with the mocha test framework. I use the chai assertion library to make it more readable; `chai-enzyme` is also used. But what I'm trying to show off is testing Redux-Form, so of course you could use a different test framework.

Similarly, I'm using [Enzyme](http://airbnb.io/enzyme/), which is far better than the basic [Facebook React Test Utils](https://facebook.github.io/react/docs/test-utils.html). Enzyme is more convenient and intuitive to write, easier to read, and more powerful with great debug helpers. I'm using sinon as a spy library, which is how we know if the functions we pass into our components get called properly. You could exchange sinon for another spy library.

## License

MIT