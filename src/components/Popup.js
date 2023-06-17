export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._popup = document.querySelector(this._selector);
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  insertData(data) {
    const p = this._popup.querySelector('.popup__paragraph');
    p.innerHTML = data;
  }

  setEventListeners() {
    if (this._popup) {
      this._closeButton = this._popup.querySelector('.popup__btn-close');

      this._closeButton.addEventListener('click', () => {
        if (this._popup.classList.contains('popup_type_message')) {
          this._popup.remove();
        } else {
          this.close();
        }
      })
    }
  }
}
