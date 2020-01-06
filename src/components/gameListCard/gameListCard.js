import React from 'react'
import './gameListCard.scss'

const gameListCard = (props) => (
  <div className='gameListCard' onClick={props.clicked}>
    {props.title}
  </div>
)

export default gameListCard
