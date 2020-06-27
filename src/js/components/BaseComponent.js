export class BaseComponent {
  constructor({ handlers = [] }) {
    this.handlers = handlers;
    this._setHandlers();
  }

  _setHandlers() {
    this.handlers.forEach((handler) => {
      const element = document.querySelector(handler.selector);

      if (!element) {
        console.error(`Can't find element with selector "${handler.selector}"`);
        return;
      }

      element.addEventListener(handler.event, handler.callback);
    });
  }
}

export default BaseComponent;
