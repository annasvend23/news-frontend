import { BaseComponent } from './BaseComponent';

export class Popup extends BaseComponent {
  constructor({
    handlers, selector, templateContainer, closeButton,
  }) {
    super({ handlers });

    this.popupElement = document.querySelector(selector);
    this.templateContainer = document.querySelector(templateContainer);
    this.closeButton = document.querySelector(closeButton);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._escapeButtonCloseListener = this._escapeButtonCloseListener.bind(this);
  }

  setContent(templateId) {
    const template = document.querySelector(templateId);

    this.templateContainer.append(template.content.cloneNode(true));
  }

  clearContent() {
    this.templateContainer.textContent = '';
  }

  open() {
    this.popupElement.classList.add('popup_is-opened');
    this._addCloseListener();
  }

  close() {
    this.popupElement.classList.remove('popup_is-opened');
    this._removeCloseListener();
    this.clearContent();
  }

  _addCloseListener() {
    this.closeButton.addEventListener('click', this.close);
    document.addEventListener('keydown', this._escapeButtonCloseListener);
  }

  _escapeButtonCloseListener(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _removeCloseListener() {
    this.closeButton.removeEventListener('click', this.close);
    document.removeEventListener('keydown', this._escapeButtonCloseListener);
  }
}

export default Popup;
