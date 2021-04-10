import React from 'react'
import PropTypes from 'prop-types'; 

import Page from './Page'

const Pagination = (props) => {
  const { currentPageNumber, totalNumberOfPages, onChange } = props;

  const pages =
    Array
      .from(Array(totalNumberOfPages).keys())
      .map(pageNumber => {
        return <Page
          key={pageNumber}
          currentPageNumber={currentPageNumber}
          pageNumber={pageNumber}
          onChange={onChange} />
      })

  if (pages.length <= 1) {
    return null
  }
  return(
    <ul className="pagination">
      {pages}
    </ul>
  )
}

Pagination.propTypes = {
  currentPageNumber: PropTypes.number.isRequired,
  totalNumberOfPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Pagination
