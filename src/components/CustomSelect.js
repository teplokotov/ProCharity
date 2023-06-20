export default class CustomSelect {
  /**
   *
   * @param selector - слектор элемента select, который необходимо кастомизировать
   * @param options - объект параметров
   *    wrapClass                       - класс обертки (контейнера) кастомизированного поля
   *    fieldClass                      - класс поля выбора
   *    fieldTextClass                  - класс текстобого блока, вложенного в поле выбора
   *    optionsListContainerClass       - класс контейнера выпадающего списка
   *    optionsOpenedListContainerClass - класс (модификатор) открытого контейнера
   *    optionsListClass                - класс списка элементов выбора <ul>
   *    optionClass                     - класс элемента выбора <li>
   *    optionParentClass               - класс, применяющийся к эдементам списка, которые имеют вложенные
   *                                    (дочерние) элементы
   *    optionSelectedClass             - класс выбранного элемента списка
   *    firstOptionIsTitle              - если установлено в true - первый элемент списка будет
   *                                    использоваться в качестве подписи поля и не будет выводиться
   *                                    в кастомизированном списке
   */
  constructor(selector, {...options} = {}) {
    this._selectElement = document.querySelector(selector);
    this._options = {};
    this._options.wrapClass = options.wrapClass ?? 'custom-select__wrap';
    this._options.closeBtnClass = options.closeBtnClass ?? ['btn', 'btn_type_close', 'custom-select__btn_type_close'];
    this._options.fieldClass = options.fieldClass ?? 'custom-select__field';
    this._options.fieldDisabledClass = options.fieldDisabledClass ?? 'custom-select__field_disabled';
    this._options.fieldTextClass = options.fieldTextClass ?? 'custom-select__field-text';
    this._options.optionsListContainerClass = options.optionsListContainerClass ?? 'custom-select__list-container';
    this._options.optionsOpenedListContainerClass = options.optionsOpenedListContainerClass ?? 'custom-select__list-container_opened';
    this._options.optionsListClass = options.optionsListClass ?? 'custom-select__list';
    this._options.optionClass = options.optionClass ?? 'custom-select__item';
    this._options.optionParentClass = options.optionParentClass ?? 'custom-select__item_style_parent';
    this._options.optionSelectedClass = options.optionSelectedClass ?? 'custom-select__item_selected';
    this._options.firstOptionIsTitle = options.firstOptionIsTitle ?? true;
    this._options.isSort = options.isSort ?? false;
  }


  _changeOption(option) {
    if (this._selectElement.multiple) {
      const element = this._selectElement.querySelector(`[value="${option.dataset.val}"]`);

      element.selected = !element.selected
    } else {
      this._selectElement.value = option.dataset.val;
      this._selectElement.dispatchEvent(new Event('change'));
    }
  }


  _createWrap() {
    // Создание обертки для кастомного селекта
    // Обертка позхволит позиционировать раскрывающийся список относительно поля выбора
    const element = document.createElement('div');
    element.classList.add(...this._handleClassList(this._options.wrapClass));

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
    element.classList.add(...this._handleClassList(this._options.fieldClass));

    return element;
  }


  //Select
  _createFieldText() {
    const element = document.createElement('div');
    element.classList.add(...this._handleClassList(this._options.fieldTextClass));

    return element;
  }


  _createListContainer() {
    const element = document.createElement('div');
    element.classList.add(...this._handleClassList(this._options.optionsListContainerClass));

    return element;
  }


  _createList() {
    const element = document.createElement('ul');
    element.classList.add(...this._handleClassList(this._options.optionsListClass));

    return element;
  }


  _createItem() {
    const element = document.createElement('li');
    element.classList.add(...this._handleClassList(this._options.optionClass));

    return element;
  }


  //Select
  _createDropdownBlock() {
    // Создание обертки для кастомного селекта
    this._customSelectElement = this._createWrap();

    // Кнопка закрытия выпадающего списка
    this._closeBtnElement = this._createCloseBtn();

    // Создание поля кастомного селекта
    this._fieldElement = this._createField();

    // Создание текстового элемента поля
    this._fieldTextElement = this._createFieldText(); //Select

    if (this._selectElement.hasAttribute('disabled')) {
      this.setDisabled();
    }

    if (this._options.firstOptionIsTitle && !this._options.isSort) {
      this._fieldTextElement.textContent = this._selectElement.querySelector('option').textContent;
    } else {
      this._fieldTextElement.textContent = 'Сортировать: ' + this._selectElement.querySelector('option').textContent;
    }

    // Добавление текстового элемента и иконки к полю
    this._fieldElement.append(this._fieldTextElement); //Select

    // Добавление поля в контейнер
    this._customSelectElement.append(this._fieldElement);

    // Создание контейнера для вариантов выбора
    this._optionsListContainerElement = this._createListContainer();

    // Создание элемента списка вариантов выбора
    this._optionsListElement = this._createList();


    // Добавление элемента списка в контейнер списка
    this._optionsListContainerElement.append(
      this._closeBtnElement,
      this._optionsListElement
    );

    // Добавление контейнера списка в контейнер поля
    this._customSelectElement.append(this._optionsListContainerElement);
  }


  _getOptions() {
    this._data = [];

    // Рекурсивная функция для прохода по всем уровням вложенности элементов
    function createDataArray(array) {
      //Результирующий массив
      const resultArray = [];

      array.forEach((item, index) => {
        // Обрабатываются только элементы optgroup и option,
        // в противном случае в результирующий массив попадут
        // текстовые узлы
        if (item.tagName === 'OPTGROUP'
          || item.tagName === 'OPTION') {

          // Объект с параметрами варианта выбора
          resultArray.push({
            tagName: item.tagName.toLocaleLowerCase(),
            value: item.value || null,
            text: item.label || item.textContent,
            id: item.id,
            children: createDataArray(item.childNodes),
            isSelected: item.hasAttribute('selected')
          });
        }
      })

      return resultArray;
    }

    const optgroups = this._selectElement.querySelectorAll('optgroup');
    const options = this._selectElement.querySelectorAll('option');

    // Если удалось найти внутри элемента select элементы optgroup
    if (optgroups && optgroups.length > 0) {
      //Передаем их в фукцию для рекурсивного получения данных
      return createDataArray(optgroups);
    }

    return createDataArray(options);
  }


  _getSelectedOption() {
    return this._optionsListElement
      .querySelector(`.${this._options.optionSelectedClass}`);
  }


  //Select
  _handleItemClick(evt) {
    this._resetSelectedOption();

    this._setSelectedOption(evt.target);
    this._setFieldText(); //Select

    this._changeOption(evt.target);
  }


  _handleClassList(classList) {
    if (typeof classList === 'string') {
      return [classList];
    }
    return classList;
  }


  _resetSelectedOption() {
    const selectedOption = this._getSelectedOption();

    if (selectedOption) {
      selectedOption.classList.remove(this._options.optionSelectedClass);
    }
  }


  //Select
  _setFieldText() {
      const selectedOption = this._getSelectedOption();

      if(selectedOption) {
        if (!this._options.isSort) {
          this._fieldTextElement.textContent = selectedOption.textContent;
        } else {
          this._fieldTextElement.textContent = 'Сортировать: ' + selectedOption.textContent;
        }
      }
  }


  _createItems(data, parentElement) {
    data.forEach((item, index) => {
      if (this._options.firstOptionIsTitle && index !== 0) {
        // Создание элемента списка li
        const option = this._createItem();

        // Добавление атрибута для связки элементов выбора с стандартным select
        option.setAttribute('data-val', item.value);
        option.setAttribute('data-is-selectable', item.isSelectable);

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

          // Создание элемента дочернего списка
          const list = this._createList();

          // Рекурсивный вызов
          this._createItems(item.children, list);
          container.append(list)
          option.append(container);
        }

        parentElement.append(option);
      } else if (this._options.isSort) {
        // Создание элемента списка li
        const option = this._createItem();

        // Добавление атрибута для связки элементов выбора с стандартным select
        option.setAttribute('data-val', item.value);

        // Установка отображаемого текстового значения
        option.textContent = item.text;

        // Выбирает первый пункт по умолчанию
        if (index == 0) this._setSelectedOption(option);

        parentElement.append(option);
      }
    });
  }


  _setSelectedOption(option) {
    // Стилизация выбранного элемента списка
    option.classList.add(this._options.optionSelectedClass);
  }


  //Select
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

      // Сработает при инициализации, если параметр options.firstOptionIsTitle = true
      // первый option из списка будет являться подписью кастомного списка
      this._setFieldText(); //Select

      //Установка обработчиков событий
      this.setEventListeners();
    }
  }


  closeDropdown() {
    this._optionsListContainerElement.classList
      .remove(this._options.optionsOpenedListContainerClass);
  }


  openDropdown() {
    this._optionsListContainerElement.classList
      .add(this._options.optionsOpenedListContainerClass);
  }


  setDisabled() {
    this._selectElement.disabled = true;
    this._fieldElement.classList.add(this._options.fieldDisabledClass);
  }


  resetDisabled() {
    this._selectElement.disabled = false;
    this._fieldElement.classList.remove(this._options.fieldDisabledClass);
  }


  setEventListeners() {
    document.addEventListener('mousedown', (evt) => {
      // Если клик был совершен за пределами контейнера
      if (!evt.target.closest(`.${this._options.wrapClass}`)) {
        // Закрытие выпадающего списка
        this.closeDropdown();
      }
    });

    this._customSelectElement.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(this._options.optionClass)) {
        // Обработка клика по элементу
        this._handleItemClick(evt);
        // Закрытие выпадающего списка
        this.closeDropdown();

        // В остальных случаях
      } else {
        // Если  контейнер выпадающего списка открыт
        if (this._optionsListContainerElement.classList
          .contains(this._options.optionsOpenedListContainerClass)) {
          // Закрытие выпадающего списка
          this.closeDropdown();

        } else if (!this._fieldElement.classList.contains(this._options.fieldDisabledClass)) {
          // или открываем, если поле не заблочено
          this.openDropdown();
        }
      }
    });
  }

}
