export default class MobileMenu {
  constructor({
                menuBtnClass,
                menuBtnActiveClass,
                menuContainerClass,
                menuContainerOpenedClass
              }) {
    this._menuBtnClass = menuBtnClass;
    this._menuBtnElement = document.querySelector(`.${this._menuBtnClass}`);

    this._menuBtnActiveClass = menuBtnActiveClass;

    this._menuContainerClass = menuContainerClass;
    this._menuContainerElement = document.querySelector(`.${this._menuContainerClass}`);

    this._menuContainerOpenedClass = menuContainerOpenedClass;

    this._handleClick = this._handleClick.bind(this);
  }


  _handleClick(evt) {
    this._menuBtnElement.classList.toggle(this._menuBtnActiveClass);
    this._menuContainerElement.classList.toggle(this._menuContainerOpenedClass);
  }


  setEventListeners() {
    this._menuBtnElement.addEventListener('mousedown', this._handleClick);
  }
}