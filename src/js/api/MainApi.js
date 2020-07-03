export class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  static handleRes(res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then((result) => Promise.reject(result));
  }

  signup(newUser) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify(newUser),
    })
      .then(MainApi.handleRes);
  }

  signin(loginInfo) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify(loginInfo),
    })
      .then(MainApi.handleRes);
  }

  logout() {
    return fetch(`${this.baseUrl}/signout`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
    })
      .then(MainApi.handleRes);
  }

  getArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    })
      .then(MainApi.handleRes);
  }

  saveArticle(article) {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify(article),
    })
      .then(MainApi.handleRes);
  }

  removeArticle(articleId) {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    }).then(MainApi.handleRes);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    })
      .then(MainApi.handleRes);
  }
}

export default MainApi;
