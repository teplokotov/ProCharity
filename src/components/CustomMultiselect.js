export default class CustomMultiselect {
  /**
   *
   * @param selector - слектор элемента select, который необходимо кастомизировать
   * @param options - объект параметров
   *    wrapClass                       - css-класс обертки (контейнера) кастомизированного поля
   *    headingClass                    - css-класс заголовка модального окна списка выбора (только для мобильной версии)
   *    closeBtnClass                   - css-класс кнопки закрытия модального окна (только для мобильной версии)
   *    fieldClass                      - css-класс поля выбора
   *    labelClass                      - css-класс элемента label
   *    chipsClass                      - css-класс элемента chips
   *    chipsTextClass                  - css-класс текстового контейнера внутри элемента chips
   *    chipsDeleteBtnClass             - css-класс кнопки удаления элемента chips
   *    searchInputClass                - css-класс текстового поля для поиска по списку
   *    messageContainerClass           - css-класс элемента списка, содержащего сообщение об отсутствии результатов поиска
   *    optionsListContainerClass       - css-класс контейнера выпадающего списка
   *    optionsOpenedListContainerClass - css-класс (модификатор) открытого контейнера
   *    linkClass                       - css-класс ссылок для выбора / сброса всех элементов группы (только для мобильной версии)
   *    selectAllGroupLinkClass         - css-класс ссылок для выбора всех элементов группы (только для мобильной версии)
   *    resetAllGroupLinkClass          - css-класс ссылок для сброса всех элементов группы (только для мобильной версии)
   *    selectBtnClass                  - css-класс кнопки подтверждения выбора элементов (только для мобильной версии)
   *    resetBtnClass                   - css-класс кнопки сброса всех элементов (только для мобильной версии)
   *    optionsListClass                - css-класс списка элементов выбора
   *    optionClass                     - css-класс элемента выбора
   *    optionParentClass               - css-класс элемента списка, являющегося родительским
   *    optionParentOpenedClass         - css-класс элемента списка, являющегося родительским, имеющего раскрытый дочерний
   *                                    список (применяется для изменения вида стрелки в мобильной версии)
   *    optionSelectableClass           - css-класс элемента списка, доступного для выбора
   *    mobileScreenBreakpoint          - точка перелома для включения обработки списков, предназначенных для отображения
   *                                    на мобильных устройствах
   *    optionSelectedClass             - css-класс выбранного элемента списка
   *    firstOptionIsTitle              - если установлено в true - первый элемент списка будет
   *                                    использоваться в качестве подписи поля и не будет выводиться
   *                                    в кастомизированном списке
   *    useTextSearch                   - true | false - использовать / не использовать текстовый поиск по элементам списка
   *    useSelectCounter                - true | false - отображение счетчика выбранных опций
   *    isSplash                        - true | false - показывать выбор опций для мобильной версии в модельном окне
   */
  constructor(
    selector, {...options} = {}) {
    this._selectElement = document.querySelector(selector);

    this._options = {};
    this._options.wrapClass = options.wrapClass ?? ['custom-select__wrap', 'custom-select__wrap_style_multiselect'];
    this._options.headingClass = options.headingClass ?? ['heading', 'heading__title', 'custom-select__heading'];
    this._options.closeBtnClass = options.closeBtnClass ?? ['btn', 'btn_type_close', 'custom-select__btn_type_close'];
    this._options.fieldClass = options.fieldClass ?? ['custom-select__field', 'custom-select__field_style_multiselect'];
    this._options.labelClass = options.labelClass ?? 'custom-select__label';
    this._options.chipsClass = options.chipsClass ?? 'custom-select__chips';
    this._options.chipsTextClass = options.chipsTextClass ?? 'custom-select__chips-text';
    this._options.chipsDeleteBtnClass = options.chipsDeleteBtnClass ?? ['btn', 'custom-select__chips-delete-btn'];
    this._options.searchInputClass = options.searchInputClass ?? 'custom-select__input';
    this._options.messageContainerClass = options.messageContainerClass ?? 'custom-select__message';
    this._options.modalClass = options.modalClass ?? 'custom-select__modal';
    this._options.optionsListContainerClass = options.optionsListContainerClass ?? 'custom-select__list-container';
    this._options.optionsOpenedListContainerClass = options.optionsOpenedListContainerClass ?? 'custom-select__list-container_opened';
    this._options.linkClass = options.linkClass ?? 'custom-select__link';
    this._options.selectAllGroupLinkClass = options.selectAllGroupLinkClass ?? 'custom-select__link_type_select-all';
    this._options.resetAllGroupLinkClass = options.resetAllGroupLinkClass ?? 'custom-select__link_type_reset';
    this._options.selectBtnClass = options.selectBtnClass ?? ['btn', 'btn_style_primary', 'custom-select__btn', 'custom-select__btn_type_select'];
    this._options.resetBtnClass = options.resetBtnClass ?? ['btn', 'btn_style_secondary', 'custom-select__btn', 'custom-select__btn_type_reset'];
    this._options.optionsListClass = options.optionsListClass ?? ['custom-select__list', 'custom-select__list_type_multiselect'];
    this._options.optionClass = options.optionClass ?? 'custom-select__item';
    this._options.optionParentClass = options.optionParentClass ?? 'custom-select__item_style_parent';
    this._options.optionParentOpenedClass = options.optionParentOpenedClass ?? 'custom-select__item_style_parent-opened';
    this._options.optionSelectableClass = options.optionSelectableClass ?? 'custom-select__item_style_checkbox';
    this._options.optionSelectedClass = options.optionSelectedClass ?? 'custom-select__item_style_checked';
    this._options.mobileScreenBreakpoint = options.mobileScreenBreakpoint ?? 900;
    this._options.firstOptionIsTitle = options.firstOptionIsTitle ?? false;
    this._options.useTextSearch = options.useTextSearch ?? true;
    this._options.useSelectCounter = options.useSelectCounter ?? false;
    this._options.isSplash = options.isSplash ?? true;

    this._handleSearch = this._handleSearch.bind(this);
  }


  _changeOption(option) {
    if (this._selectElement.multiple) {
      const element = this._selectElement.querySelector(`[value="${option.dataset.val}"]`);

      element.selected = !element.selected
    } else {
      this._selectElement.value = option.dataset.val;
    }
  }


  _createWrap() {
    // Создание обертки для кастомного селекта
    // Обертка позволит позиционировать раскрывающийся список относительно поля выбора
    const element = document.createElement('div');
    element.classList.add(
      ...this._handleClassList(this._options.wrapClass)
    );

    return element;
  }


  _createHeading() {
    const element = document.createElement('h2');
    const heading = this._selectElement.querySelector('option').textContent;
    element.textContent = heading === 'Выбрать' ? 'Выбор компетенции' : heading;
    element.classList.add(
      ...this._handleClassList(this._options.headingClass)
    );

    return element;
  }


  _createCloseBtn() {
    const element = document.createElement('button');
    element.classList.add(
      ...this._handleClassList(this._options.closeBtnClass)
    );

    return element;
  }


  _createField() {
    // Создание поля кастомного селекта
    const element = document.createElement('div');
    element.classList.add(
      ...this._handleClassList(this._options.fieldClass)
    );

    return element;
  }


  _createLabel() {
    // Создание подписи к полю
    const element = document.createElement('span');
    element.classList.add(
      ...this._handleClassList(this._options.labelClass)
    );

    element.textContent = 'Выбрать';

    return element;
  }


  _createListContainer() {
    const element = document.createElement('div');
    element.classList.add(
      ...this._handleClassList(this._options.optionsListContainerClass)
    );

    return element;
  }


  _createSelectResetGroupLink() {
    const element = document.createElement('a');
    element.textContent = 'Сбросить';
    element.classList.add(
      ...this._handleClassList([this._options.linkClass, this._options.resetAllGroupLinkClass])
    );

    return element;
  }


  _createSelectAllLink() {
    const element = document.createElement('a');
    element.textContent = 'Выбрать все';
    element.classList.add(
      ...this._handleClassList([this._options.linkClass, this._options.selectAllGroupLinkClass])
    );

    return element;
  }


  _createList() {
    const element = document.createElement('ul');
    element.classList.add(
      ...this._handleClassList(this._options.optionsListClass)
    );

    return element;
  }


  _createMessageContainer() {
    const element = document.createElement('div');
    element.classList.add(
      ...this._handleClassList(this._options.messageContainerClass)
    );

    element.textContent = 'Ничего не найдено';

    return element;
  }


  _createItem() {
    const element = document.createElement('li');
    element.classList.add(
      ...this._handleClassList(this._options.optionClass)
    );

    return element;
  }


  _createSearchInput() {
    const element = document.createElement('input');
    element.classList.add(
      ...this._handleClassList(this._options.searchInputClass)
    );

    return element;
  }


  _createSelectBtn() {
    const element = document.createElement('button');
    element.classList.add(
      ...this._handleClassList(this._options.selectBtnClass)
    );
    element.textContent = 'Выбрать';

    return element;
  }


  _createResetBtn() {
    const element = document.createElement('button');
    element.classList.add(
      ...this._handleClassList(this._options.resetBtnClass)
    );
    element.textContent = 'Сбросить выбор';

    return element;
  }


  _createChipsContainer() {
    const element = document.createElement('div');
    element.classList.add(
      ...this._handleClassList(this._options.chipsClass)
    );

    return element;
  }


  _createChipsText() {
    const element = document.createElement('span');
    element.classList.add(
      ...this._handleClassList(this._options.chipsTextClass)
    );

    return element;
  }


  _createChipsDeleteBtn() {
    const element = document.createElement('button');
    element.classList.add(
      ...this._handleClassList(this._options.chipsDeleteBtnClass)
    );

    return element;
  }


  _createChips(item) {
    const chips = this._createChipsContainer();
    const chipsText = this._createChipsText();
    const chipsDeleteBtn = this._createChipsDeleteBtn();

    chips.setAttribute('data-val', item.dataset.val);
    chips.classList.add(this._options.chipsClass);

    chipsText.textContent = item.textContent;
    chipsText.classList.add(this._options.chipsTextClass);

    chipsDeleteBtn.setAttribute('data-val', item.dataset.val);
    chipsDeleteBtn.classList.add(this._options.chipsDeleteBtnClass);

    this._labelElement.style.display = 'none';

    chips.append(chipsText, chipsDeleteBtn);

    return chips;
  }


  _removeChips(val) {
    const chips = this._fieldElement.querySelector(`[data-val="${val}"]`);

    if (chips) {
      chips.remove();
    }

    if (!this._fieldElement.querySelector(`.${this._options.chipsClass}`)) {
      this._labelElement.style.display = 'inline';
    }
  }


  //Multi
  _createDropdownBlock() {
    // Создание обертки для кастомного селекта
    this._customSelectElement = this._createWrap();

    //Заголовок выпадающего списка
    this._headingElement = this._createHeading();

    // Кнопка закрытия выпадающего списка
    this._closeBtnElement = this._createCloseBtn();

    // Создание поля кастомного селекта
    this._fieldElement = this._createField();

    // Создание подписи поля
    this._labelElement = this._createLabel();

    if (this._options.firstOptionIsTitle) {
      this._labelElement.textContent = this._selectElement
        .querySelector('option').textContent;
    }

    // Создание текстового поля для поиска элементов списка
    if (this._options.useTextSearch) {
      this._searchInputElement = this._createSearchInput();

      this._fieldElement.append(this._searchInputElement);
    }

    // Добавление текстового элемента и иконки к полю
    this._fieldElement.append(this._labelElement);

    // Добавление поля в контейнер
    this._customSelectElement.append(this._fieldElement);

    // Создание контейнера для вариантов выбора
    this._optionsListContainerElement = this._createListContainer();

    // Создание элемента списка вариантов выбора
    this._optionsListElement = this._createList();

    // Создание контейнера для хранения сообщения об отсутствии результатов поиска
    this._messageContainerElement = this._createMessageContainer();


    // Добавление контейнера с сообщением об отсутствии результатов поиска
    // в элемент списка с вариантами выбора
    this._optionsListElement.append(this._messageContainerElement);


    // Создание кнопки подтверждения выбора
    this._selectBtnElement = this._createSelectBtn();

    // Создание кнопки сброса выбора
    this._resetBtnElement = this._createResetBtn();


    this._optionsListContainerElement.append(
      this._headingElement,
      this._closeBtnElement,
      this._optionsListElement,
      this._selectBtnElement,
      this._resetBtnElement
    );

    this._optionsListContainerElement.classList.add(
      this._options.modalClass
    )

    // Добавление контейнера списка в контейнер поля
    this._customSelectElement.append(this._optionsListContainerElement);
  }


  _getOptions() {
    // Рекурсивная функция для прохода по всем уровням вложенности элементов
    function createDataArray(array) {
      //Результирующий массив
      const resultArray = [];

      array.forEach(item => {
        // Обрабатываются только элементы optgroup и option,
        // в противном случае в результирующий массив попадут
        // текстовые узлы
        if ((item.tagName === 'OPTGROUP'
          || item.tagName === 'OPTION') && !item.hidden) {

          // Объект с параметрами варианта выбора
          resultArray.push({
            tagName: item.tagName.toLocaleLowerCase(),
            value: item.value || null,
            text: item.label || item.textContent,
            id: item.id,
            children: createDataArray(item.childNodes),
            isSelected: item.hasAttribute('selected'),
            isSelectable: item.tagName === 'OPTION'
          });
        }
      })

      return resultArray;
    }

    const optgroups = this._selectElement.querySelectorAll('optgroup');
    const options = this._selectElement.querySelectorAll('option');

    // Если удалось найти внутри элемента select элементы optgroup
    if (optgroups && optgroups.length > 0) {
      // Передаем их в функцию для рекурсивного получения данных
      return createDataArray(optgroups);
    }

    return createDataArray(options);
  }


  //Multi
  _handleItemClick(evt) {
    // Если элемент списка имеет класс выбранного (отмеченного) элемента
    if (evt.target.classList.contains(this._options.optionSelectedClass)) {
      if (this._options.useSelectCounter) {
        this._labelElement.textContent = this._selectElement
          .querySelector('option').textContent + `: ${this._selectElement.selectedOptions.length - 1} из ${this._optionTotalCount}`;
      } else {
        this._removeChips(evt.target.dataset.val);
      }
    } else {
      if (this._options.useSelectCounter) {
        this._labelElement.textContent = this._selectElement
          .querySelector('option').textContent + `: ${this._selectElement.selectedOptions.length + 1} из ${this._optionTotalCount}`;
      } else {
        this._fieldElement.append(this._createChips(evt.target));
      }
    }

    // Переключение класса "выбранного" (отмеченного) элемента
    this._toggleSelectedOption(evt.target);

    // Изменение выбранных элементов в стандартном select
    this._changeOption(evt.target);

    // Очистка поля ввода текста
    // this._searchInputElement.value = '';
  }


  //Multi
  _handleParentItemClick(evt) {
    // console.log(window.innerWidth, this._options.mobileScreenBreakpoint, window.outerWidth < this._options.mobileScreenBreakpoint)

    if (window.innerWidth < this._options.mobileScreenBreakpoint) {
      evt.target.classList.toggle(this._options.optionParentOpenedClass);

      const childContainer = evt.target.querySelector(`.${this._options.optionsListContainerClass}`);

      if (childContainer) {
        childContainer.classList.toggle(this._options.optionsOpenedListContainerClass);
      }
    }
  }


  _handleSearch() {
    // Открываем выпадающий список (на случай, если он был закрыт)
    // при вводе текста в поле всегда будут видны результаты
    this.openDropdown();

    // Счетчик найденных результатов
    let resultCounter = 0;

    // Скрываем все родительские пункты списка
    this._optionsListElement.querySelectorAll(`.${this._options.optionParentClass}`)
      .forEach((parentItem) => {
        parentItem.style.display = 'none';
      })

    // Поиск всех элементов списка среди элементов, доступных для выбора
    this._optionsListElement.querySelectorAll(`.${this._options.optionClass}[data-is-selectable="true"]`)
      .forEach((item) => {
        // Если текстовое содержимое элемента содержит поисковый запрос
        if (item.textContent.toLowerCase()
          .includes(this._searchInputElement.value.toLowerCase())) {
          // Делаем данный элемент видимым
          item.style.display = 'list-item';

          // Находим родительский пункт списка и делаем его видимым
          if (!this._options.useSelectCounter) {
            item.closest(`.${this._options.optionParentClass}`).style.display = 'list-item';
          }

          resultCounter += 1;
        } else {
          // Скрываем остальные элементы, несоответствующие поисковому запросу
          item.style.display = 'none';
        }

        // Если не найдено ни одного совпадения по поисковому запросу
        if (resultCounter === 0) {
          // Выводим сообщение об отсутствии результатов поиска
          this._messageContainerElement.style.display = 'block';
        } else {
          this._messageContainerElement.style.display = 'none';
        }
      })
  }


  //Multi
  _handleSelectGroup(evt) {
    const container = evt.target.parentNode;
    const options = container.querySelectorAll(`.${this._options.optionClass}`);

    options.forEach((option) => {
      const chips = this._fieldElement
        .querySelector(`[data-val="${option.dataset.val}"]`);

      if (!chips) {
        this._fieldElement.append(this._createChips(option));
      }
      this._setSelectedOption(option);
      this._changeOption(option);
    })
  }


  //Multi
  _handleResetGroup(evt) {
    const container = (evt) ? evt.target.parentNode : this._customSelectElement;
    const options = container.querySelectorAll(`.${this._options.optionSelectedClass}`);

    options.forEach((option) => {
      this._removeChips(option.dataset.val);
      this._resetSelectedOption(option);
      this._changeOption(option);
    })

    this._renderCountSelector();
  }

  _handleChipsClick(evt) {
    const val = evt.target.dataset.val;

    const option = document.querySelector(
      `.${this._options.optionClass}[data-val="${val}"]`
    );

    this._changeOption(option);
    this._toggleSelectedOption(option);
    this._removeChips(val);
  }


  _handleClassList(classList) {
    if (typeof classList === 'string') {
      return [classList];
    }
    return classList;
  }


  _createItems(data, parentElement) {
    data.forEach(item => {
      // Создание элемента списка li
      const option = this._createItem();

      // Добавление атрибута для связки элементов выбора со стандартным select
      option.setAttribute('data-val', item.value);
      option.setAttribute('data-is-selectable', item.isSelectable);

      if (item.isSelectable) {
        option.classList.add(
          this._handleClassList(this._options.optionSelectableClass)
        );
      }


      // Установка отображаемого текстового значения
      option.textContent = item.text;

      // Если имеются дочерние элементы
      if (item.children.length > 0) {
        // Добавляем стиль родительского пункта списка (стрелка)
        option.classList.add(
          ...this._handleClassList(this._options.optionParentClass)
        );

        //Создание контейнера (обертки) дочернего списка
        const container = this._createListContainer();
        container.append(this._createSelectResetGroupLink());
        container.append(this._createSelectAllLink());

        // Создание элемента дочернего списка
        const list = this._createList();

        // Рекурсивный вызов
        this._createItems(item.children, list);
        container.append(list)
        option.append(container);
      }
      parentElement.append(option);
    });
  }


  _toggleSelectedOption(option) {
    // Стилизация выбранного элемента списка
    option.classList.toggle(this._options.optionSelectedClass);
  }


  _setSelectedOption(option) {
    option.classList.add(this._options.optionSelectedClass);
  }


  _resetSelectedOption(option) {
    option.classList.remove(this._options.optionSelectedClass);
  }

  _renderCountSelector() {
    if (this._options.useSelectCounter) {
      this._labelElement.textContent = this._selectElement
        .querySelector('option').textContent + `: ${this._selectElement.selectedOptions.length} из ${this._optionTotalCount}`;
    }
  }


  //Multi
  generate() {
    if (this._selectElement) {
      // Создание каркаса кастомного селекта
      this._createDropdownBlock();
      this._selectElement.after(this._customSelectElement);


      // Заполнение каркаса элементами списка
      this._createItems(
        this._getOptions(),
        this._optionsListElement
      );

      //Установка обработчиков событий
      this.setEventListeners();

      // Общее кол-во опций
      this._optionTotalCount = this._selectElement.options.length - 1;
      // Отрисовка текущего выбора
      this._renderCountSelector();
    }
  }


  _closeOtherItems() {
    // Поиск открытого дочернего контейнера с элементами следующего уровня
    const openedChildContainer = this._optionsListContainerElement
      .querySelector(`.${this._options.optionsOpenedListContainerClass}`);

    // Если открытый контейнер найден
    if (openedChildContainer) {
      // Удаление класса "открытого" контейнера
      openedChildContainer.classList.remove(this._options.optionsOpenedListContainerClass);
    }


    // Поиск пункта списка, являющегося родительским для открытого контейнера
    const openedParentItem = this._optionsListContainerElement
      .querySelector(`.${this._options.optionParentOpenedClass}`);

    // Если открытый контейнер найден
    if (openedParentItem) {
      // Удаление класса "открытого" контейнера
      openedParentItem.classList.remove(this._options.optionParentOpenedClass);
    }
  }


  closeDropdown() {
    this._optionsListContainerElement.classList
      .remove(this._options.optionsOpenedListContainerClass);

    // Удаляем все классы-модификаторы открытых дочерних списков
    // (необходимо для корректного расположения дочерних списков при повторном открытии)
    this._optionsListContainerElement
      .querySelectorAll(`.${this._options.optionsOpenedListContainerClass}`)
      .forEach((option) => {
        option.classList.remove(this._options.optionsOpenedListContainerClass);
      })
  }


  openDropdown() {
    this._optionsListContainerElement.classList.add(this._options.optionsOpenedListContainerClass);

    if (this._options.isSplash) {
      this._optionsListContainerElement.classList.add('splash');
    }
  }


  setEventListeners() {
    // Обработка текстового поиска по списку
    if (this._options.useTextSearch) {
      this._searchInputElement.addEventListener('input', this._handleSearch);
    }

    // Обработка клика вне выпадающего списка
    document.addEventListener('mousedown', (evt) => {
      // Если клик был совершен за пределами контейнера
      if (!evt.target.closest(`.${this._options.wrapClass}`)) {
        // Закрытие выпадающего списка
        this.closeDropdown();
      }
    });

    this._resetBtnElement.addEventListener('mousedown', () => {
      this._handleResetGroup();
    })

    // Обработка клика по контейнеру выпадающего списка
    this._customSelectElement.addEventListener('mousedown', (evt) => {
      // Если клик был совершен по кнопке удаления "чипса"
      if (evt.target.classList.contains(this._options.chipsDeleteBtnClass)) {
        this._handleChipsClick(evt);
      }

      // Если клик по ссылке "Выбрать все"
      if (evt.target.classList.contains(this._options.selectAllGroupLinkClass)) {
        this._handleSelectGroup(evt);
      }


      // Если клик по ссылке "Сбросить"
      if (evt.target.classList.contains(this._options.resetAllGroupLinkClass)) {
        this._handleResetGroup(evt);
      }


      // Если клик был совершен по пункту выпадающего списка
      if (evt.target.classList.contains(this._options.optionClass)) {
        // Если пункт доступен для обработки клика (на случай, если в списке будут
        // присутствовать элементы optgroup, не имеющие вложенных элементов option
        // В этом случае клик по пункту никак обработан не будет
        if (evt.target.dataset.isSelectable === 'true') {
          // console.log(987)
          // Обработка клика по элементу
          this._handleItemClick(evt);

          // Если используется текстовый поиск по списку
          if (this._options.useTextSearch) {
            // После выбора элемента возвращаем фокус на поле
            this._searchInputElement.focus();
          }
          // Если клик был произведен по элементу списка, который не доступен для
          // выбора - значит это родительский пункт, при нажатии на который
          // следует раскрыть дочерний список кликабельных элементов
        } else {
          // Перед открытием вложенного списка скрываются все ранее открытые элементы
          this._closeOtherItems();
          // console.log('parent')
          this._handleParentItemClick(evt);
        }


        // В остальных случаях
      } else {
        // Если контейнер выпадающего списка открыт
        // и клик был совершен за пределами дочерних элеменетов пункта списка
        if (this._optionsListContainerElement.classList
            .contains(this._options.optionsOpenedListContainerClass)
          && !evt.target.closest(`.${this._options.optionClass}`)) {
          // Закрытие выпадающего списка
          this.closeDropdown();

        } else {
          // или открываем
          this.openDropdown();
        }
      }
    });
  }
}
