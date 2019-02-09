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

function SnackBar() {
  return html`
    <style>
      :host {
        display: block;
        position: fixed;
        top: 100%;
        left: 0;
        right: 0;
        padding: 12px;
        background-color: black;
        color: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        text-align: center;
        will-change: transform;
        transform: translate3d(0, 0, 0);
        transition-property: visibility, transform;
        transition-duration: 0.2s;
        visibility: hidden;
      }

      :host([active]) {
        visibility: visible;
        transform: translate3d(0, -100%, 0);
      }

      @media (min-width: 460px) {
        :host {
          width: 320px;
          margin: auto;
        }
      }
    </style>

    <slot></slot>
  `;
}

element('snack-bar', SnackBar, renderer(render), {
  observedAttributes: ['active'],
  shadow: 'open'
});
