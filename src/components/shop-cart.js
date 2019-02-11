/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { useActions, useSelector } from 'swiss-redux';
import { html } from 'lit-html';
import { baseElement } from './swiss-elements.js';

// These are the elements needed by this element.
import { removeFromCartIcon } from './my-icons.js';
import './shop-item.js';

// These are the actions needed by this element.
import * as actions from '../actions/shop.js';

// These are the reducers needed by this element.
import { cartItemsSelector, cartTotalSelector } from '../reducers/shop.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

function ShopCart() {
  const items = useSelector(cartItemsSelector);
  const total = useSelector(cartTotalSelector);
  const { removeFromCart } = useActions(actions);

  const removeButtonClicked = e => {
    removeFromCart(e.currentTarget.dataset['index']);
  };

  return html`
    <style>
      ${ButtonSharedStyles} :host {
        display: block;
      }
    </style>
    <p ?hidden="${items.length !== 0}">
      Please add some products to cart.
    </p>
    ${items.map(
      item =>
        html`
          <div>
            <shop-item
              .name="${item.title}"
              .amount="${item.amount}"
              .price="${item.price}"
            ></shop-item>
            <button
              @click="${removeButtonClicked}"
              data-index="${item.id}"
              title="Remove from cart"
            >
              ${removeFromCartIcon}
            </button>
          </div>
        `
    )}
    <p ?hidden="${!items.length}"><b>Total:</b> ${total}</p>
  `;
}

baseElement('shop-cart', ShopCart);
