export class NewsApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.apiKey = options.apiKey;
  }

  static handleRes(res) {
    if (res.ok) {
      return res.json();
    }

    return res.json().then((result) => Promise.reject(result));
  }

  static formatDate(date) {
    return date.toISOString();
  }

  getDefaultParams() {
    const today = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    return 'language=ru'
      + `&apiKey=${this.apiKey}`
      + `&from=${NewsApi.formatDate(today)}`
      + `&to=${NewsApi.formatDate(weekAgo)}`
      + '&pageSize=100';
  }

  getNews({ query }) {
    return fetch(`${this.baseUrl}?${this.getDefaultParams()}&q=${query}`, {
      method: 'GET',
      headers: this.headers,
    })
      .then(NewsApi.handleRes);
  }
}

export default NewsApi;
