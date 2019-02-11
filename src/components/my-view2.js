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
import { pageViewElement } from './swiss-elements.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import * as actions from '../actions/counter.js';

// We are lazy loading its reducer.
import counter from '../reducers/counter.js';
store.addReducers({
  counter
});

// These are the elements needed by this element.
import './counter-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

function MyView2() {
  const clicks = useSelector(state => state.counter.clicks);
  const value = useSelector(state => state.counter.value);
  const { increment, decrement } = useActions(actions);

  return html`
    <style>
      ${SharedStyles}
    </style>
    <section>
      <h2>Redux example: simple counter</h2>
      <div>Number of clicks: <b>${clicks}</b></div>
      <p>
        This page contains a reusable <code>&lt;counter-element&gt;</code>. The
        element is not built in a Redux-y way (you can think of it as being a
        third-party element you got from someone else), but this page is
        connected to the Redux store. When the element updates its counter, this
        page updates the values in the Redux store, and you can see the current
        value of the counter reflected in the bubble above.
      </p>
      <br />
    </section>
    <section>
      <p>
        <counter-element
          value="${value}"
          clicks="${clicks}"
          @counter-incremented="${increment}"
          @counter-decremented="${decrement}"
        >
        </counter-element>
      </p>
    </section>
  `;
}

pageViewElement('my-view2', MyView2);
