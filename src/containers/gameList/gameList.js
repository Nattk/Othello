import React from 'react'
import axios from 'axios'
import GameListCard from '../../components/gameListCard/gameListCard'
import Spinner from '../../components/ui/spinner'
import makeGameBoard from '../../utils/game/makeGameBoard'
import './gameList.scss'

class GameList extends React.Component {
    state = {
      endpoint: 'http://localhost:4001',
      games: '',
      userName: '',
      loaded: false
    }

    componentDidMount () {
      const userId = localStorage.getItem('userId')

      axios.get(`${this.state.endpoint}/get-games`)
        .then(games => {
          this.setState({ games: games.data })
          return axios.get(`${this.state.endpoint}/get-user/${userId}`)
        })
        .then(user => {
          this.setState({ username: user.data, loaded: true })
        })
        .catch(err => {
          console.log(err)
        })
    }

    goToGame = (gameId) => {
      axios.put(`${this.state.endpoint}/add-guest`, { idGuest: localStorage.getItem('userId'), idGame: gameId })
        .then(guest => {
          // eslint-disable-next-line react/prop-types
          this.props.history.push({
            pathname: '/othello',
            search: `?id=${encodeURIComponent(gameId)}`
          })
        })
        .catch(err => {
          console.log(err)
        })
    }

    createGame = () => {
      const board = makeGameBoard()
      axios.post(`${this.state.endpoint}/add-game`, {
        gameBoard: board,
        userId: localStorage.getItem('userId')
      })
        .then(game => {
          this.props.history.push({
            pathname: '/othello',
            search: `?id=${encodeURIComponent(game.data)}`
          })
        }).catch(err => console.log(err))
    }

    render () {
      let gameList = null
      if (this.state.loaded) {
        gameList = (
          <section className="gameList">
            <h1>Liste des jeux en cours</h1>
            <p>Bienvenue {this.state.username}</p>
            <button onClick={this.createGame}>Créer une partie</button>
            {this.state.games.map((game, index) => (
              <GameListCard key={game._id} title={`Partie N°${index}`} creator={game.createdBy.username} clicked={() => this.goToGame(game._id)}/>
            ))}
          </section>
        )
      } else {
        gameList = <Spinner/>
      }
      return (
        <React.Fragment>
          {gameList}
        </React.Fragment>
      )
    }
}

export default GameList
