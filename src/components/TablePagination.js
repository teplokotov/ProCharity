export default class TablePagination {
  constructor(perPage = 20) {
    this._perPage = perPage;
    this._loadTable = this.loadTable.bind(this)
  }

  genTables() {
    const tables = document.querySelectorAll(".table");
    for (let i = 0; i < tables.length; i++) {
      this._perPage = parseInt(tables[i].dataset.pagecount);
      this._createFooters(tables[i]);
      this._createTableMeta(tables[i]);
      this._loadTable(tables[i]);
    }
  }

  _createTableMeta(table) {
    table.dataset.currentpage = "0";
  }

  _createFooters(table) {
    let hasHeader = false;
    if (table.querySelector('th'))
      hasHeader = true;

    let rows = table.rows.length;

    if (hasHeader)
      rows = rows - 1;

    let numPages = rows / this._perPage;
    const pager = document.createElement("div");

    // add an extra page, if we're
    if (numPages % 1 > 0)
      numPages = Math.floor(numPages) + 1;

    pager.className = "pager";
    for (let i = 0; i < numPages; i++) {
      const page = document.createElement("div");
      page.innerHTML = (i + 1).toString();
      page.className = "pager-item";
      page.dataset.index = i.toString();

      if (i === 0)
        page.classList.add("selected");

      page.addEventListener('click', function () {
        const parent = this.parentNode;
        const items = parent.querySelectorAll(".pager-item");
        for (let x = 0; x < items.length; x++) {
          items[x].classList.remove("selected");
        }
        this.classList.add('selected');
        table.dataset.currentpage = this.dataset.index;
        this._loadTable(table)
      });
      pager.appendChild(page);
    }
    table.parentNode.insertBefore(pager, table);
  }

  loadTable(table) {
    let startIndex = 0;

    if (table.querySelector('th'))
      startIndex = 1;

    console.log(startIndex);

    const start = (parseInt(table.dataset.currentpage) * table.dataset.pagecount) + startIndex;
    const end = start + parseInt(table.dataset.pagecount);
    const rows = table.rows;

    for (let x = startIndex; x < rows.length; x++) {
      if (x < start || x >= end)
        rows[x].classList.add("inactive"); //ToDo поменять класс
      else
        rows[x].classList.remove("inactive");
    }
  }

}