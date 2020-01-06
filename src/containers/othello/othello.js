import React from 'react'
import './othello.scss'
import black from '../../assets/images/pieceBlack.png'
import white from '../../assets/images/pieceWhite.png'
import Spinner from '../../components/ui/spinner'
import socketIOClient from 'socket.io-client'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const CancelToken = axios.CancelToken
let cancelRequest

class Othello extends React.Component {
    state = {
      board: '',
      gameId: '',
      endpoint: 'http://localhost:4001',
      player: 1,
      max: 8,
      min: -1,
      player1: '',
      player2: '',
      creator: '',
      guest: '',
      opponentConnected: false,
      loaded: false,
      endgame: false,
      canPlay: true
    }

    pass = () => {
      if (this.state.player === 1) {
        this.setState({ player: 2 }, () => {
          axios.put(`${this.state.endpoint}/pass-game`, {
            id: this.state.gameId,
            isPlaying: this.state.player.toString()
          })
        })
      } else {
        this.setState({ player: 1 }, () => {
          axios.put(`${this.state.endpoint}/pass-game`, {
            id: this.state.gameId,
            isPlaying: this.state.player.toString()
          })
        })
      }
    }

    componentDidMount () {
      const gameId = this.props.location.search.substring(4)
      this.setState({ gameId: gameId })
      axios.get(`${this.state.endpoint}/get-game/${gameId}`)
        .then(game => {
          this.setState({ board: game.data.gameBoard, loaded: true, player: parseInt(game.data.isPlaying), creator: game.data.createdBy }, () => {
            this.playableSquare()
            this.score()
            const socket = socketIOClient(`${this.state.endpoint}/${gameId}`)
            socket.on('updateGame', (data) => {
              this.setState({ board: data.gameBoard })
              this.setState({ player: parseInt(data.isPlaying) })
              this.score()
            })
          })
        }).catch(err => console.log(err))
    }

    componentDidUpdate (previousProps, previousState) {
      if (previousState.board !== this.state.board) {
        console.log('change')
      }
    }

    endGame = () => {
      const board = this.state.board
      const squares = []
      for (let i = 0, length = board.length; i < length; i++) {
        for (let j = 0, length = board[i].length; j < length; j++) {
          if (board[i][j].status === 'vide') {
            squares.push(board[i][j])
          }
        }
      }
      if (!squares.length) {
        this.setState({ engame: true })
      }
    }

    canPlay = () => {
      const board = this.state.board
      const squares = []
      for (let i = 0, length = board.length; i < length; i++) {
        for (let j = 0, length = board[i].length; j < length; j++) {
          if (board[i][j].jouable) {
            squares.push(board[i][j])
          }
        }
      }
      if (!squares.length && this.state.engame === false) {
        this.setState({ canPlay: false })
      } else {
        this.setState({ canPlay: true })
      }
    }

    score = () => {
      const board = this.state.board
      let white = 0; let black = 0
      for (let i = 0, length = board.length; i < length; i++) {
        for (let j = 0, length = board[i].length; j < length; j++) {
          if (board[i][j].status === 'white') {
            white = white + 1
          } else if (board[i][j].status === 'black') {
            black = black + 1
          }
        }
      }
      this.setState({ player1: white })
      this.setState({ player2: black })
    }

    // found playable case in function of the adjacent case
    foundPlayable = (line, col, direction, status) => {
      const board = this.state.board
      switch (direction) {
        case 'up':
          while (line > this.state.min && board[line][col].status !== status) {
            if (board[line][col].status === 'vide') {
              board[line][col].jouable = true
              return board
            }
            line--
          }
          break
        case 'upLeft':
          while (line > this.state.min && col > this.state.min && board[line][col].status !== status) {
            if (board[line][col].status === 'vide') {
              board[line][col].jouable = true
              return board
            }
            line--
            col--
          }
          break
        case 'upRight':
          while (line > this.state.min && col < this.state.max && board[line][col] && board[line][col].status !== status) {
            if (board[line][col].status === 'vide') {
              board[line][col].jouable = true
              return board
            }
            line--
            col++
          }
          break
        case 'down':
          while (line < this.state.max && board[line][col] && board[line][col].status !== status) {
            if (board[line][col].status === 'vide') {
              board[line][col].jouable = true
              return board
            }
            line++
          }
          break
        case 'downRight':
          while (line < this.state.max && col < this.state.max && board[line][col].status !== status) {
            if (board[line][col].status === 'vide') {
              board[line][col].jouable = true
              return board
            }
            line++
            col++
          }
          break
        case 'downLeft':
          while (line < this.state.max && col > this.state.min && board[line][col].status !== status) {
            if (board[line][col].status === 'vide') {
              board[line][col].jouable = true
              return board
            }
            line++
            col--
          }
          break
        case 'left':
          while (col > this.state.min && board[line][col].status !== status) {
            if (board[line][col].status === 'vide') {
              board[line][col].jouable = true
              return board
            }
            col--
          }
          break
        case 'right':
          while (col < this.state.max && board[line][col].status !== status) {
            if (board[line][col].status === 'vide') {
              board[line][col].jouable = true
              return board
            }
            col++
          }
          break
        default:
          return board
      }
      return board
    }

