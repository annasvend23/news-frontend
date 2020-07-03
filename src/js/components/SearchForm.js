import { Form } from './Form';

export class SearchForm extends Form {
  submit(event) {
    event.preventDefault();

    return this.api.getNews(this._getInfo());
  }

  getKeyword() {
    return this._getInfo().query;
  }
}

export default SearchForm;
