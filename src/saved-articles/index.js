import '../pages/articles.css';

import { getCookie } from '../js/utils';
import { MainApi } from '../js/api/MainApi';
import { Header } from '../js/components/Header';
import { CommonInfo } from '../js/components/CommonInfo';
import { ArticlesCardList } from '../js/components/ArticlesCardList';
import { ArticleCard } from '../js/components/ArticleCard';

const isLoggedIn = getCookie('isAuthorized');

if (!isLoggedIn) {
  window.location.replace('/');
} else {
  const isDev = process.env.NODE_ENV === 'development';
  const baseUrl = isDev ? 'http://localhost:3000' : 'https://api.news-explorer.space';

  const mainApi = new MainApi({
    baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  Promise.all([mainApi.getUserInfo(), mainApi.getArticles()])
    .then(([{ data: userInfo }, { data: articles }]) => {
      let articlesCache = [...articles];
      const headerComponent = new Header({
        selector: '.header',
        api: mainApi,
        userName: '#user-name',
        buttonLogOut: '.button__log-out',
        buttonSignUp: '.button__sign-up',
        buttonOpenMenu: '.header__btn-menu-open',
        buttonCloseMenu: '.header__btn-menu-close',
        menu: '.header__side_right',
        body: 'body',
        savedArticlesPage: '#saved-articles-page',
        handlers: [
          {
            selector: '.button__log-out',
            event: 'click',
            callback: () => {
              mainApi.logout().then(() => window.location.replace('/'));
            },
          },
          {
            selector: '.header__btn-menu-open',
            event: 'click',
            callback: () => {
              headerComponent.openMenu();
            },
          },
          {
            selector: '.header__btn-menu-close',
            event: 'click',
            callback: () => {
              headerComponent.closeMenu();
            },
          },
        ],
      });
      headerComponent.render({ isLoggedIn, userName: userInfo.name });

      const commonInfoComponent = new CommonInfo({
        infoContainer: '.common-info__user',
        keywordsContainer: '#common-info-keywords-container',
        userName: userInfo.name,
      });
      commonInfoComponent.render(articles);

      const articlesList = new ArticlesCardList({
        selector: '.search-result__news-cards',
        api: mainApi,
        handlers: [
          {
            event: 'click',
            selector: '.search-result__news-cards',
            callback: (event) => {
              articlesList.removeArticle(event)
                .then((res) => {
                  if (!res) {
                    return;
                  }
                  articlesCache = articlesCache.filter(({ _id }) => _id !== res._id);
                  commonInfoComponent.render(articlesCache);
                })
                .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
            },
          },
        ],
      });

      const articlesCards = articles.map((article) => new ArticleCard({
        api: mainApi,
        template: '#article-card',
        data: article,
      }));

      articlesList.render(articlesCards);
    })
    .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
}
