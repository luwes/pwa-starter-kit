/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-html';
import { useActions, useSelector } from 'swiss-redux';
import { pageViewElement } from './page-view-element.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import * as actions from '../actions/shop.js';

// We are lazy loading its reducer.
import shop, { cartQuantitySelector } from '../reducers/shop.js';
store.addReducers({
  shop
});

// These are the elements needed by this element.
import './shop-products.js';
import './shop-cart.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { ButtonSharedStyles } from './button-shared-styles.js';

function MyView3() {
  const error = useSelector(state => state.shop.error);
  const quantity = useSelector(cartQuantitySelector);
  const { checkout } = useActions(actions);

  return html`
    <style>
      ${SharedStyles} ${ButtonSharedStyles} button {
        border: 2px solid black;
        border-radius: 3px;
        padding: 8px 16px;
      }
    </style>

    <section>
      <h2>Redux example: shopping cart</h2>
      <p>Number of items in the cart: <b>${quantity}</b></p>

      <p>
        This is a slightly more advanced Redux example, that simulates a
        shopping cart: getting the products, adding/removing items to the cart,
        and a checkout action, that can sometimes randomly fail (to simulate
        where you would add failure handling).
      </p>
      <p>
        This view, as well as its 2 child elements,
        <code>&lt;shop-products&gt;</code> and
        <code>&lt;shop-cart&gt;</code> are connected to the Redux store.
      </p>
    </section>
    <section>
      <h3>Products</h3>
      <shop-products></shop-products>

      <h3>Your Cart</h3>
      <shop-cart></shop-cart>

      <div>${error}</div>
      <p>
        <button ?hidden="${quantity == 0}" @click="${checkout}">
          Checkout
        </button>
      </p>
    </section>
  `;
}

pageViewElement('my-view3', MyView3);
