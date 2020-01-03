import React from 'react'
import './othello.scss'
import black from '../assets/images/pieceBlack.png'
import white from '../assets/images/pieceWhite.png'

class Othello extends React.Component {
    state = {
      board: this.makeArray(8, 8),
      player: 1,
      max: 8,
      min: -1,
      player1: '',
      player2: '',
      canPlay: true
    }

    componentDidMount () {
      this.playableSquare()
      this.score()
    }

    componentDidUpdate (previousProps, previousState) {
      if (previousState.board !== this.state.board) {
        this.playableSquare()
        this.score()
      }
    }

    endGame = () => {
      // EndGame Function
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
      if (!squares.length) {
        this.setState({ canPlay: false })
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

    makeArray (cols, rows) {
      const arr = new Array(cols)
      for (let i = 0, length = arr.length; i < length; i++) {
        arr[i] = new Array(rows)
        for (let j = 0, length = arr[i].length; j < length; j++) {
          if (i === 3 && j === 3 || i === 4 && j === 4) {
            arr[i][j] = { status: 'black', jouable: false }
          } else if (i === 4 && j === 3 || i === 3 && j === 4) {
            arr[i][j] = { status: 'white', jouable: false }
          } else {
            arr[i][j] = { status: 'vide', jouable: false }
          }
        }
      }
      return arr
    }

    getSquare = (board, line, col) => {
      if (this.state.max > line && line > this.state.min && this.state.max > col && col > this.state.min) {
        return board[line][col]
      }
      return false
    }

    changeCase = (line, col, jouable) => {
      const board = this.state.board
      const direction = ['up', 'down', 'downLeft', 'downRight', 'upRight', 'upLeft', 'right', 'left']
      if (this.state.player === 1 && jouable) {
        board[line][col].status = 'white'
        this.setState({ board: board })
        this.cleanBoard()
        for (const element of direction) {
          this.setState({ board: this.parcoursCase(line, col, element) }, () => {
            this.setState({ player: 2 }, () => {
              this.playableSquare()
              this.score()
            })
          })
        }
      } else if (this.state.player === 2 && jouable) {
        board[line][col].status = 'black'
        this.setState({ board: board }, () => {
        })
        this.cleanBoard()
        for (const element of direction) {
          this.setState({ board: this.parcoursCase(line, col, element) }, () => {
            this.setState({ player: 1 }, () => {
              this.playableSquare()
              this.score()
            })
          })
        }
      }
    }

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
        this.setState({ player: 2 })
      } else {
        this.setState({ player: 1 })
      }
    }

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

    playableSquare = () => {
      let board = this.state.board
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
      return (
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
              <p>Joueur 1 :{this.state.player1} {this.state.player === 1 && <img src={black} alt=""/>}</p>
              {this.state.canPlay === false &&
                <p onClick={this.changePlayer}>Passer le tour</p>
              }
              <p>Joueur 2 :{this.state.player2} {this.state.player === 2 && <img src={white} alt=""/>}</p>
            </aside>
          </div>
        </section>
      )
    }
}

export default Othello
