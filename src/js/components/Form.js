import { BaseComponent } from './BaseComponent';

export class Form extends BaseComponent {
  constructor({
    form, handlers, serverErrorContainer, inputErrorContainer, submitButton, ERROR_MESSAGES, api,
  }) {
    super({ handlers });

    this.serverErrorContainer = document.querySelector(serverErrorContainer);
    this.inputErrorContainer = inputErrorContainer;
    this.submitButton = document.querySelector(submitButton);
    this.errorMessages = ERROR_MESSAGES;
    this.form = document.querySelector(form);
    this.inputs = this.form.querySelectorAll('input');
    this.api = api;

    this._validateForm = this._validateForm.bind(this);
    this._setValidateListners();
    this.setSubmitButtonState();
  }

  setServerError(err) {
    this.serverErrorContainer.textContent = err.massage;
  }

  setSubmitButtonState() {
    this.submitButton.disabled = !this.form.checkValidity();
  }

  _setValidateListners() {
    this.inputs.forEach((input) => {
      input.addEventListener('input', this._validateForm);
    });
  }

  static validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  _validateInputElement(input, error) {
    if (input.type === 'email' && !Form.validateEmail(input.value)) {
      error.textContent = this.errorMessages.email.typeMismatch;
      return;
    }

    const errorMessages = this.errorMessages[input.name]
      ? this.errorMessages[input.name]
      : this.errorMessages;

    const keys = Object.keys(errorMessages);
    for (let i = 0; i < keys.length; i += 1) {
      if (input.validity[keys[i]]) {
        error.textContent = errorMessages[keys[i]];
        return;
      }
    }
    error.textContent = '';
  }

  _validateForm(event) {
    this._validateInputElement(
      event.target,
      event.target.parentElement.querySelector(this.inputErrorContainer),
    );
    this.setSubmitButtonState();
  }

  _clear() {
    this.inputs.forEach((input) => {
      input.parentElement.querySelector(this.inputErrorContainer).textContent = '';
    });
  }

  _getInfo() {
    const info = {};

    this.inputs.forEach((element) => {
      info[element.name] = element.value;
    });

    return info;
  }
}

export default Form;
