/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { compose, element, renderer } from 'swiss-element';
import { render } from 'lit-html';

export function pageViewElement(name, component) {
  const enhance = compose(
    createElement => {
      return options => {
        const el = createElement(options);
        const shouldUpdate = el.shouldUpdate;
        el.shouldUpdate = (name, oldValue, newValue) => {
          const isActive = name === 'active' && newValue === '';
          return isActive ? shouldUpdate(options) : false;
        };
        return el;
      };
    },
    renderer(render)
  );

  return element(name, component, enhance, {
    observedAttributes: ['active'],
    shadow: 'open'
  });
}
