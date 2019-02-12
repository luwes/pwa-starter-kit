import { compose, element, renderer } from 'swiss-element';
import { render } from 'lit-html';

export function baseElement(name, component, options) {
  return element(name, component, renderer(render), {
    shadow: 'open',
    ...options
  });
}

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