    // Check if a piece should change
    // return True or False
    checkIfReturn = (line, col, direction) => {
      const board = this.state.board
      let shouldChange = false
      if (this.state.max > line && line > this.state.min && this.state.max > col && col > this.state.min) {
        const status = board[line][col].status
        switch (direction) {
          case 'up':
            shouldChange = false
            while (line > this.state.min && board[line][col].status !== 'vide') {
              if (board[line][col].status !== status) {
                shouldChange = true
                return shouldChange
              }
              line--
            }
            return shouldChange
          case 'upLeft':
            shouldChange = false
            while (line > this.state.min && col > this.state.min && board[line][col].status !== 'vide') {
              if (board[line][col].status !== status) {
                shouldChange = true
                return shouldChange
              }
              line--
              col--
            }
            return shouldChange
          case 'upRight':
            shouldChange = false
            while (line > this.state.min && col < this.state.max && board[line][col].status !== 'vide') {
              if (board[line][col].status !== status) {
                shouldChange = true
                return shouldChange
              }
              line--
              col++
            }
            return shouldChange
          case 'down':
            shouldChange = false
            while (line < this.state.max && board[line][col] && board[line][col].status !== 'vide') {
              if (board[line][col].status !== status) {
                shouldChange = true
                return shouldChange
              }
              line++
            }
            return shouldChange
          case 'downRight':
            shouldChange = false
            while (line < this.state.max && col < this.state.max && board[line][col].status !== 'vide') {
              if (board[line][col].status !== status) {
                shouldChange = true
                return shouldChange
              }
              line++
              col++
            }
            return shouldChange
          case 'downLeft':
            shouldChange = false
            while (line < this.state.max && col > this.state.min && board[line][col].status !== 'vide') {
              if (board[line][col].status !== status) {
                shouldChange = true
                return shouldChange
              }
              line++
              col--
            }
            return shouldChange
          case 'left':
            shouldChange = false
            while (col > this.state.min && board[line][col].status !== 'vide') {
              if (board[line][col].status !== status) {
                shouldChange = true
                return shouldChange
              }
              col--
            }
            return shouldChange
          case 'right':
            shouldChange = false
            while (col < this.state.max && board[line][col].status !== 'vide') {
              if (board[line][col].status !== status) {
                shouldChange = true
                return shouldChange
              }
              col++
            }
            return shouldChange
          default:
            break
        }
      }
      return shouldChange
    }

