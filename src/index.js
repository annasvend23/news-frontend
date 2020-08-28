import './pages/index.css';

import { MainApi } from './js/api/MainApi';
import { NewsApi } from './js/api/NewsApi';
import { Header } from './js/components/Header';
import { Popup } from './js/components/Popup';
import { SignupForm } from './js/components/SignupForm';
import { SigninForm } from './js/components/SigninForm';
import { SuccessfulSignup } from './js/components/SuccessfulSignup';
import { ERROR_MESSAGES } from './js/constants/constants';
import { getCookie } from './js/utils';
import { SearchForm } from './js/components/SearchForm';
import { NewsCardList } from './js/components/NewsCardList';
import { NewsCard } from './js/components/NewsCard';

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev ? 'http://localhost:3000' : 'https://api.news-explorer.space';
const newsUrl = isDev
  ? 'https://newsapi.org/v2/everything'
  : `${baseUrl}/news-api`;

const mainApi = new MainApi({
  baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

const newsApi = new NewsApi({
  baseUrl: newsUrl,
  apiKey: 'c013d5c9b8dd4b3eab1042d8408d3e95',
});

const popupComponent = new Popup({
  selector: '.popup',
  templateContainer: '#popup-template-container',
  closeButton: '.popup__close',
});

const isLoggedIn = getCookie('isAuthorized');

if (isLoggedIn) {
  mainApi.getUserInfo()
    .then(({ data: userInfo }) => {
      const headerComponent = new Header({
        selector: '.header',
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
              mainApi.logout().then(() => document.location.reload(false));
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
    })
    .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
} else {
  const headerComponent = new Header({
    selector: '.header',
    api: mainApi,
    buttonOpenMenu: '.header__btn-menu-open',
    buttonCloseMenu: '.header__btn-menu-close',
    menu: '.header__side_right',
    body: 'body',
    handlers: [
      {
        selector: '.button__sign-up',
        event: 'click',
        callback: () => {
          const switchPopup = (to) => {
            if (to === '#sign-up-popup') {
              popupComponent.clearContent();
              popupComponent.setContent('#sign-up-popup');

              const formSignUpComponent = new SignupForm({
                form: '#sign-up-form',
                serverErrorContainer: '.popup__form-error',
                inputErrorContainer: '.popup__input-error',
                submitButton: '.popup__button_sign-up',
                ERROR_MESSAGES,
                api: mainApi,
                handlers: [
                  {
                    selector: '#sign-up-form',
                    event: 'submit',
                    callback: (event) => {
                      formSignUpComponent.submit(event)
                        .then(() => {
                          popupComponent.clearContent();
                          popupComponent.setContent('#successful-sign-up-popup');
                          new SuccessfulSignup({ // eslint-disable-line
                            handlers: [
                              {
                                event: 'click',
                                selector: '.popup__redirect-button',
                                callback: () => {
                                  switchPopup('#sign-in-popup');
                                },
                              },
                            ],
                          });
                        })
                        .catch((err) => console.error(`Произошла ошибка: "${err.message}"`));
                    },
                  },
                  {
                    selector: '.popup__redirect-button',
                    event: 'click',
                    callback: () => {
                      switchPopup('#sign-in-popup');
                    },
                  },
                ],
              });
            }

            if (to === '#sign-in-popup') {
              popupComponent.clearContent();
              popupComponent.setContent('#sign-in-popup');

              const formSignInComponent = new SigninForm({
                form: '#sign-in-form',
                serverErrorContainer: '.popup__form-error',
                inputErrorContainer: '.popup__input-error',
                submitButton: '.popup__button_sign-in',
                ERROR_MESSAGES,
                api: mainApi,
                handlers: [
                  {
                    selector: '#sign-in-form',
                    event: 'submit',
                    callback: (event) => {
                      formSignInComponent.submit(event);
                    },
                  },
                  {
                    selector: '.popup__redirect-button',
                    event: 'click',
                    callback: () => {
                      switchPopup('#sign-up-popup');
                    },
                  },
                ],
              });
            }
          };

          switchPopup('#sign-up-popup');
          popupComponent.open();
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
}

const newsList = new NewsCardList({
  selector: '.search-result__news-cards',
  api: mainApi,
  loader: '.preloader',
  empty: '.search-no-result',
  searchError: '.search-error',
  resultsContainer: '.search-result',
  showMoreButton: '.button__show-more',
  handlers: [
    {
      event: 'click',
      selector: '.button__show-more',
      callback: () => {
        newsList.showMore();
      },
    },
  ],
});

const searchForm = new SearchForm({
  form: '#search-form',
  inputErrorContainer: '.search__input-error',
  submitButton: '.button__search',
  ERROR_MESSAGES,
  api: newsApi,
  handlers: [
    {
      selector: '#search-form',
      event: 'submit',
      callback: (event) => {
        newsList.renderLoader(true);

        searchForm.submit(event)
          .then((res) => {
            const cards = res.articles
              .map((article) => new NewsCard({
                api: mainApi,
                template: '#news-card',
                data: article,
                isLoggedIn,
                searchForm,
              }));

            newsList.renderResults({
              total: res.totalResults,
              cards,
            });
          })
          .catch(newsList.renderError)
          .finally(() => {
            newsList.renderLoader(false);
          });
      },
    },
  ],
});
