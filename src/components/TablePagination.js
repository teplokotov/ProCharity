export default class TablePagination {
  constructor(table) {
    this._table = table;
  }

  genTables() {
    this._perPage = parseInt(this._table.dataset.pagecount);
    this._createTableMeta(this._table);
    this._createFooters(this._table);
    this._loadTable(this._table);
  }

  _createTableMeta(table) {
    table.dataset.currentpage = "0";
  }

  _createFooters(table) {
    let hasHeader = false;
    if (table.querySelector('.table__head'))
      hasHeader = true;

    let rows = table.rows.length;

    if (hasHeader)
      rows = rows - 1;

    let numPages = rows / this._perPage;
    const pager = document.querySelector(".pagination");

    if (numPages % 1 > 0)
      numPages = Math.floor(numPages) + 1;

    const arrowLeft = document.createElement("button");
    arrowLeft.className = "pagination__btn-left";
    pager.appendChild(arrowLeft);

    for (let i = 0; i < numPages; i++) {
      const page = document.createElement("button");
      page.innerHTML = (i + 1).toString();
      page.className = "pagination__item";
      page.dataset.index = i.toString();

      if (i === 0)
        page.classList.add("pagination__item_active");
      const callback = this._pageCallback.bind(this, page, table, page.dataset.index);
      page.addEventListener('click', callback);
      pager.appendChild(page);
    }
    const arrowRight = document.createElement("button");
    arrowRight.className = "pagination__btn-right";
    pager.appendChild(arrowRight);
    this._arrowsEventListener(table);
    table.parentNode.insertBefore(table, pager);
  }

  _arrowsEventListener(table) {
    const arrowRight = document.querySelector('.pagination__btn-right');
    const arrowLeft = document.querySelector('.pagination__btn-left');
    const pages = document.querySelectorAll('.pagination__item').length;
    arrowRight.addEventListener('click', () => {
      let _index = parseInt(table.dataset.currentpage);
      if (_index < pages - 1) {
        _index++;
        const page = document.querySelectorAll(".pagination__item")[_index];

        const callback = this._pageCallback.bind(this, page, table, _index);
        callback();
      }
    });
    arrowLeft.addEventListener('click', () => {
      let _index = parseInt(table.dataset.currentpage);
      if (_index > 0) {
        _index--;
        const page = document.querySelectorAll(".pagination__item")[_index]

        const callback = this._pageCallback.bind(this, page, table, _index);
        callback();
      }
    })
  }

  openPage(table, pageNum) {
    const pages = document.querySelectorAll('.pagination__item').length;
    if (pageNum > 0 && pageNum <= pages) {
      const _index = pageNum - 1;
      const page = document.querySelectorAll(".pagination__item")[_index]
      const callback = this._pageCallback.bind(this, page, table, _index);
      callback();
    }
  }

  loadMore(loadMoreButton, table) {
    const inactiveRows = table.querySelectorAll('.table__row-inactive');
    if (inactiveRows.length >= 1) {
      loadMoreButton.addEventListener('click', (evt) => {
        const inactiveRows = table.querySelectorAll('.table__row-inactive');
        const inactiveRowsCount = inactiveRows.length;
        const rowsCount = inactiveRowsCount - 5 >= 0 ? 5 : inactiveRowsCount;
        for (let x = 0; x < rowsCount; x++) {
          inactiveRows[x].classList.remove("table__row-inactive");
        }
        if (inactiveRowsCount - 5 <= 0) {
          evt.currentTarget.classList.add("btn_style_hidden");
        }
      });
    } else {
      loadMoreButton.classList.add("btn_style_hidden");
    }
  }

  loadMoreVisibility(loadMoreButton, table) {
    const inactiveRows = table.querySelectorAll('.table__row-inactive');
    if (inactiveRows.length >= 1) {
      if (loadMoreButton.classList.contains("btn_style_hidden")) {
        loadMoreButton.classList.remove("btn_style_hidden")
      }
    }
  }

  _pageCallback(button, table, index) {
    const parent = button.parentNode;
    const items = parent.querySelectorAll(".pagination__item");
    for (let x = 0; x < items.length; x++) {
      items[x].classList.remove("pagination__item_active");
    }
    button.classList.add('pagination__item_active');
    table.dataset.currentpage = index;
    this._loadTable(table);
  }

  _loadTable(table) {
    let startIndex = 0;

    if (table.querySelector('.table__head'))
      startIndex = 1;

    const start = (parseInt(table.dataset.currentpage) * table.dataset.pagecount) + startIndex;
    const end = start + parseInt(table.dataset.pagecount);
    const rows = table.rows;

    for (let x = startIndex; x < rows.length; x++) {
      if (x < start || x >= end)
        rows[x].classList.add("table__row-inactive");
      else
        rows[x].classList.remove("table__row-inactive");
    }
  }

}