import React from 'react'
import './All.css'

const Square = ({onClick, value}) => {
  return (
    <div className='square' onClick={onClick}>
      {value}
    </div>
  )
}


export default Square

