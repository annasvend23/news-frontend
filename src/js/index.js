import '../pages/index.css';

const buttonOpenMenu = document.querySelector('.header__btn-menu-open');
const buttonCloseMenu = document.querySelector('.header__btn-menu-close');
const menu = document.querySelector('.header__side_right');
const header = document.querySelector('.header');
const body = document.querySelector('body');

buttonOpenMenu.addEventListener('click', (event) => {
  menu.classList.add('header__menu-open');
  header.classList.add('header__menu-open');
  buttonCloseMenu.classList.remove('hidden');
  buttonOpenMenu.classList.add('hidden');
  body.classList.add('header__menu-open');

});

buttonCloseMenu.addEventListener('click', () => {
  menu.classList.remove('header__menu-open');
  header.classList.remove('header__menu-open');
  buttonCloseMenu.classList.add('hidden');
  buttonOpenMenu.classList.remove('hidden');
  body.classList.remove('header__menu-open');
});

