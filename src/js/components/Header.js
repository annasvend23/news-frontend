import { BaseComponent } from './BaseComponent';

export class Header extends BaseComponent {
  constructor({
    handlers,
    selector,
    buttonLogOut,
    buttonSignUp,
    buttonOpenMenu,
    buttonCloseMenu,
    menu,
    body,
    userName,
    savedArticlesPage,
  }) {
    super({ handlers });

    this.element = document.querySelector(selector);
    this.buttonLogOut = document.querySelector(buttonLogOut);
    this.buttonSignUp = document.querySelector(buttonSignUp);
    this.buttonOpenMenu = document.querySelector(buttonOpenMenu);
    this.buttonCloseMenu = document.querySelector(buttonCloseMenu);
    this.menu = document.querySelector(menu);
    this.body = document.querySelector(body);
    this.userName = document.querySelector(userName);
    this.savedArticlesPage = document.querySelector(savedArticlesPage);
  }

  render(props) {
    const { userName } = props;
    this.userName.textContent = userName;
    this.buttonSignUp.classList.add('hidden');
    this.buttonLogOut.classList.remove('hidden');
    this.savedArticlesPage.classList.remove('hidden');
  }

  openMenu() {
    this.buttonCloseMenu.classList.remove('hidden');
    this.buttonOpenMenu.classList.add('hidden');
    this.buttonLogOut.classList.remove('button__theme_white');

    this.menu.classList.add('header__menu-open');
    this.element.classList.add('header__menu-open');

    this.body.classList.add('header__menu-open');
  }

  closeMenu() {
    this.buttonCloseMenu.classList.add('hidden');
    this.buttonOpenMenu.classList.remove('hidden');
    this.buttonLogOut.classList.add('button__theme_white');

    this.menu.classList.remove('header__menu-open');
    this.element.classList.remove('header__menu-open');

    this.body.classList.remove('header__menu-open');
  }
}

export default Header;
