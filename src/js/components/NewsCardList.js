import { BaseComponent } from './BaseComponent';

export class NewsCardList extends BaseComponent {
  constructor({
    handlers, api, selector, loader, empty, searchError, resultsContainer, showMoreButton,
  }) {
    super({ handlers });

    this.api = api;
    this.container = document.querySelector(selector);
    this.loader = document.querySelector(loader);
    this.empty = document.querySelector(empty);
    this.searchError = document.querySelector(searchError);
    this.resultsContainer = document.querySelector(resultsContainer);
    this.showMoreButton = document.querySelector(showMoreButton);

    this.cardsToRender = [];
    this.renderError = this.renderError.bind(this);
  }

  // cards -> NodeList
  renderResults({ total, cards }) {
    if (total === 0) {
      this.renderEmpty(true);
      return;
    }
    this.cardsToRender = cards;

    this.cardsToRender
      .splice(0, 3)
      .forEach((card) => this.container.appendChild(card.render()));
    this.resultsContainer.classList.remove('hidden');
    this._checkShowMoreButton();
  }

  renderLoader(isLoading) {
    if (isLoading) {
      this.resultsContainer.classList.add('hidden');
      this.renderEmpty(false);
      this.renderError(false);
      this.container.textContent = '';
      this.loader.classList.remove('hidden');
    } else {
      this.loader.classList.add('hidden');
    }
  }

  renderEmpty(isEmpty) {
    if (isEmpty) {
      this.empty.classList.remove('hidden');
    } else {
      this.empty.classList.add('hidden');
    }
  }

  renderError(error) {
    if (error) {
      this.searchError.classList.remove('hidden');
    } else {
      this.searchError.classList.add('hidden');
    }
  }

  showMore() {
    this.cardsToRender
      .splice(0, 3)
      .forEach((card) => this.container.appendChild(card.render()));
    this._checkShowMoreButton();
  }

  _checkShowMoreButton() {
    if (!this.cardsToRender.length) {
      this.showMoreButton.classList.add('hidden');
    }
  }
}

export default NewsCardList;
