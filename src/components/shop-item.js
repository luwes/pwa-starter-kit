/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { element, renderer } from 'swiss-element';
import { html, render } from 'lit-html';

// This element is *not* connected to the Redux store.
function ShopItem({ name, amount, price }) {
  return html`
    ${name}:
    <span ?hidden="${amount === 0}">${amount} * </span>
    $${price}
    </span>
  `;
}

element('shop-item', ShopItem, renderer(render), {
  observedAttributes: ['name', 'amount', 'price'],
  shadow: 'open'
});
