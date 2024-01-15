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

  const lkAccess = document.querySelector('#lkAccess');
  const lkAccessItem = document.querySelector('#lkAccessItem');
  const headerlkAccess = document.querySelector('#lkAccessHeader');
  const mobileTableHead = document.querySelector('.input_type_make-sort');
  const fieldsetLegend = lkAccess.querySelector('#fieldsetLegend');
  const fieldsetContainer = lkAccess.querySelector('#fieldsetContainer');


  if (table.rows.length > 1) {
    table.classList.remove('display-none');
    pager.classList.remove('display-none');
    mobileTableHead.classList.remove('display-none');
    loadMore.classList.remove('display-none');
    lkAccess.classList.remove('main_pb_small');

    if (fieldsetContainer.classList.contains('fieldset_style_p-none')) {
      fieldsetLegend.classList.add('paragraph_pbm_small');
      fieldsetContainer.classList.remove('fieldset_style_p-none');
    }
  }


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

  const templateProfileSelector = {
    template: '#profileSettings',
    profile: '.table-element',
    title: '.table-element__text_type_title',
    wrenchContainer: '.table-element__wrench-container',
    date: '.table-element__text_type_date',
  }

  const btnProfileSettings = {
    btnProfileEditEmployer: '#changeData',
    btnProfileDeleteEmployer: '#deleteUser',
    btnProfileResetPassword: '#resetPassword',
    btnReturnToTable: '#btnReturnToTable',
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
  const popupReset = new PopupWithForm(popupSelector.popupResetPassword, handleSubmitFormResetPassword);
  popupReset.setEventListeners();

  function handleSubmitFormResetPassword(evt) {
    evt.preventDefault();

    popupReset.close();
  }

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
    pagination.genTables();

    // Добавить сортировку вновь
    sorting.updateSort();

    if (!lkAccessItem.classList.contains('display-none')) {
      const profileSettings = document.querySelector('.table-element');
      lkAccessItem.classList.add('display-none');
      lkAccess.classList.remove('display-none');
      profileSettings.remove();
    }

    if (table.rows.length <= 1) {
      table.classList.add('display-none');
      pager.classList.add('display-none');
      mobileTableHead.classList.add('display-none');
      loadMore.classList.add('display-none');
      lkAccess.classList.add('main_pb_small');
  
      if (fieldsetLegend.classList.contains('paragraph_pbm_small')) {
        fieldsetContainer.classList.add('fieldset_style_p-none');
        fieldsetLegend.classList.remove('paragraph_pbm_small');
      }
    }

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
    currentRow.querySelector('.table__name').textContent = `${dataForm['surname'].value} ${dataForm['name'].value}`;
    currentRow.querySelector('.table__email').textContent = `${dataForm['email'].value}`;
    if (dataForm['isAdmin'].isChecked) {
      const adminIconFormEdit = new Image();
      adminIconFormEdit.src = IconAdmin;
      adminIconFormEdit.alt = 'Права администратора';
      currentRow.querySelector('.table__wrench').innerHTML = '';
      currentRow.querySelector('.table__wrench').append(adminIconFormEdit);
    } else {
      currentRow.querySelector('.table__wrench').innerHTML = '';
    }

    if (!lkAccessItem.classList.contains('display-none')) {
      const profileTitle = lkAccessItem.querySelector(templateProfileSelector.title);
      const profileWrenchContainer = lkAccessItem.querySelector(templateProfileSelector.wrenchContainer);
      profileTitle.textContent = String(dataForm['surname'].value + ' ' + dataForm['name'].value);
      if (dataForm['isAdmin'].isChecked) {
        const adminIconFormEdit = new Image();
        adminIconFormEdit.src = IconAdmin;
        adminIconFormEdit.alt = 'Права администратора';
        profileWrenchContainer.innerHTML = '';
        profileWrenchContainer.append(adminIconFormEdit);
      } else {
        profileWrenchContainer.innerHTML = '';
      }
    }

    // Новая отрисовка
    pager.innerHTML = '';
    pagination.genTables();

    // Добавить сортировку вновь
    sorting.updateSort();

    popupEditEmployer.close();
  }

  function handleSubmitFormAddEmployer(evt) {
    evt.preventDefault();

    const dataForm = popupAddEmployer.getInputValues();

    const trow = document.createElement('tr');
    trow.classList.add('table__row');

    const tname = document.createElement('td');
    tname.classList.add('table__name');
    tname.textContent = `${dataForm['surname'].value} ${dataForm['name'].value}`;
    trow.prepend(tname);

    const twrench = document.createElement('td');
    twrench.classList.add('table__wrench');
    if (dataForm['isAdmin'].isChecked) {
      const adminIconFormAdd = new Image();
      adminIconFormAdd.src = IconAdmin;
      adminIconFormAdd.alt = 'Права администратора';
      twrench.append(adminIconFormAdd);
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

    if (screen.width <= 900) {
      tname.addEventListener('click', handleClickOnName);
    }

    // Новая отрисовка
    pager.innerHTML = '';
    pagination.genTables();

    // Добавить сортировку вновь
    sorting.updateSort();

    if (table.classList.contains('display-none')) {
      table.classList.remove('display-none');
      pager.classList.remove('display-none');
      mobileTableHead.classList.remove('display-none');
      loadMore.classList.remove('display-none');
      lkAccess.classList.remove('main_pb_small');
  
      if (fieldsetContainer.classList.contains('fieldset_style_p-none')) {
        fieldsetLegend.classList.add('paragraph_pbm_small');
        fieldsetContainer.classList.remove('fieldset_style_p-none');
      }
    }

    popupAddEmployer.close();
  }

  function handleClickOnName(evt) {
    const header = document.querySelector('.header');
    lkAccess.classList.add('display-none');
    lkAccessItem.classList.remove('display-none');

    header.scrollIntoView();

    const row = evt.target.closest('tr');
    const tbody = table.querySelector('.table__body');
    indexOfRow = [...tbody.children].indexOf(row);
    const regDate = row.querySelector('.table__data-cell').textContent;
    const fullname = row.querySelector('.table__name').textContent.split(' ');
    const isAdmin = row.querySelector('.table__wrench').innerHTML !== '';

    const profileSettingsContainer = lkAccessItem.querySelector('.content');
    const profileSettingsTemplate = document.querySelector(templateProfileSelector.template);
    profileSettingsContainer.append(profileSettingsTemplate.content.cloneNode(true));

    const profileSettings = profileSettingsContainer.querySelector(templateProfileSelector.profile);
    const profileTitle = profileSettingsContainer.querySelector(templateProfileSelector.title);
    const profileWrenchContainer = profileSettingsContainer.querySelector(templateProfileSelector.wrenchContainer);
    const profileDate = profileSettingsContainer.querySelector(templateProfileSelector.date);

    const btnProfileEditEmployer = lkAccessItem.querySelector(btnProfileSettings.btnProfileEditEmployer);
    const btnProfileDeleteEmployer = lkAccessItem.querySelector(btnProfileSettings.btnProfileDeleteEmployer);
    const btnProfileResetPassword = lkAccessItem.querySelector(btnProfileSettings.btnProfileResetPassword);
    const btnReturnToTable = lkAccessItem.querySelector(btnProfileSettings.btnReturnToTable);

    // Заполнение шаблона
    profileTitle.textContent = String(fullname[0] + ' ' + fullname[1]);
    profileDate.textContent = String(regDate);
    if (isAdmin) {
      const adminIconlkAccessItem = new Image();
      adminIconlkAccessItem.src = IconAdmin;
      adminIconlkAccessItem.alt = 'Права администратора';
      profileWrenchContainer.append(adminIconlkAccessItem);
    } else {
      profileWrenchContainer.innerHTML = '';
    }

    // Обработка кнопки 'изменить данные'
    btnProfileEditEmployer.addEventListener('click', (evt) => {
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
    });

    // Обработка кнопки 'сбросить пароль'
    btnProfileResetPassword.addEventListener('click', () => {
      const email = row.querySelector('.table__email').textContent;
      const data = `Новый пароль будет отправлен на электронную почту <a href="${email}" class="link">${email}</a>`;
      popupReset.insertData(data);
      popupReset.open();
    });

    // Обработка кнопки 'удалить'
    btnProfileDeleteEmployer.addEventListener('click', () => {
      const name = row.querySelector('.table__name').textContent;
      const data = `Данные о сотруднике ${name} будут удалены`;
      popupDelete.insertData(data);
      popupDelete.open();
    });

    btnReturnToTable.addEventListener('click', () => {
      // Новая отрисовка
      pager.innerHTML = '';
      pagination.genTables();

      // Добавить сортировку вновь
      sorting.updateSort();

      lkAccessItem.classList.add('display-none');
      lkAccess.classList.remove('display-none');
      profileSettings.remove();

      if (headerlkAccess) {
        headerlkAccess.scrollIntoView();
      } else {
        table.scrollIntoView();
      }
    });
  }

  const employeeNames = table.querySelectorAll('.table__name');
  employeeNames.forEach((name) => {
    if (screen.width <= 900) {
      name.addEventListener('click', handleClickOnName);
    }
  });


  let oldWidth = window.innerWidth;

  window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;

    if (oldWidth !== currentWidth) {
      oldWidth = currentWidth;
      const employeeNames = table.querySelectorAll('.table__name');
      if (employeeNames.length > 0) {
        employeeNames.forEach((name) => {
          if (window.innerWidth <= 900) {
            name.addEventListener('click', handleClickOnName);
            pagination.openPage(table, 1);
            pagination.loadMoreVisibility(loadMore, table);
          } else {
            name.removeEventListener('click', handleClickOnName);
            pagination.openPage(table, 1);         
          }
        });
      }
    }
  });
}