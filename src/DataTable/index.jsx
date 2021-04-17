import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Pagination from './Pagination';
import Row from './Row';
import Search from './Search';

const DataTable = (props) => {
  const { rows, rowsPerPage } = props;

  const calculateTotalNumberOfPages = (rowsData) => {
    if (rowsPerPage === 0) return 0;
    return Math.ceil(rowsData.length / rowsPerPage);
  };

  const [rowsData, setRowsData] = useState([...rows]);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(
    calculateTotalNumberOfPages(rows)
  );

  const search = (event) => {
    const text = event.target.value;
    let rowsFound = rows;

    if (text) {
      rowsFound = rowsData.filter((row) => {
        return (
          row.name1.toLowerCase().search(text.toLowerCase()) > -1 ||
          (row.email && row.email.toLowerCase().search(text.toLowerCase()) > -1)
        );
      });
    }

    setRowsData(rowsFound);
    setCurrentPageNumber(0);
    setTotalNumberOfPages(calculateTotalNumberOfPages(rowsFound));
  };

  const changeToPageNumber = (pageNumber) => {
    setCurrentPageNumber(pageNumber);
  };

  const rowsInPageNumber = (pageNumber) => {
    const startIndex = pageNumber * rowsPerPage;
    return [startIndex, startIndex + rowsPerPage];
  };

  const rowsToRender = rowsData
    .map((row) => <Row key={row.per_id} row={row} />)
    .slice(...rowsInPageNumber(currentPageNumber));

  return (
    <div>
      <Search onSearch={search} />
      <table>
        <tbody>{rowsToRender}</tbody>
      </table>
      <Pagination
        currentPageNumber={currentPageNumber}
        totalNumberOfPages={totalNumberOfPages}
        onChange={changeToPageNumber}
      />
    </div>
  );
};

DataTable.defaultProps = {
  rowsPerPage: 40,
};

DataTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowsPerPage: PropTypes.number,
};

export default DataTable;
