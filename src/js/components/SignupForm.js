import { Form } from './Form';

export class SignupForm extends Form {
  submit(event) {
    event.preventDefault();
    this.renderLoading(true);

    return this.api.signup(this._getInfo())
      .catch((err) => {
        this.serverErrorContainer.textContent = err.message;
        throw err;
      })
      .finally(() => this.renderLoading(false));
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.submitButton.textContent = 'Загрузка...';
    } else {
      this.submitButton.textContent = 'Зарегистрироваться';
    }
  }
}

export default SignupForm;
