import { BaseComponent } from './BaseComponent';

export class ArticlesCardList extends BaseComponent {
  constructor({ handlers, api, selector }) {
    super({ handlers });

    this.api = api;
    this.container = document.querySelector(selector);
  }

  // cards -> NodeList
  render(cards) {
    this.cards = cards;

    this.cards.forEach((card) => {
      this.container.appendChild(card.render());
    });
  }

  removeArticle(event) {
    const button = event.target.closest('.news-card__button_delete');

    if (button) {
      const newsCard = button.closest('.news-card');

      return this.api.removeArticle(newsCard.dataset.id)
        .then((res) => {
          newsCard.remove();
          return res.data;
        })
        .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
    }

    return Promise.resolve(null);
  }
}

export default ArticlesCardList;
