import React from 'react'
import PropTypes from 'prop-types'

const Page = (props) => {
  const { pageNumber, currentPageNumber, onChange } = props

  const isActivePage = () => {
    return currentPageNumber === pageNumber
  }

  const renderedPageNumber = () => {
    return pageNumber + 1
  }

  const click = (event) => {
    event.preventDefault()
    onChange(pageNumber)
  }

  if (isActivePage()) {
    return (
      <li className="page-item mr-1">
        <button className="page-link button-outline" onClick={click}>
          {renderedPageNumber()}
        </button>
      </li>
    )
  }
  return (
    <li className="page-item mr-1">
      <button className="page-link" onClick={click}>
        {renderedPageNumber()}
      </button>
    </li>
  )
}

Page.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  currentPageNumber: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Page