    // In a given direction , Change the pieces status
    parcoursCase = (line, col, direction) => {
      const board = this.state.board
      const caseStatus = board[line][col].status
      let i, j, shouldChange

      switch (direction) {
        case 'up':
          i = line - 1
          shouldChange = this.checkIfReturn(i, col, direction)
          while (shouldChange && board[i][col] && caseStatus !== board[i][col].status && board[i][col].status !== 'vide') {
            for (i; i < this.state.min; i++) {
            }
            if (this.state.player === 1) {
              board[i][col].status = 'white'
            } else if (this.state.player === 2) {
              board[i][col].status = 'black'
            }
            i--
          }
          return board
        case 'upLeft':
          i = line - 1
          j = col - 1
          shouldChange = this.checkIfReturn(i, j, direction)
          while (shouldChange && board[i][j] && caseStatus !== board[i][j].status && board[i][j].status !== 'vide') {
            if (this.state.player === 1) {
              board[i][j].status = 'white'
            } else if (this.state.player === 2) {
              board[i][j].status = 'black'
            }
            i--
            j--
          }
          return board
        case 'upRight':
          i = line - 1
          j = col + 1
          shouldChange = this.checkIfReturn(i, j, direction)
          while (shouldChange && board[i][j] && caseStatus !== board[i][j].status && board[i][j].status !== 'vide') {
            if (this.state.player === 1) {
              board[i][j].status = 'white'
            } else if (this.state.player === 2) {
              board[i][j].status = 'black'
            }
            i--
            j++
          }
          return board
        case 'down':
          i = line + 1
          shouldChange = this.checkIfReturn(i, col, direction)
          while (shouldChange && board[i][col] && caseStatus !== board[i][col].status && board[i][col].status !== 'vide') {
            if (this.state.player === 1) {
              board[i][col].status = 'white'
            } else if (this.state.player === 2) {
              board[i][col].status = 'black'
            }
            i++
          }
          return board
        case 'downRight':
          i = line + 1
          j = col + 1
          shouldChange = this.checkIfReturn(i, j, direction)
          while (shouldChange && board[i][j] && caseStatus !== board[i][j].status && board[i][j].status !== 'vide') {
            if (this.state.player === 1) {
              board[i][j].status = 'white'
            } else if (this.state.player === 2) {
              board[i][j].status = 'black'
            }
            i++
            j++
          }
          return board
        case 'downLeft':
          i = line + 1
          j = col - 1
          shouldChange = this.checkIfReturn(i, j, direction)
          while (shouldChange && board[i][j] && caseStatus !== board[i][j].status && board[i][j].status !== 'vide') {
            if (this.state.player === 1) {
              board[i][j].status = 'white'
            } else if (this.state.player === 2) {
              board[i][j].status = 'black'
            }
            i++
            j--
          }
          return board
        case 'left':
          j = col - 1
          shouldChange = this.checkIfReturn(line, j, direction)
          while (shouldChange && board[line][j] && caseStatus !== board[line][j].status && board[line][j].status !== 'vide') {
            if (this.state.player === 1) {
              board[line][j].status = 'white'
            } else if (this.state.player === 2) {
              board[line][j].status = 'black'
            }
            j--
          }
          return board
        case 'right':
          j = col + 1
          shouldChange = this.checkIfReturn(line, j, direction)
          while (shouldChange && board[line][j] && caseStatus !== board[line][j].status && board[line][j].status !== 'vide') {
            if (this.state.player === 1) {
              board[line][j].status = 'white'
            } else if (this.state.player === 2) {
              board[line][j].status = 'black'
            }
            j++
          }
          return board
        default:
          break
      }
    }

    getSquare = (board, line, col) => {
      if (this.state.max > line && line > this.state.min && this.state.max > col && col > this.state.min) {
        return board[line][col]
      }
      return false
    }

    // Click On the board function
    changeCase = (line, col, jouable) => {
      const board = this.state.board
      const direction = ['up', 'down', 'downLeft', 'downRight', 'upRight', 'upLeft', 'right', 'left']
      if (this.state.player === 1 && jouable) {
        board[line][col].status = 'white'
        this.setState({ board: board })
        this.cleanBoard()
        for (const element of direction) {
          // eslint-disable-next-line no-loop-func
          this.setState({ board: this.parcoursCase(line, col, element) }, () => {
            this.setState({ player: 2 }, () => {
              this.playableSquare()
              this.score()
              this.endGame()
              if (cancelRequest !== undefined) {
                cancelRequest()
              }
              axios.put(`${this.state.endpoint}/update-game`, {
                id: this.state.gameId,
                gameBoard: this.state.board,
                isPlaying: this.state.player.toString()
              },
              {
                cancelToken: new CancelToken(function executor (c) {
                  cancelRequest = c
                })
              }).then(() => {
              }).catch((error) => {
                if (axios.isCancel(error)) {
                  console.log('post Request canceled')
                }
              })
            })
          })
        }
      } else if (this.state.player === 2 && jouable) {
        board[line][col].status = 'black'
        this.setState({ board: board }, () => {
        })
        this.cleanBoard()
        for (const element of direction) {
          // eslint-disable-next-line no-loop-func
          this.setState({ board: this.parcoursCase(line, col, element) }, () => {
            this.setState({ player: 1 }, () => {
              this.playableSquare()
              this.score()
              this.endGame()
              if (cancelRequest !== undefined) {
                cancelRequest()
              }
              axios.put(`${this.state.endpoint}/update-game`, {
                id: this.state.gameId,
                gameBoard: this.state.board,
                isPlaying: this.state.player.toString()
              },
              {
                cancelToken: new CancelToken(function executor (c) {
                  cancelRequest = c
                })
              }).then((response) => {
              }).catch((error) => {
                if (axios.isCancel(error)) {
                  console.log('post Request canceled')
                }
              })
            })
          })
        }
      }
    }

