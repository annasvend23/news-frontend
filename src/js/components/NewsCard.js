import { BaseComponent } from './BaseComponent';
import { formatDate } from '../utils';

export class NewsCard extends BaseComponent {
  constructor({
    handlers, api, template, data, isLoggedIn, searchForm,
  }) {
    super({ handlers });

    this.api = api;
    this.template = document.querySelector(template);
    this.data = data;
    this.isLoggedIn = isLoggedIn;
    this.searchForm = searchForm;

    this.id = null;
    this.element = null;
  }

  render() {
    const {
      title,
      urlToImage,
      url,
      source,
      description,
      publishedAt,
    } = this.data;
    this.element = this.template.content.cloneNode(true);

    const imageElement = this.element.querySelector('.news-card__image');
    imageElement.src = urlToImage || 'https://images.unsplash.com/photo-1485115905815-74a5c9fda2f5?w=500&q=80';

    const linkElement = this.element.querySelector('.news-card__link');
    linkElement.href = url;

    const dateElement = this.element.querySelector('.news-card__date');
    dateElement.textContent = formatDate(new Date(publishedAt));

    const textElement = this.element.querySelector('.news-card__text');
    textElement.textContent = description;

    const sourceElement = this.element.querySelector('.news-card__source');
    sourceElement.textContent = source.name;

    const titleElement = this.element.querySelector('.news-card__title');
    titleElement.textContent = title;

    if (!this.isLoggedIn) {
      const buttonWrap = this.element.querySelector('.news-card__button-wrap');
      buttonWrap.classList.add('news-card__button-wrap_unauthorized');
    }

    this._setSaveHandler();

    return this.element;
  }

  _setSaveHandler() {
    const button = this.element.querySelector('.news-card__button_save');
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      this.save(event);
    });
  }

  renderIcon(button) {
    if (this.id) {
      button.classList.add('news-card__button_save_active');
      button.classList.remove('news-card__button_save');
    } else {
      button.classList.remove('news-card__button_save_active');
      button.classList.add('news-card__button_save');
    }
  }

  save(event) {
    if (!this.isLoggedIn) {
      return;
    }
    const button = event.target.closest('button.news-card__button');

    if (this.id) {
      this.api.removeArticle(this.id)
        .then(() => {
          this.id = null;
          this.renderIcon(button);
        });
    }

    this.api.saveArticle(this._transformData())
      .then(({ data }) => {
        this.id = data._id;
        this.renderIcon(button);
      })
      .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
  }

  _transformData() {
    return {
      keyword: this.searchForm.getKeyword(),
      title: this.data.title || 'Новость',
      text: this.data.description || 'Текст новости',
      date: this.data.publishedAt || new Date().toISOString(),
      source: (this.data.source && this.data.source.name) || 'Yandex News',
      link: this.data.url || 'https://news-explorer.space',
      image: this.data.urlToImage || 'https://images.unsplash.com/photo-1485115905815-74a5c9fda2f5?w=500&q=80',
    };
  }
}

export default NewsCard;
