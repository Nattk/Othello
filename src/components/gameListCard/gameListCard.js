import React from 'react'
import './gameListCard.scss'

const gameListCard = (props) => (
  <section className='gameListCard' onClick={props.clicked}>
    <h2>{props.title}</h2>
    <p>Créer par : {props.creator}</p>
  </section>
)

export default gameListCard