    // Clean all the playable case before the re-call of the playabaleCase function
    cleanBoard = () => {
      const board = this.state.board
      for (let i = 0, length = board.length; i < length; i++) {
        for (let j = 0, length = board[i].length; j < length; j++) {
          if (board[i][j].jouable === true) {
            board[i][j].jouable = false
          }
        }
      }
      this.setState({ board: board })
    }

    changePlayer = () => {
      if (this.state.player === 1) {
        this.setState({ player: 2 }, () => {
          this.playableSquare()
        })
      } else {
        this.setState({ player: 1 }, () => {
          this.playableSquare()
        })
      }
    }

    // Get all adjacent case of a given case
    adjacentCase = (line, col) => {
      const board = this.state.board
      return {
        up: ['up', this.getSquare(board, line - 1, col), line - 1, col],
        upRight: ['upRight', this.getSquare(board, line - 1, col + 1), line - 1, col + 1],
        right: ['right', this.getSquare(board, line, col + 1), line, col + 1],
        downRight: ['downRight', this.getSquare(board, line + 1, col + 1), line + 1, col + 1],
        down: ['down', this.getSquare(board, line + 1, col), line + 1, col],
        downLeft: ['downLeft', this.getSquare(board, line + 1, col - 1), line + 1, col - 1],
        left: ['left', this.getSquare(board, line, col - 1), line, col - 1],
        upLeft: ['upLeft', this.getSquare(board, line - 1, col - 1), line - 1, col - 1]
      }
    }

    // Get all case with pieces by status in function of the one playing
    // Search for the playable case on the board and update the board
    playableSquare = () => {
      let board = [...this.state.board]
      const squaresObj = []
      for (let i = 0, length = board.length; i < length; i++) {
        for (let j = 0, length = board[i].length; j < length; j++) {
          if (this.state.player === 2 && board[i][j].status === 'black') {
            squaresObj.push({ status: board[i][j].status, line: i, col: j })
          } else if (this.state.player === 1 && board[i][j].status === 'white') {
            squaresObj.push({ status: board[i][j].status, line: i, col: j })
          }
        }
      }
      squaresObj.forEach(element => {
        for (const [pos, value, line, col] of Object.values(this.adjacentCase(element.line, element.col))) {
          if (value && element.status !== value.status && value.status !== 'vide') {
            board = this.foundPlayable(line, col, pos, element.status)
          }
        }
      })
      this.setState({ board: board }, () => {
        this.canPlay()
      })
    }

    render () {
      let othello = null
      if (this.state.loaded) {
        othello = (
          <section className="othello">
            <h1>Othello MultiJoueur</h1>
            <div className="game">
              <section className="board">
                <h2>Jeux</h2>
                {this.state.board.map((lines, indexLine) => (
                  <div key={indexLine} className="lines">
                    {lines.map((square, indexSquare) => (
                      <div key={`${indexLine}${indexSquare}`} className={`squares ${square.status} ${square.jouable ? 'jouable' : ''} `} onClick={() => this.changeCase(indexLine, indexSquare, square.jouable)}></div>
                    ))}
                  </div>
                ))}
              </section>
              <aside>
                <p>{this.state.engame && 'game over'}</p>
                <p>{this.state.creator.username}:{this.state.player1} {this.state.player === 1 && <img src={black} alt=""/>}</p>
                <p onClick={this.pass}>Passer le tour</p>
                <p>Joueur 2 :{this.state.player2} {this.state.player === 2 && <img src={white} alt=""/>}</p>
              </aside>
            </div>
          </section>

        )
      } else {
        othello = <Spinner/>
      }
      return (
        <React.Fragment>
          {othello}
        </React.Fragment>
      )
    }
}

export default withRouter(Othello)
