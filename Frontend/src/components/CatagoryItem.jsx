import React from 'react'

const CatagoryItem = (props) => {
  return (
    <div className={`catagories flex ${props.isActive?"catag-Active":""}`} onClick={props.handleClick} >{props.name}</div>
  )
}

export default CatagoryItem