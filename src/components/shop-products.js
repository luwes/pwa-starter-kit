/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { useEffect } from 'swiss-element';
import { useActions, useSelector } from 'swiss-redux';
import { html } from 'lit-html';
import { baseElement } from './swiss-elements.js';

// This element is connected to the Redux store.

// These are the elements needed by this element.
import './shop-item.js';

// These are the actions needed by this element.
import * as actions from '../actions/shop.js';

// These are the elements needed by this element.
import { addToCartIcon } from './my-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

function ShopProducts() {
  const products = useSelector(state => state.shop.products);
  const { getAllProducts, addToCart } = useActions(actions);

  const addButtonClicked = e => {
    addToCart(e.currentTarget.dataset['index']);
  };

  useEffect(getAllProducts);

  return html`
    <style>
      ${ButtonSharedStyles} :host {
        display: block;
      }
    </style>
    ${Object.keys(products).map(key => {
      const item = products[key];
      return html`
        <div>
          <shop-item
            name="${item.title}"
            amount="${item.inventory}"
            price="${item.price}"
          ></shop-item>
          <button
            .disabled="${item.inventory === 0}"
            @click="${addButtonClicked}"
            data-index="${item.id}"
            title="${item.inventory === 0 ? 'Sold out' : 'Add to cart'}"
          >
            ${item.inventory === 0 ? 'Sold out' : addToCartIcon}
          </button>
        </div>
      `;
    })}
  `;
}

baseElement('shop-products', ShopProducts);
