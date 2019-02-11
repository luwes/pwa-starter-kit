/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import {  useState } from 'swiss-element';
import { html } from 'lit-html';
import { baseElement } from './swiss-elements.js';

// These are the elements needed by this element.
import { plusIcon, minusIcon } from './my-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.

function CounterElement(el) {
  const [clicks, setClicks] = useState(0);
  const [value, setValue] = useState(0);

  const onIncrement = () => {
    setValue(v => v + 1);
    setClicks(c => c + 1);
    el.dispatchEvent(new CustomEvent('counter-incremented'));
  };

  const onDecrement = () => {
    setValue(value - 1);
    setClicks(clicks + 1);
    el.dispatchEvent(new CustomEvent('counter-decremented'));
  };

  return html`
    <style>
      ${ButtonSharedStyles} span {
        width: 20px;
        display: inline-block;
        text-align: center;
        font-weight: bold;
      }
    </style>
    <div>
      <p>
        Clicked: <span>${clicks}</span> times. Value is <span>${value}</span>.
        <button @click="${onIncrement}" title="Add 1">
          ${plusIcon}
        </button>
        <button @click="${onDecrement}" title="Minus 1">
          ${minusIcon}
        </button>
      </p>
    </div>
  `;
}

baseElement('counter-element', CounterElement);
