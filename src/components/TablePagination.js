export default class TablePagination {

  genTables() {
    const table = document.querySelector(".table");
    this._perPage = parseInt(table.dataset.pagecount);
    this._createFooters(table);
    this._createTableMeta(table);
    this._loadTable(table);
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
      const callback = this._pageCallback.bind(this, page, table)
      page.addEventListener('click', callback);
      pager.appendChild(page);
    }
    const arrowRight = document.createElement("button");
    arrowRight.className = "pagination__btn-right";
    pager.appendChild(arrowRight);
    table.parentNode.insertBefore(table, pager);
  }

  _pageCallback(button, table) {
    const parent = button.parentNode;
    const items = parent.querySelectorAll(".pagination__item");
    for (let x = 0; x < items.length; x++) {
      items[x].classList.remove("pagination__item_active");
    }
    button.classList.add('pagination__item_active');
    table.dataset.currentpage = button.dataset.index;
    this._loadTable(table);
  }

  _loadTable(table) {
    let startIndex = 0;

    if (table.querySelector('.table__head'))
      startIndex = 1;

    console.log(startIndex);

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