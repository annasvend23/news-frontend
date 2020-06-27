import '../../pages/articles.css';

const buttonOpenMenu = document.querySelector('.header__btn-menu-open');
const buttonCloseMenu = document.querySelector('.header__btn-menu-close');
const menu = document.querySelector('.header__side_right');
const header = document.querySelector('.header');
const body = document.querySelector('body');
const headerLogo = document.querySelector('.header__logo');
const btnThemeWhite = document.querySelectorAll('.button__theme_white');


buttonOpenMenu.addEventListener('click', (event) => {
  menu.classList.add('header__menu-open');
  header.classList.add('header__menu-open');
  buttonCloseMenu.classList.remove('hidden');
  buttonOpenMenu.classList.add('hidden');
  body.classList.add('header__menu-open');
  headerLogo.classList.add('header__menu-open');
  btnThemeWhite.forEach((btn) => {
    btn.classList.remove('button__theme_white');
  });
});

buttonCloseMenu.addEventListener('click', () => {
  menu.classList.remove('header__menu-open');
  header.classList.remove('header__menu-open');
  buttonCloseMenu.classList.add('hidden');
  buttonOpenMenu.classList.remove('hidden');
  body.classList.remove('header__menu-open');
  headerLogo.classList.remove('header__menu-open');
  btnThemeWhite.forEach((btn) => {
    btn.classList.add('button__theme_white');
  })
});
