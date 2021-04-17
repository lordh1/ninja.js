import React from 'react'
import PropTypes from 'prop-types' 

const Row = (props) => {
  const { row } = props

  return (
    <tr>
      <td>
        <a href={row.edit_path}>
          {row.name1}
        </a><br />
        <small>{row.email}</small>
      </td>
    </tr>
  )
}

Row.propTypes = {
  row: PropTypes.object,
}


export default Row
