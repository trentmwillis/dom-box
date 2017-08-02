/**
 * A set of helpers to construct DOM Objects, which are conceptually similar to PageObjects.
 * https://github.com/SeleniumHQ/selenium/wiki/PageObjects
 */

// eslint-disable-next-line no-unused-vars
const DOMObject = (function() {

    'use strict';

    const selectionTypes = {
        all(assert, key, selector) {

            const elements = this.__root.querySelectorAll(selector);
            return elements;

        },

        first(assert, key, selector) {

            const element = this.__root.querySelector(selector);
            return element;

        }
    };

    function defineQuerySelectorProperty(assert, context, key, selectorDefinition) {

        const type = selectorDefinition.selectionType;
        const selector = selectorDefinition.selector;
        Object.defineProperty(context, key, {
            get: selectionTypes[type].bind(context, assert, key, selector)
        });

    }

    return {
        createClass(properties) {

            const proto = Object.assign({}, properties);

            return function DOMObjectConstructor(assert, root = document) {

                this.__root = root.shadowRoot ? root.shadowRoot : root;
                Object.keys(proto).forEach(key => defineQuerySelectorProperty(assert, this, key, proto[key]));

            };

        },

        Prop: {
            all(selector) {

                return {
                    selectionType: 'all',
                    selector
                };

            },

            first(selector) {

                return {
                    selectionType: 'first',
                    selector
                };

            }
        }
    };

}());
