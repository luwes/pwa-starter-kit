/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { useEffect } from 'swiss/hooks';
import { context, useActions, useSelector } from 'swiss-redux';
import { html } from 'lit-html';
import { baseElement } from './swiss-elements.js';

import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from '../store.js';
context(store);

// These are the actions needed by this element.
import * as actions from '../actions/app.js';

// These are the elements needed by this element.
import './snack-bar.js';

function MyApp({ appTitle }) {
  const page = useSelector(state => state.app.page);
  const offline = useSelector(state => state.app.offline);
  const snackbarOpened = useSelector(state => state.app.snackbarOpened);

  const { navigate, updateOffline, updateLayout } = useActions(actions);

  useEffect(() => {
    installRouter(location => navigate(decodeURIComponent(location.pathname)));
    installOfflineWatcher(offline => updateOffline(offline));
    installMediaQueryWatcher(`(min-width: 460px)`, matches =>
      updateLayout(matches)
    );
  });

  useEffect(() => {
    const pageTitle = appTitle + ' - ' + page;
    updateMetadata({
      title: pageTitle,
      description: pageTitle
      // This object also takes an image property, that points to an img src.
    });
  }, [page]);

  return html`
    <style>
      :host {
        display: block;
        padding: 24px;
        max-width: 600px;
      }

      header {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .toolbar-list > a {
        display: inline-block;
        color: black;
        text-decoration: none;
        padding: 0 8px;
      }

      .toolbar-list > a[selected] {
        font-weight: bold;
      }

      /* Workaround for IE11 displaying <main> as inline */
      main {
        display: block;
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }

      footer {
        border-top: 1px solid #ccc;
        text-align: center;
      }

      /* Wide layout */
      @media (min-width: 460px) {
        header {
          flex-direction: row;
        }

        /* The drawer button isn't shown in the wide layout, so we don't
        need to offset the title */
        [main-title] {
          padding-right: 0px;
        }
      }
    </style>

    <header>
      <h1>${appTitle}</h1>
      <nav class="toolbar-list">
        <a ?selected="${page === 'view1'}" href="/view1">View One</a>|
        <a ?selected="${page === 'view2'}" href="/view2">View Two</a>|
        <a ?selected="${page === 'view3'}" href="/view3">View Three</a>
      </nav>
    </header>

    <!-- Main content -->
    <main role="main" class="main-content">
      <my-view1 class="page" ?active="${page === 'view1'}"></my-view1>
      <my-view2 class="page" ?active="${page === 'view2'}"></my-view2>
      <my-view3 class="page" ?active="${page === 'view3'}"></my-view3>
      <my-view404 class="page" ?active="${page === 'view404'}"></my-view404>
    </main>

    <footer>
      <p>Made with &hearts; by the Polymer team.</p>
    </footer>

    <snack-bar ?active="${snackbarOpened}">
      You are now ${offline ? 'offline' : 'online'}.
    </snack-bar>
  `;
}

baseElement('my-app', MyApp, {
  observedAttributes: ['appTitle']
});
