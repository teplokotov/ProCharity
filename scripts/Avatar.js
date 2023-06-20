import {logPlugin} from "@babel/preset-env/lib/debug";

export default class Avatar {
  /**
   *
   * @param imgChangeHandler  - callback-функция обработки события изменения поля file (загрузки аватара)
   * @param cropHandler       - callback-функция обработки событий изменения границ и масштаба редактируемого аватара
   * @param confirmHandler    - callback-функция обработки события подтверждения выбора области аватара
   * @param options           - объект, содержащий css-селекторы для доступа к элементам формы и модального окна
   */
  constructor(
    {
      imgChangeHandler,
      cropHandler,
      confirmHandler
    },
    options = {
      avatarContainerSelector: '.avatar__container',
      fileInputSelector: '.avatar__input',
      imgClass: 'avatar__img',
      editContainerImgSelector: '.popup__image',
      btnRemoveSelector: '.avatar__btn-delete',
      btnRemoveVisibleClass: 'avatar__btn-delete_visible',
      previewContainerSelector: '.avatar_location_preview',
      previewImageSelector: '.avatar__preview-image',
      croppedImageInputSelector: '.avatar__cropped-image-input',
      confirmBtnSelector: '.btn_confirm'
    }) {
    this._avatarContainerSelector = options.avatarContainerSelector;
    this._fileInputSelector = options.fileInputSelector;
    this._imgClass = options.imgClass;
    this._editContainerImgSelector = options.editContainerImgSelector;
    this._btnRemoveSelector = options.btnRemoveSelector;
    this._btnRemoveVisibleClass = options.btnRemoveVisibleClass;
    this._previewContainerSelector = options.previewContainerSelector;
    this._previewImageSelector = options.previewImageSelector;
    this._croppedImageInputSelector = options.croppedImageInputSelector;
    this._confirmBtnSelector = options.confirmBtnSelector;


    this._imgChangeHandler = imgChangeHandler;
    this._cropHandler = cropHandler;
    this._confirmHandler = confirmHandler;


    this._avatarContainerElement = document.querySelector(this._avatarContainerSelector);
    this._fileInputElement = document.querySelector(this._fileInputSelector);
    this._editContainerImgElement = document.querySelector(this._editContainerImgSelector);
    this._btnRemoveElement = document.querySelector(this._btnRemoveSelector);
    this._previewContainerElement = document.querySelector(this._previewContainerSelector);
    this._croppedImageInputElement = document.querySelector(this._croppedImageInputSelector);
    this._confirmBtnElement = document.querySelector(this._confirmBtnSelector);


    this._handleFileChange = this._handleFileChange.bind(this);
    this._handleRemoveClick = this._handleRemoveClick.bind(this);
    this._handleConfirm = this._handleConfirm.bind(this);
  }


  init() {
    this._setEventListeners();
  }


  _createImgElement(elementCass) {
    const element = document.createElement('img');
    element.classList.add(elementCass);
    element.alt = 'Твой аватар';

    return element;
  }


  // Обработчик результирующего (обрезанного) изображения
  handleCrop(croppedImageURL) {
    this._croppedImageURL = croppedImageURL;

    // Получение всех элементов блока предварительного просмотра
    // (3 изображения разного размера)
    this._previewContainerElement.querySelectorAll(this._previewImageSelector)
      .forEach((image) => {
        // Установка каждому изхображению ссылки на выбранную (обрезанную) область
        image.src = this._croppedImageURL;
      })
  }


  // Обработчик подтверждения сохранения выбранной области аватара
  _handleConfirm() {
    // Если элемент изображения для вывода аватара на странице еще не создан
    if (!this._imgElement) {
      // Создание элемента изображения для контейнера аватара
      this._imgElement = this._createImgElement(this._imgClass);
    }

    // Установка ссылки на выбранную (обрезанную область) изображению аватара на странице
    this._imgElement.src = this._croppedImageURL;

    // Добавление подготовленного изображения в контейнер аватара
    this._avatarContainerElement.append(this._imgElement);

    // Сохранение ссылки на результурующее изоюражение в скрытом поле
    this._croppedImageInputElement.value = this._croppedImageURL;

    // Отображение кнопки удаления аватара
    this._showDeleteBtn(this._editContainerImgElement);

    // Запуск колбэк-функции обработки события подтверждения
    // в нашем случае - для вызова метода popup.close() и закрытия попапа
    this._confirmHandler();
  }


  // Обработчик события выбора файла
  _handleFileChange(evt) {
    // Получение загруженного в поле файла
    const file = evt.target.files[0];

    // Если файл выбран
    if (file) {
      // Создание URL-объекта файла
      const fileUrl = window.URL.createObjectURL(file);

      // Добавление ссылки на загруженный файл созданному igm
      this._editContainerImgElement.src = fileUrl;

      // Подключение внешних обрабботчиков, например, cropper и popup
      // отвечающих за редактирование (обрезку) загруженного изображения
      // и открытие модального окна после загрузки для последующего редактирвоания
      this._imgChangeHandler(fileUrl);
    }
  }


  // Обработчик удаления аватара
  _handleRemoveClick() {
    // Удаление изображения из контейнера аватара
    this._imgElement.remove();

    // Очистка скрытого поля от сохраненного url
    this._croppedImageInputElement.value = '';

    // Скрытие кнопки удаления аватара
    this._hideDeleteBtn();
  }


  _hideDeleteBtn() {
    this._btnRemoveElement.classList.remove(this._btnRemoveVisibleClass);
  }


  _setEventListeners() {
    // Установка обработчиков события выбора файла
    this._fileInputElement.addEventListener('change', this._handleFileChange)

    // Установка обработчиков события удаления аватара
    this._btnRemoveElement.addEventListener('mousedown', this._handleRemoveClick);

    // Установка обработчика на событие инициализации библиотеки CropperJS
    this._editContainerImgElement.addEventListener('ready', this._cropHandler);

    // Установка обработчика на событие изменения границ обрезки изображения и масштабирования
    this._editContainerImgElement.addEventListener('crop', this._cropHandler);

    // Установка обработчика на событие клика по кнопке подтверждения выбора области аватара
    this._confirmBtnElement.addEventListener('mousedown', this._handleConfirm);
  }


  _showDeleteBtn() {
    this._btnRemoveElement.classList.add(this._btnRemoveVisibleClass);
  }
}
