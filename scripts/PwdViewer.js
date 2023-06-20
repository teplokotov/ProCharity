export default class PwdViewer {
  /**
   *
   * @param fieldContainerElement       - элемент контейнера-обертки для поля пароля и кнопки
   * @param hideOnInputEvent {boolean}  - параметр, отвечающий за автоматическое скрытие пароля в поле
   *                                    при наступлении события input, т.е. при любом изменении значения
   *                                    по умолчанию - true
   */
  constructor(fieldContainerElement, hideOnInputEvent = true) {
    this._containerElement = fieldContainerElement;
    this._hideOnInputEvent = hideOnInputEvent;

    this._btnElement = this._containerElement
      .querySelector('.btn');

    this._fieldElement = this._containerElement
      .querySelector('.input__field');

    this._handleClick = this._handleClick.bind(this);
    this._handleInput = this._handleInput.bind(this);
  }


  _handleClick(evt) {
    evt.preventDefault();

    if (this._fieldElement) {
      this._fieldElement.type = (this._fieldElement.type === 'password')
        ? 'text' : 'password';
    }

    if (this._btnElement) {
      this._btnElement.classList.toggle('input__btn_type_show-pwd-visible')
    }
  }


  _handleInput() {
    if (this._fieldElement) {
      this._fieldElement.type = 'password';
    }

    if (this._btnElement
      && this._btnElement.classList.contains('input__btn_type_show-pwd-visible')) {
      this._btnElement.classList.remove('input__btn_type_show-pwd-visible')
    }
  }


  setEventListeners() {
    if (this._btnElement) {
      this._btnElement.addEventListener('mousedown', this._handleClick);
    }

    // Скрытие пароля при событии input
    if (this._fieldElement && this._hideOnInputEvent) {
      this._fieldElement.addEventListener('input', this._handleInput);
    }
  }
}