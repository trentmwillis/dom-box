# QUnit-DOM

QUnit-DOM is a set of helpers for testing code that interacts with the Document Object Model in a browser. It is designed to improve the maintainability, clarity, and quality of unit-style tests in the browser.

It strives to be independent of any specific front-end framework but also provides hooks for integration where needed.

## DOM Objects

DOM Objects are inspired by the Page Object pattern from Selenium. They are simple objects that allow you to add a layer of abstraction to give semantic meaning to the DOM you are interested in for your tests.

In particular, DOM Objects stive for the following:

* Semantically represent the features of the UI
* Don't make assertions
* Can represent a portion of or the entirety of a page
* Can return DOM Nodes or further DOM Objects

These characteristics make DOM Objects a minimal abstraction that can then be composed (see below) to great effect.

## DOM Interactions

The ins-and-outs of interacting with DOM, including many edge cases for event dispatching and ordering, make it very tedious to test even simple scenarios. QUnit-DOM provides a set of interaction helpers to make those interactions dead simple.

## DOM Object Interactions

DOM Objects and Interactions are convenient on their own, but together they allow you to test complex UI flows with a powerful level of expressiveness.

For instance, if you wanted to test a user login flow, then you might say the following in English:

```
Click the login button
Fill in the name field
Fill in the password field
Click submit
Verify the popup is displayed
Click close on the popup
Verify the popup is closed
```

With QUnit-DOM this can be easily translated into the following:

```js
await dom.click(page.login);
await dom.fillIn(page.name, 'Trent Willis');
await dom.fillIn(page.password, 'cats');
await dom.click(page.submit);

assert.ok(page.popup);

await dom.click(page.popupClose);

assert.notOk(page.popup);
```

Or maybe you're testing a loading state and want to verify that it transitions correctly:

```js
await dom.click(page.linkToSlowRoute);
await dom.waitFor(() => page.loadingSpinner);
await dom.waitFor(() => !page.loadingSpinner);

assert.equal(page.header, 'Welcome to Slow Route!');
```
