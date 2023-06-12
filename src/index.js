// Подключение стилей
import './styles/layout.css';
import './styles/content.css';
import 'cropperjs/dist/cropper.css'


// Подключение компонентов проекта
import {handleTextareaAutosize} from './components/textarea-autosize';
import {handleTextareaSymbolCounter} from './components/textarea-symbol-counter';
import {setFilesRemover} from './components/uploader-file-remover';
import FieldTextCleaner from './components/FieldTextCleaner';
import MobileMenu from "./components/MobileMenu";

import CustomSelect from "./components/CustomSelect";
import CustomMultiselect from "./components/CustomMultiselect";
import Popup from './components/Popup';
import TablePagination from './components/TablePagination';
import TableSort from './components/TableSort';


// Подключение сторонних библиотек
import 'cropperjs';
import Cropper from 'cropperjs';
import PwdViewer from "./components/PwdViewer";
import Avatar from "./components/Avatar";

const avatarContainer = document.querySelector('.avatar__container');
const image = document.querySelector('.popup__image');
const inputs = document.querySelectorAll('.input, .textarea');
const pwdInputs = document.querySelectorAll('.input_type_pwd');
const personalDataForm = document.forms.personalData;

if (personalDataForm) {
  const volunteerSwitcher = personalDataForm.elements.volunteerType;
  const volunteerPostInput = personalDataForm.elements.post;

  // Обработка выбора типа волонтера
  volunteerSwitcher.forEach((input) => {
    // Если происходит изменение значения переключателя типа волонтера
    input.addEventListener('input', (evt) => {
      // и выбран тип "я представляю компанию"
      if (evt.target.value === 'company') {
        // нснимаем блок с полей "выберите компанию" и "должность"
        companyNameCustomField.resetDisabled();
        volunteerPostInput.disabled = false;
      } else {
        // если выбран вариант "я физическое лицо" или ничего не выбрано
        // блокируем эти поля
        companyNameCustomField.setDisabled();
        volunteerPostInput.disabled = true;
      }
    })
  })
}

const popup = new Popup('.popup');
popup.setEventListeners();

// Обеспечение работы модальных окон
if (avatarContainer) {
  avatarContainer.addEventListener('mousedown', () => {
    // Открываем popup только в том случае, если в контейнере лежит элемент изображения
    if (avatarContainer.querySelector('.avatar__img')) {
      popup.open();
    }
  });
}


// Инициализация библиотеки CropperJS (обрезка изображений)
if (image) {
  const cropper = new Cropper(image, {
    aspectRatio: 1,
    viewMode: 2,
    restore: false,
  });


  const avatar = new Avatar({
    imgChangeHandler: (url) => {
      // Открытие модального окна для редактирования аватара
      popup.open();

      // Замена url в случае повторной загрузки другого аватара
      cropper.replace(url)
    },
    cropHandler: () => {
      // Обработка события изменения границ выбранной области или масштаба изображения
      avatar.handleCrop(
        // Получение URL-объекта обрезанного изображения
        cropper.getCroppedCanvas().toDataURL('image/jpeg')
      );
    },
    confirmHandler: () => {
      popup.close();
    }
  });
  avatar.init();
}


// Вызов функции, реализующей автоматическое изменение высоты textarea
handleTextareaAutosize();


// Вызов функции, реализующей подсчет количества введенных в textarea символов
handleTextareaSymbolCounter();


// Вызов функции, отвечающей за удаление файлов из списка в разделе "Портфолио"
setFilesRemover();


// Инициализация кастомного выпадающего списка для поля
// "Предпочтительный способ связи"
new CustomSelect('#connection').generate();


// Инициализация кастомного выпадающего списка для поля
// "Название компании"
const companyNameCustomField = new CustomSelect('#companyName');
companyNameCustomField.generate();


// Инициализация кастомного дыухуровнего выпадающего списка для поля
// "Выбор компетенций"
new CustomMultiselect('#competencies').generate();


// Инициализация выпадающего списка для поля выбора деятельности НКО
new CustomMultiselect('#npo-activity',{
  wrapClass: ['custom-select__wrap', 'custom-select__wrap_style_multiselect'],
  headingClass: ['heading', 'heading__title', 'custom-select__heading'],
  closeBtnClass: ['btn', 'btn_type_close', 'custom-select__btn-close'],
  fieldClass: ['custom-select__field', 'custom-select__field_style_multiselect','custom-select_style_simple'],
  labelClass: 'custom-select__label',
  chipsClass: 'custom-select__chips',
  chipsTextClass: 'custom-select__chips-text',
  chipsDeleteBtnClass: ['btn', 'custom-select__chips-delete-btn'],
  searchInputClass: 'custom-select__input',
  messageContainerClass: 'custom-select__message',
  modalClass: 'custom-select__modal',
  optionsListContainerClass: 'custom-select__list-container',
  optionsOpenedListContainerClass: 'custom-select__list-container__opened',
  linkClass: 'custom-select__link',
  selectAllGroupLinkClass: 'custom-select__link_type_select-all',
  resetAllGroupLinkClass: 'custom-select__link_type_reset',
  selectBtnClass: ['btn', 'btn_style_primary', 'custom-select__btn', 'custom-select__btn_type_select'],
  resetBtnClass: ['btn', 'btn_style_secondary', 'custom-select__btn', 'custom-select__btn_type_reset'],
  optionsListClass: ['custom-select__list', 'custom-select__list_type_multiselect-full'],
  optionClass: 'custom-select__item',
  optionParentClass: 'custom-select__item_style_parent',
  optionParentOpenedClass: 'custom-select__item_style_parent-opened',
  optionSelectableClass: 'custom-select__item_style_checkbox',
  optionSelectedClass: 'custom-select__item_selected-checkbox',
  mobileScreenBreakpoint: 900,
  firstOptionIsTitle: true,
  useTextSearch: true,
  useSelectCounter: true
}).generate();


// Подключение класса сброса значений полей формы
if (inputs && inputs.length > 0) {
  inputs.forEach((input) => {
    new FieldTextCleaner(input).setEventListeners();
  })
}


// Подключение класса для показа/скрытия пароля
if (pwdInputs && pwdInputs.length > 0) {
  pwdInputs.forEach((input) => {
    new PwdViewer(input).setEventListeners();
  })
}


// Управление показом / скрытием меню в мобильной версии
new MobileMenu({
  menuBtnClass: 'menu-icon',
  menuBtnActiveClass: 'menu-icon_active',
  menuContainerClass: 'header__nav',
  menuContainerOpenedClass: 'header__nav_opened'
}).setEventListeners();



// ================ LK - ACCESS.HTML 23 cogort ==============//
//Инстанс попапа добавления нового работника:
const popupNewWorker = new Popup('#popupNewWorker')
//Кнопка открытия попапа добавления нового работника:
const btnAddWorker = document.querySelector('#btnAddWorker')
//Вешаем слушатель на кнопку для открытия попапа:
btnAddWorker.addEventListener('click', () => {
  popupNewWorker.open()
})