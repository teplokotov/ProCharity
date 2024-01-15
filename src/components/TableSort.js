export default class TableSort {
  constructor({ handleOpenPagePagination, handleRefreshloadMoreButton, getMobileSortingType }, table) {
    this._table = table;
    this._headers = this._table.querySelectorAll('th');
    this._colIndex = -1;
    this._previousIndex = -1;
    this._getMobileSortingType = getMobileSortingType;
    this._handleOpenPagePagination = handleOpenPagePagination;
    this._handleRefreshloadMoreButton = handleRefreshloadMoreButton;
  }

  _compare = (rowA, rowB) => {
    const rowDataA = rowA.cells[this._currentIndex].innerHTML;
    const rowDataB = rowB.cells[this._currentIndex].innerHTML;

    switch (this._type) {
      case 'number':
        return Number.parseFloat(rowDataA) - Number.parseFloat(rowDataB);
      case 'date':
        const dateA = String(rowDataA.split(' ')[0].split('.').reverse().join('-') + 'T' + rowDataA.split(' ')[1] + ':00.000Z');
        const dateB = String(rowDataB.split(' ')[0].split('.').reverse().join('-') + 'T' + rowDataB.split(' ')[1] + ':00.000Z');
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      case 'bool':
        return Boolean(String(rowDataB)) - Boolean(String(rowDataA));
      case 'string':
      default:
        return String(rowDataA).toLowerCase().localeCompare(String(rowDataB).toLowerCase());
    }
  }

  _sortTable(isSorted) {
    const tableBody = this._table.querySelector('tbody');
    const rows = tableBody.querySelectorAll('tr');    
    const newRows = Array.from(rows);
    const pageNum = 1;

    newRows.sort(this._compare);

    if (isSorted) {
      newRows.reverse();
    }

    this._table.removeChild(tableBody);

    newRows.forEach((newRow) => {
      tableBody.appendChild(newRow);
    })

    this._table.appendChild(tableBody);

    this._handleOpenPagePagination(this._table, pageNum);
  }

  _switchStyle() {
    switch (true) {
      case (this._previousIndex === -1):
        this._previousIndex = this._currentIndex;
        this._headers[this._currentIndex].querySelector('p').classList.add('table__head-text_sort');
        this._headers[this._currentIndex].querySelector('button').classList.add('table__btn-head_active');
        this._headers[this._currentIndex].querySelector('button').classList.add('table__btn-head_rotate');
        break;
      case ((this._previousIndex !== -1) && (this._previousIndex !== this._currentIndex)):
        this._headers[this._previousIndex].querySelector('p').classList.remove('table__head-text_sort');
        this._headers[this._previousIndex].querySelector('button').classList.remove('table__btn-head_rotate');
        this._headers[this._previousIndex].querySelector('button').classList.remove('table__btn-head_active');
        this._headers[this._currentIndex].querySelector('p').classList.add('table__head-text_sort');
        this._headers[this._currentIndex].querySelector('button').classList.add('table__btn-head_active');
        this._headers[this._currentIndex].querySelector('button').classList.add('table__btn-head_rotate');
        this._previousIndex = this._currentIndex;
        break;
      case ((this._previousIndex === this._currentIndex) && (!this._isUpdateSort)):
        if (this._headers[this._currentIndex].querySelector('button').classList.contains('table__btn-head_rotate')) {
          this._headers[this._currentIndex].querySelector('button').classList.remove('table__btn-head_rotate');
        } else {
          this._headers[this._currentIndex].querySelector('button').classList.add('table__btn-head_rotate');
        }
        break;
      case (this._isUpdateSort):
        this._isUpdateSort = false;
        break;
      default:
        break;
    }
  }

  sortByIndex(index) {
    this._currentIndex = index;
    this._type = this._headers[index].getAttribute('data-type');

    this._switchStyle();

    this._sortTable(this._colIndex === this._currentIndex);
    this._colIndex = (this._colIndex === this._currentIndex) ? -1 : this._currentIndex;
  }

  updateSort() {
    this._headers.forEach((header) => {
      if (header.textContent !== '') {
        if (header.querySelector('p').classList.contains('table__head-text_sort')) {
          this._colIndex = (this._colIndex === -1) ? header.cellIndex : -1;
          this._isUpdateSort = true;
          this.sortByIndex(header.cellIndex);
          if (screen.width <= 900) {
            this._handleRefreshloadMoreButton(this._table);
          }
        }
      }
    });
  }

  enableSorting() {
    const makeSortSelector = document.querySelector('#makeSort');

    makeSortSelector.addEventListener('change', () => {
      const optionValue = String(makeSortSelector.value);
      this.sortByIndex(this._getMobileSortingType(optionValue));
      this._handleRefreshloadMoreButton(this._table);
    });

    this._headers.forEach((header) => {
      if (header.textContent !== '') {
        header.addEventListener('click', () => {
          this.sortByIndex(header.cellIndex);
        });
      }
    });
  }
}