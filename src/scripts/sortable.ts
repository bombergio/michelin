// Click-to-sort for <table data-sortable>. Header cells opt in with data-sort="text|num".
export function initSortable(root: ParentNode = document) {
  root.querySelectorAll<HTMLTableElement>("table[data-sortable]").forEach((table) => {
    const headers = table.querySelectorAll<HTMLTableCellElement>("th[data-sort]")
    headers.forEach((th) => {
      const button = document.createElement("button")
      button.type = "button"
      button.append(...th.childNodes)
      th.append(button)
      button.addEventListener("click", () => {
        const dir = th.getAttribute("aria-sort") === "descending" ? "ascending" : "descending"
        headers.forEach((h) => h.removeAttribute("aria-sort"))
        th.setAttribute("aria-sort", dir)
        const col = [...th.parentElement!.children].indexOf(th)
        const numeric = th.dataset.sort === "num"
        const body = table.tBodies[0]
        const rows = [...body.rows].sort((a, b) => {
          const x = a.cells[col].dataset.value ?? a.cells[col].textContent ?? ""
          const y = b.cells[col].dataset.value ?? b.cells[col].textContent ?? ""
          const cmp = numeric ? Number(x) - Number(y) : x.localeCompare(y)
          return dir === "ascending" ? cmp : -cmp
        })
        body.append(...rows)
      })
    })
  })
}
