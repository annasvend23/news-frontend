import { Form } from './Form';

export class SigninForm extends Form {
  submit(event) {
    event.preventDefault();
    this.renderLoading(true);

    return this.api.signin(this._getInfo())
      .then(() => {
        document.location.reload();
      })
      .catch((err) => {
        this.serverErrorContainer.textContent = err.message;
      })
      .finally(() => this.renderLoading(false));
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.submitButton.textContent = 'Загрузка...';
    } else {
      this.submitButton.textContent = 'Войти';
    }
  }
}

export default SigninForm;
