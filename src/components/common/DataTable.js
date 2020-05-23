import React, { useState } from "react";
import { Table, Dropdown, DropdownButton } from "react-bootstrap";
import Select from "react-select";
import { cll } from "../../lib/common";

const defaultFormatter = ({ item, fieldName }) => item[fieldName];

export const DataTable = (props) => {
  const {
    items = [],
    cols,
    enablePaging = false,
    pagingParams = {},
    title = "",
    addControl = null,
  } = props;

  const {
    perPage = 20,
    perPages = [10, 20, 50, 100],
    page = 0,
    showPerPageSelector = false,
  } = pagingParams;
  const [_page, setPage] = useState(page);
  const [_perPage, setPerPage] = useState(perPage);

  let effectiveItems = items;
  let pagesRow = null;
  const pagesList = [];
  let perPageSelector = null;
  if (enablePaging) {
    const maxPage =
      Math.floor(items.length / _perPage) + (items.length % _perPage ? 1 : 0);
    let efPage = _page;
    if (efPage >= maxPage) efPage = maxPage - 1;
    if (efPage < 0) efPage = 0;
    const sI = efPage * _perPage;
    const eI = (efPage + 1) * _perPage + 1;
    effectiveItems = items.slice(sI, eI);

    for (let i = 0; i < maxPage; i++)
      pagesList.push({
        text: `${i + 1}`,
        page: i,
        selected: i === _page,
      });
    pagesRow = pagesList.map((p) => (
      <a
        href="#"
        key={`page-${p.page}`}
        onClick={(e) => onSelectPage(e, p)}
        className={p.selected ? "selected" : ""}
      >
        {p.text}
      </a>
    ));
    perPageSelector = (
      <div className="perPageSelector">
        <Select
          options={perPages.map((p) => ({
            label: p,
            value: p,
          }))}
          value={{ label: _perPage, value: _perPage }}
          onChange={({ value }) => setPerPage(value)}
        />
      </div>
    );
  }
  const onSelectPage = (e, p) => {
    e.preventDefault();
    e.stopPropagation();
    setPage(p.page);
  };

  cll("datatable", {
    perPage,
    items,
    effectiveItems,
    _perPage,
    perPageSelector,
  });

  const table = [
    enablePaging ? (
      <div className="pages" key="pages-top">
        <div className="space"></div>
        {pagesRow}
      </div>
    ) : null,
    <Table key="table" hover>
      <thead>
        <tr>
          {cols.map((c, i) => {
            const style = {};
            if (c.style) Object.assign(style, c.style);
            return (
              <th key={`dt-th-${i}`} style={style}>
                {c.name || ""}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {effectiveItems.map((item, i) => (
          <tr key={`dt-tr-${i}`}>
            {cols.map((c, j) => {
              const fieldName = c.field || c.name;
              const formatter = c.formatter || defaultFormatter;
              return (
                <td key={`dt-td-${i}-${j}`}>
                  {formatter({ item, fieldName, i, j })}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </Table>,
    enablePaging ? (
      <div className="pages" key="pages-bottom">
        {showPerPageSelector ? perPageSelector : null}
        <div className="space"></div>
        {pagesRow}
      </div>
    ) : null,
  ];
  const ret = [
    title && (
      <div className="sectionTitle left p1l p1r" key="title">
        {title} {addControl}
      </div>
    ),
    table,
  ];
  return ret;
};
