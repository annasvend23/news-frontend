import { BaseComponent } from './BaseComponent';
import { formatDate } from '../utils';

export class ArticleCard extends BaseComponent {
  constructor({ handlers, template, data }) {
    super({ handlers });

    this.template = document.querySelector(template);
    this.data = data;

    this.id = null;
    this.element = null;
  }

  render() {
    const {
      _id,
      title,
      image,
      link,
      text,
      source,
      date,
      keyword,
    } = this.data;
    this.element = this.template.content.cloneNode(true);

    const imageElement = this.element.querySelector('.news-card__image');
    imageElement.src = image;

    const linkElement = this.element.querySelector('.news-card__link');
    linkElement.href = link;

    const keywordElement = this.element.querySelector('.news-card__keyword');
    keywordElement.textContent = keyword;

    const dateElement = this.element.querySelector('.news-card__date');
    dateElement.textContent = formatDate(new Date(date));

    const textElement = this.element.querySelector('.news-card__text');
    textElement.textContent = text;

    const sourceElement = this.element.querySelector('.news-card__source');
    sourceElement.textContent = source;

    const titleElement = this.element.querySelector('.news-card__title');
    titleElement.textContent = title;

    this.element.querySelector('.news-card').dataset.id = _id;

    return this.element;
  }
}

export default ArticleCard;
