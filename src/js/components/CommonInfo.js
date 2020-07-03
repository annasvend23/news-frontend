import { BaseComponent } from './BaseComponent';

export class CommonInfo extends BaseComponent {
  constructor({
    handlers, infoContainer, keywordsContainer, userName,
  }) {
    super({ handlers });

    this.infoContainer = document.querySelector(infoContainer);
    this.keywordsContainer = document.querySelector(keywordsContainer);
    this.userName = userName;

    this.articles = [];
  }

  render(articles) {
    this.articles = articles;
    this.keywordsContainer.textContent = '';
    this._renderInfo();
    this._renderKeywords();
  }

  _renderInfo() {
    this.infoContainer.textContent = `${this.userName}, у вас ${this.articles.length} сохранённых статей`;
  }

  _renderKeywords() {
    const keywords = this.articles.reduce((memo, article) => {
      if (!memo[article.keyword]) {
        memo[article.keyword] = 0;
      }
      memo[article.keyword] += 1;

      return memo;
    }, {});

    const keywordsSorted = Object
      .keys(keywords)
      .map((key) => ({ keyword: key, hits: keywords[key] }))
      .sort((a, b) => b.hits - a.hits);

    const elements = [];

    if (keywordsSorted.length <= 3) {
      keywordsSorted.forEach((keyword) => {
        elements.push(CommonInfo.renderKeyword(keyword));
        elements.push(CommonInfo.renderComma());
      });
      elements.pop();
    } else {
      keywordsSorted.slice(0, 2).forEach((keyword) => {
        elements.push(CommonInfo.renderKeyword(keyword));
        elements.push(CommonInfo.renderComma());
      });
      elements.pop();
      elements.push(
        CommonInfo.renderKeyword({ keyword: ` и ${keywordsSorted.length - 2} другим` }),
      );
    }

    elements.forEach((element) => this.keywordsContainer.appendChild(element));
  }

  static renderKeyword({ keyword }) {
    const keywordElement = document.createElement('span');
    keywordElement.classList.add('common-info__keyword');
    keywordElement.textContent = keyword;

    return keywordElement;
  }

  static renderComma() {
    const commaElement = document.createElement('span');
    commaElement.textContent = ', ';

    return commaElement;
  }
}

export default CommonInfo;
