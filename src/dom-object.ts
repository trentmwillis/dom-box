/**
 * A set of helpers to construct DOM Objects, which are conceptually similar to PageObjects.
 * https://github.com/SeleniumHQ/selenium/wiki/PageObjects
 */

window.DOMObject = (function() {

    'use strict';

    const selectionTypes = {
        all(selector: string) {

            const root = this.shadowRoot ? this.shadowRoot : this;
            const elements = root.querySelectorAll(selector);
            return elements;

        },

        first(selector: string) {

            const root = this.shadowRoot ? this.shadowRoot : this;
            const element = root.querySelector(selector);
            return element;

        }
    };

    return {
        define(properties) {

            const proto = Object.assign({}, properties);
            const keys = Object.keys(proto);

            return {
                create(element) {

                    const base = Object.create(null);
                    return new Proxy(base, {
                        get(target, name) {

                            if (name === 'element') {

                                return element;

                            } else if (keys.includes(name)) {

                                const selectorDefinition = proto[name];
                                const { type, selector } = selectorDefinition;
                                return selectionTypes[type].call(element, selector);

                            }

                            throw new Error(`The property '${name}' does not exist on this DOMObject`);

                        }
                    });

                }
            };

        },

        Prop: {
            all(selector) {

                return {
                    type: 'all',
                    selector
                };

            },

            first(selector) {

                return {
                    type: 'first',
                    selector
                };

            }
        }
    };

}());
