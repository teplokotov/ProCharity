import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
	constructor(selector, submitFunc) {
    super(selector);
    this._formElement = this._popup.querySelector('.form');
    this._inputList = Array.from(this._formElement.querySelectorAll('.input__field, .checkbox__input'));
    this._saveBtn = this._formElement.querySelector('.btn');
    this._submitForm = submitFunc;
  }

  getInputValues() {
    this._inputValues = {};

    this._inputList.forEach((inputElement) => {
			const type = inputElement.getAttribute('type');
			if (type === 'text' || type === 'email') {
				this._inputValues[inputElement.name] = { type: inputElement.getAttribute('type'), value: inputElement.value };
			} else if (type === 'checkbox') {
				this._inputValues[inputElement.name] = { 
					type: inputElement.getAttribute('type'),
					isChecked: inputElement.checked
				};
			}
    });

    return this._inputValues;
  }

  getInputValue(inputName) {
    return this.getInputValues()[inputName];
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submitForm);
  }

  setInputValues(data) {
    this._inputList.forEach((inputElement) => {
			const type = data[inputElement.name].type;
			if (type === 'text' || type === 'email') {
      	inputElement.value = data[inputElement.name].value;
			} else if (type === 'checkbox') {
				inputElement.checked = data[inputElement.name].isChecked;
			}
    });
  }

  reset() {
    this._formElement.reset();
  }

}