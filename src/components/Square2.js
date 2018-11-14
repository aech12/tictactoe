import React from 'react'
import './All.css'

const Square = ({onClick, value}) => {
  return (
    <div>
      <button
        style={{border:'5px solid black',
        height:'100px', width:'100px'}}
        className='square'
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  )
}


export default Square

