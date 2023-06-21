// Подключение компонентов проекта
import {handleTextareaAutosize} from './textarea-autosize';
import {handleTextareaSymbolCounter} from './textarea-symbol-counter';
import {setFilesRemover} from './uploader-file-remover';
import FieldTextCleaner from '../components/FieldTextCleaner';
import MobileMenu from "../components/MobileMenu";

import CustomSelect from "../components/CustomSelect";
import CustomMultiselect from "../components/CustomMultiselect";
import Popup from '../components/Popup';
import PopupWithForm from '../components/PopupWithForm';
import TablePagination from '../components/TablePagination';
import TableSort from '../components/TableSort';
import IconAdmin from '../images/Table-key.svg';
const adminIcon = new Image();


// Подключение сторонних библиотек
import 'cropperjs';
import Cropper from 'cropperjs';
import PwdViewer from "../components/PwdViewer";
import Avatar from "../components/Avatar";

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


const CustomSelectOfSort = new CustomSelect('#makeSort', {
  firstOptionIsTitle: false,
  isSort: true,
});
CustomSelectOfSort.generate();


// Инициализация кастомного дыухуровнего выпадающего списка для поля
// "Выбор компетенций"
new CustomMultiselect('#competencies').generate();


// Инициализация выпадающего списка для поля выбора деятельности НКО
new CustomMultiselect('#npo-activity',{
  fieldClass: ['custom-select__field', 'custom-select__field_style_multiselect','custom-select_style_simple'],
  selectBtnClass: ['btn', 'btn_style_primary', 'custom-select__btn', 'custom-select__btn_type_select'],
  resetBtnClass: ['btn', 'btn_style_secondary', 'custom-select__btn', 'custom-select__btn_type_reset'],
  optionsListClass: ['custom-select__list', 'custom-select__list_type_multiselect-full'],
  firstOptionIsTitle: true,
  useSelectCounter: true,
  isSplash: false
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


// ================ LK - ACCESS - ITEM.HTML ============== //

// Экземпляр попапа изменения данных сотрудника:
const popupEditEmployerItem = new Popup('#popupEditEmployerItem');
popupEditEmployerItem.setEventListeners();

// Экземпляр попапа сброса пароля сотрудника
const popupResetItem = new Popup('#popupResetItem');
popupResetItem.setEventListeners();

// Экземпляр попапа удаления сотрудника
const popupDeleteItem = new Popup('#popupDeleteItem');
popupDeleteItem.setEventListeners();

const changeDataBtn = document.querySelector('#changeData');
const resetPasswordBtn = document.querySelector('#resetPassword');
const deleteUserBtn = document.querySelector('#deleteUser');

if(changeDataBtn) changeDataBtn.addEventListener('click', () => popupEditEmployerItem.open());
if(resetPasswordBtn) resetPasswordBtn.addEventListener('click', () => popupResetItem.open());
if(deleteUserBtn) deleteUserBtn.addEventListener('click', () => popupDeleteItem.open());

// ================ LK - ACCESS.HTML ============== //

const table = document.querySelector('.table');
const pagination = new TablePagination(table);
const loadMore = document.querySelector('.btn_load_more');
const pager = document.querySelector(".pagination");

if (table) {
  pagination.genTables();
  pagination.loadMore(loadMore, table);
  const sorting = new TableSort({
    handleOpenPagePagination: (table, pageNum) => {
      pagination.openPage(table, pageNum);
      },
    handleRefreshloadMoreButton: (table) => {
      pagination.loadMoreVisibility(loadMore, table);
      },
    getMobileSortingType: (optionValue) => {
      switch (optionValue) {
        case 'по правам администратора':
          return 1;
        case 'по дате регистрации':
          return 2;
        case 'по фамилии и имени':
        default:
          return 0;
        }
      }
    },
    table
  );

  // Первоначальная сортировка по индексу колонки
  sorting.sortByIndex(0);
  // Включение сортировки
  sorting.enableSorting();


  const popupSelector = {
    popupAddEmployer: '#popupAddEmployer',
    popupEditEmployer: '#popupEditEmployer',
    popupResetPassword: '#popupReset',
    popupDelDataUser: '#popupDelete',
  }
  const btnSelector = {
    btnAddEmployer: '#btnAddWorker',
    btnEditEmployer: '.table__btn-edit',
    btnContextMenu: '.table__btn-redact',
    btnReset: '.btnReset',
    btnDelete: '.btnDelete',
  }

  const menuSelector ={
    contextMenu: '.table__menu-body',
    opened: 'table__menu-body_opened',
    menuContainer: '.table__menu-container',
    menuList: 'table__menu-body',
  }

  // Экземпляр попапа добавления нового работника:

  const popupAddEmployer = new PopupWithForm(popupSelector.popupAddEmployer, handleSubmitFormAddEmployer);
  popupAddEmployer.setEventListeners();

  const btnAddEmployer = document.querySelector(btnSelector.btnAddEmployer);

  if (btnAddEmployer) {
    btnAddEmployer.addEventListener('click', () => {
      popupAddEmployer.reset();
      popupAddEmployer.open();
    })
  }

  // Экземпляр попапа изменения данных сотрудника:
  const popupEditEmployer = new PopupWithForm(popupSelector.popupEditEmployer, handleSubmitFormEditEmployer);
  popupEditEmployer.setEventListeners();

  const btnEditEmployer = document.querySelectorAll(btnSelector.btnEditEmployer);

  if (btnEditEmployer) {
    btnEditEmployer.forEach(item => {
      item.addEventListener('click', handleBtnEditEmployer);
    });
  }

  function handleBtnEditEmployer(evt) {
    const row = evt.target.closest('tr');
    const tbody = table.querySelector('.table__body');
    indexOfRow = [...tbody.children].indexOf(row);
    const fullname = row.querySelector('.table__name').textContent.split(' ');
    const isAdmin = row.querySelector('.table__wrench').innerHTML !== '';
    const email = row.querySelector('.table__email').textContent;
    popupEditEmployer.setInputValues({
      name: { type: 'text', value: fullname[1] },
      surname: { type: 'text', value: fullname[0] },
      email: { type: 'email', value: email },
      isAdmin: { type: 'checkbox', isChecked: isAdmin },
    });
    popupEditEmployer.open();
  }

  // Логика открытия контекстного меню
  const btnContextMenu = document.querySelectorAll(btnSelector.btnContextMenu);
  const contextMenu = document.querySelectorAll(menuSelector.contextMenu);
  const btnReset = document.querySelectorAll(btnSelector.btnReset);
  const btnDelete = document.querySelectorAll(btnSelector.btnDelete);

  let indexOfContextMenu = null;
  let indexOfRow;

  if(btnContextMenu) {
    btnContextMenu.forEach(item => {
      item.addEventListener('click', handleBtnContextMenu)
    });
  }

  function handleBtnContextMenu() {
    const currentContextMenu = this.closest(menuSelector.menuContainer).querySelector(menuSelector.contextMenu);
    currentContextMenu.classList.toggle(menuSelector.opened);
    const contextMenu = document.querySelectorAll(menuSelector.contextMenu);
    indexOfContextMenu = [...contextMenu].indexOf(currentContextMenu);
    contextMenu.forEach((item, index) => {
      if(index !== indexOfContextMenu) item.classList.remove(menuSelector.opened);
    });
  }

  if(contextMenu) {
    contextMenu.forEach(item => {
      item.addEventListener('click', handleContextMenu)
    })
  }

  function handleContextMenu(evt) {
    if (!evt.target.classList.contains(menuSelector.menuList)) {
      this.classList.remove(menuSelector.opened);
      indexOfContextMenu = null;
    }
  }

  // Экземпляр попапа сброса пароля сотрудника
  const popupReset = new PopupWithForm(popupSelector.popupResetPassword);
  popupReset.setEventListeners();

  if(btnReset) {
    btnReset.forEach(item => {
      item.addEventListener('click', handleBtnReset)
    })
  }

  function handleBtnReset(evt) {
    const row = evt.target.closest('tr');
    const tbody = table.querySelector('.table__body');
    indexOfRow = [...tbody.children].indexOf(row);
    const email = row.querySelector('.table__email').textContent;
    const data = `Новый пароль будет отправлен на электронную почту <a href="${email}" class="link">${email}</a>`;
    popupReset.insertData(data);
    popupReset.open();
  }

  // Экземпляр попапа удаления сотрудника
  const popupDelete = new PopupWithForm(popupSelector.popupDelDataUser, handleSubmitFormDeleteEmployer);
  popupDelete.setEventListeners();

  function handleSubmitFormDeleteEmployer(evt) {
    evt.preventDefault();
    const tbody = table.querySelector('.table__body');
    const currentRow = tbody.children[indexOfRow];
    currentRow.remove();
    // Новая отрисовка
    pager.innerHTML = '';
    const pageNum = Number(table.getAttribute('data-currentpage')) + 1;
    pagination.genTables();
    pagination.loadMore(loadMore, table);
    pagination.openPage(table, pageNum);

    // Добавить сортировку вновь
    sorting.updateSort();

    popupDelete.close();
  }

  if(btnDelete) {
    btnDelete.forEach(item => {
      item.addEventListener('click', handleBtnDelete);
    })
  }

  function handleBtnDelete(evt) {
    const row = evt.target.closest('tr');
    const tbody = table.querySelector('.table__body');
    indexOfRow = [...tbody.children].indexOf(row);
    const name = row.querySelector('.table__name').textContent;
    const data = `Данные о сотруднике ${name} будут удалены`;
    popupDelete.insertData(data);
    popupDelete.open();
  }

  // -----
  const popupAlertPassword = new Popup('#popupAlertPassword');
  popupAlertPassword.setEventListeners();

  const popupAlertError = new Popup('#popupAlertError');
  popupAlertError.setEventListeners();

  const popupAlertData = new Popup('#popupAlertData');
  popupAlertData.setEventListeners();

  // ----

  function handleSubmitFormEditEmployer(evt) {
    evt.preventDefault();
    const dataForm = popupEditEmployer.getInputValues();
    const tbody = table.querySelector('.table__body');
    const currentRow = tbody.children[indexOfRow];
    currentRow.querySelector('.table__name').textContent = `${dataForm['name'].value} ${dataForm['surname'].value}`;
    currentRow.querySelector('.table__email').textContent = `${dataForm['email'].value}`;
    if (dataForm['isAdmin'].isChecked) {
      adminIcon.src = IconAdmin;
      adminIcon.alt = 'Права администратора';
      currentRow.querySelector('.table__wrench').innerHTML = '';
      currentRow.querySelector('.table__wrench').append(adminIcon);
    } else {
      currentRow.querySelector('.table__wrench').innerHTML = '';
    }
    popupEditEmployer.close();
  }

  function handleSubmitFormAddEmployer(evt) {
    evt.preventDefault();

    const dataForm = popupAddEmployer.getInputValues();

    const trow = document.createElement('tr');
    trow.classList.add('table__row');

    const tname = document.createElement('td');
    tname.classList.add('table__name');
    tname.textContent = `${dataForm['name'].value} ${dataForm['surname'].value}`;
    trow.prepend(tname);

    const twrench = document.createElement('td');
    twrench.classList.add('table__wrench');
    if (dataForm['isAdmin'].isChecked) {
      adminIcon.src = IconAdmin;
      adminIcon.alt = 'Права администратора';
      twrench.append(adminIcon);
    }
    tname.after(twrench);

    const tdate = document.createElement('td');
    tdate.classList.add('table__data-cell');
    const currentDate = new Date();
    const dateOptions = { hour: 'numeric', minute: 'numeric' };
    tdate.textContent = currentDate.toLocaleDateString('ru-RU', dateOptions).replace(',','');
    twrench.after(tdate);

    const temail = document.createElement('td');
    temail.classList.add('table__email');
    temail.textContent = dataForm['email'].value;
    tdate.after(temail);

    const tedit = document.createElement('td');
    tedit.classList.add('table__edit');
    temail.after(tedit);

    const contextMenu = document.querySelector('#contextMenu');
    tedit.append(contextMenu.content.cloneNode(true));

    const tbody = table.querySelector('.table__body');
    tbody.prepend(trow);

    const btnEdit = trow.querySelector('.table__btn-redact');
    btnEdit.addEventListener('click', handleBtnContextMenu);

    const menuBody = trow.querySelector('.table__menu-body');
    menuBody.addEventListener('click', handleContextMenu);

    const btnEditEmployer = trow.querySelector('.table__btn-edit');
    btnEditEmployer.addEventListener('click', handleBtnEditEmployer);

    const btnReset = trow.querySelector('.btnReset');
    btnReset.addEventListener('click', handleBtnReset);

    const btnDelete = trow.querySelector('.btnDelete');
    btnDelete.addEventListener('click', handleBtnDelete);

    // Новая отрисовка
    pager.innerHTML = '';
    const pageNum = Number(table.getAttribute('data-currentpage')) + 1;
    pagination.genTables();
    pagination.openPage(table, pageNum);

    // Добавить сортировку вновь
    sorting.updateSort();

    popupAddEmployer.close();
  }

}
