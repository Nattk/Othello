import React from 'react'
import './othello.scss'

class Othello extends React.Component {
    state = {
        board: this.makeArray(8,8),
        player:1,
        max:8,
        min:-1,
    }

    componentDidMount() {
        this.playableSquare()
    }

    componentDidUpdate(previousProps, previousState){
        if (previousState.board !== this.state.board) {
           this.playableSquare()
        }    
    }

    foundPlayable = (line, col, direction, status) => {    
        let board = this.state.board
        switch (direction) {
            case 'up':
            while(board[line][col] && board[line][col].status !== status ){
                if(board[line][col].status === "vide" ){
                    board[line][col].jouable = true
                    return board  
                }                   
                line--
            }
                break 
            case 'upLeft':
                while(board[line][col] && board[line][col].status !== status ){
                    if(board[line][col].status === "vide" ){
                        board[line][col].jouable = true
                        return board 
                    }
                    line--
                    col--
                }
                break;
            case 'upRight':
                while(board[line][col] && board[line][col].status !== status ){
                    if(board[line][col].status === "vide" ){
                        board[line][col].jouable = true
                        return board                     
                    }
                    line--
                    col++
                }
                break;         
            case 'down':
                while(board[line][col] && board[line][col].status !== status ){
                    if(board[line][col].status === "vide" ){
                        board[line][col].jouable = true
                        return board  
                    }                   
                    line++
                }
                break;
            case 'downRight':
                while(board[line][col] && board[line][col].status !== status ){
                    if(board[line][col].status === "vide" ){
                        board[line][col].jouable = true
                        return board                    
                    }
                    line++
                    col++
                }
                break;
            case 'downLeft':
                while(board[line][col] && board[line][col].status !== status ){
                    if(board[line][col].status === "vide" ){
                        board[line][col].jouable = true
                        return board                    
                }
                    line++
                    col--
                }
                break;
            case 'left':
                while(board[line][col] && board[line][col].status !== status ){
                    if(board[line][col].status === "vide" ){
                        board[line][col].jouable = true
                        return board  
                    }                   
                    col--
                }
                break;
            case 'right':
                while(board[line][col] && board[line][col].status !== status ){
                    if(board[line][col].status === "vide" ){
                        board[line][col].jouable = true
                        return board  
                    }                   
                    col++
                }
                break;
            default:
            break;
        } 
    }

    checkIfReturn = (line, col, direction) => {
        const board = this.state.board
        let i,j
        const status = board[line][col].status
        let shouldChange
        switch (direction) {
            case 'up':
                shouldChange = false
                i = line
                while(board[i][col] && board[i][col].status !== 'vide' ){
                    if(board[i][col].status !== status ){
                       return shouldChange = true
                    }
                    i--
                }
                return shouldChange
            case 'upLeft':
                shouldChange = false
                i = line
                j = col
                while(board[i][j] && board[i][j].status !== 'vide' ){
                    if(board[i][j].status !== status ){
                       return shouldChange = true
                    }
                    i--
                    j--
                }
                return shouldChange
            case 'upRight':
                shouldChange = false
                i = line
                j = col
                while(board[i][j] && board[i][j].status !== 'vide' ){
                    if(board[i][j].status !== status ){
                       return shouldChange = true
                    }
                    i--
                    j++
                }
                return shouldChange
            case 'down':
                shouldChange = false
                i = line
                while(board[i][col] && board[i][col].status !== 'vide' ){
                    if(board[i][col].status !== status ){
                       return shouldChange = true
                    }
                    i++
                }
                return shouldChange
            case 'downRight':
                shouldChange = false
                i = line
                j = col
                while(board[i][j] && board[i][j].status !== 'vide' ){
                    if(board[i][j].status !== status ){
                       return shouldChange = true
                    }
                    i++
                    j++
                }
                return shouldChange
            case 'downLeft':
                shouldChange = false
                i = line
                j = col
                while(board[i][j] && board[i][j].status !== 'vide' ){
                    if(board[i][j].status !== status ){
                       return shouldChange = true
                    }
                    i++
                    j--
                }
                return shouldChange
            case 'left':
                shouldChange = false
                j = col
                while(board[line][j].status !== 'vide' && board[line][j]){
                    if(board[line][j].status !== status ){
                       return shouldChange = true
                    }
                    j--
                }
                return shouldChange
            case 'right':
                shouldChange = false
                j = col
                while(board[line][j] && board[line][j].status !== 'vide' ){
                    if(board[line][j].status !== status ){
                       return shouldChange = true
                    }
                    j++
                }
                return shouldChange
            default:
            break;
        }     }

    parcoursCase = (line, col, direction) => {
        let board = this.state.board
        const caseStatus = board[line][col].status
        let i,j,shouldChange 
        switch (direction) {
            case 'up':
             i = line-1
             shouldChange = this.checkIfReturn(i,col,direction)
             while(board[i][col] && caseStatus !== board[i][col].status && board[i][col].status !== 'vide' && shouldChange){
                for(i; i<this.state.min; i++){
                }
                if(this.state.player === 1){
                    board[i][col].status = 'green'
                }
                else if(this.state.player === 2){
                    board[i][col].status = 'red'
                }
                i--
            }
                return board
            case 'upLeft':
                 i = line-1
                 j = col-1
                 shouldChange = this.checkIfReturn(i,j,direction)
                while(board[i][j] && caseStatus !== board[i][j].status && board[i][j].status !== 'vide' && shouldChange ){
                    if(this.state.player === 1){
                        board[i][j].status = 'green'
                    }
                    else if(this.state.player === 2){
                        board[i][j].status = 'red'
                    }
                    i--
                    j--
                }
                return board
            case 'upRight':
                 i = line-1
                 j = col+1
                 shouldChange = this.checkIfReturn(i,j,direction)
                while(board[i][j] && caseStatus !== board[i][j].status && board[i][j].status !== 'vide' && shouldChange){
                    if(this.state.player === 1){
                        board[i][j].status = 'green'
                    }
                    else if(this.state.player === 2){
                        board[i][j].status = 'red'
                    }
                    i--
                    j++
                }
                return board
            case 'down':
                 i = line+1
                 shouldChange = this.checkIfReturn(i,col,direction)
                while(board[i][col] && caseStatus !== board[i][col].status && board[i][col].status !== 'vide' && shouldChange){
                    if(this.state.player === 1){
                        board[i][col].status = 'green'
                    }
                    else if(this.state.player === 2){
                        board[i][col].status = 'red'
                    }
                    i++
                }
                return board
            case 'downRight':
                 i = line+1
                 j = col+1
                 shouldChange = this.checkIfReturn(i,j,direction)
                while( board[i][j] && caseStatus !== board[i][j].status && board[i][j].status !== 'vide' && shouldChange){
                    if(this.state.player === 1){
                        board[i][j].status = 'green'
                    }
                    else if(this.state.player === 2){
                        board[i][j].status = 'red'
                    }
                    i++
                    j++
                }
                return board
            case 'downLeft':
                 i = line+1
                 j = col-1
                 shouldChange = this.checkIfReturn(i,j,direction)
                while(board[i][j] && caseStatus !== board[i][j].status && board[i][j].status !== 'vide' && shouldChange){
                    if(this.state.player === 1){
                        board[i][j].status = 'green'
                    }
                    else if(this.state.player === 2){
                        board[i][j].status = 'red'
                    }
                    i++
                    j--
                }
                return board
            case 'left':
                 j = col-1
                 shouldChange = this.checkIfReturn(line,j,direction)
                while(board[line][j] && caseStatus !== board[line][j].status && board[line][j].status !== 'vide' && shouldChange){
                    if(this.state.player === 1){
                        board[line][j].status = 'green'
                    }
                    else if(this.state.player === 2){
                        board[line][j].status = 'red'
                    }
                    j--
                }
                return board
            case 'right':
                 j = col+1
                 shouldChange = this.checkIfReturn(line,j,direction)
                while(board[line][j] && caseStatus !== board[line][j].status && board[line][j].status !== 'vide' && shouldChange){
                    if(this.state.player === 1){
                        board[line][j].status = 'green'
                    }
                    else if(this.state.player === 2){
                        board[line][j].status = 'red'
                    }
                    j++
                }
                return board
            default:
            break;
        } 
    }

    makeArray(cols, rows){
        let arr = new Array(cols);
        for (let i = 0, length = arr.length; i<length; i++){
            arr[i] = new Array(rows)
            for (let j = 0, length = arr[i].length; j<length; j++){
                if(i === 3 && j === 3 || i === 4 &&  j === 4){
                    arr[i][j] = {status: 'red', jouable:false}
                }
                else if(i === 4 && j === 3 || i === 3 &&  j === 4){
                    arr[i][j] = {status: 'green', jouable:false}
                }
                else{
                    arr[i][j] = {status: 'vide', jouable:false}
                }
           }
        }
        return arr
    }

    getSquare = (board, line, col) => {
        return board[line][col]
    }

    changeCase = (line, col, jouable) => {
        let board = this.state.board
        const direction = ['up','down','downLeft','downRight','upRight','upLeft','right','left']
        if(this.state.player === 1 && jouable ) {
            board[line][col].status = 'green'
            this.setState({board : board})
            this.cleanBoard()
            for(const element of direction){
                this.setState({board : this.parcoursCase(line, col, element)},()=>{
                    this.setState({ player: 2 },()=> {
                        this.playableSquare()
                    });   
                })
            }

        }
        else if(this.state.player === 2 && jouable){
            board[line][col].status = 'red'
            this.setState({board : board})
            this.cleanBoard()
            for(const element of direction){
                this.setState({board : this.parcoursCase(line, col, element)},()=>{
                    this.setState({ player: 1 },()=> {
                        this.playableSquare()
                    });                
                })
            }
        }
    }

    cleanBoard = () => {
     let board = this.state.board
     for (let i = 0, length = board.length; i<length; i++){
        for (let j = 0, length = board[i].length; j<length; j++){
            if(board[i][j].jouable === true){
                board[i][j].jouable = false
            }
        }
     }
     this.setState({ board: board })
    }

    adjacentCase = (line, col) =>{
       const board = this.state.board
        return {
            up:     ['up' ,this.getSquare(board, line-1, col), line-1, col ],
            upRight:  ['upRight' ,this.getSquare(board, line-1, col+1), line-1, col+1],
            right:     ['right' ,this.getSquare(board, line,  col+1), line,  col+1 ],
            downRight: ['downRight', this.getSquare(board, line+1, col+1), line+1, col+1],
            down:      ['down' ,this.getSquare(board, line+1, col), line+1, col],
            downLeft:  ['downLeft' ,this.getSquare(board, line+1, col-1), line+1, col-1],
            left:     ['left' ,this.getSquare(board, line,   col-1), line,   col-1],
            upLeft:    ['upLeft' ,this.getSquare(board, line-1, col-1), line-1, col-1]
        }
    }

    playableSquare = () =>{
        let board = this.state.board
        const squaresObj = []
            for (let i = 0, length = board.length; i<length; i++){
                for (let j = 0, length = board[i].length; j<length; j++){
                    if(this.state.player === 2 && board[i][j].status === 'red'){
                        squaresObj.push({status:board[i][j].status, line: i, col:j})
                    }
                    else if(this.state.player === 1 && board[i][j].status === 'green'){
                        squaresObj.push({status:board[i][j].status, line: i, col:j})
                    }
                }
    }
    squaresObj.forEach( element => {
        for (let [pos , value, line, col] of Object.values(this.adjacentCase(element.line, element.col))) {
            if(element.status !== value.status && value.status !== 'vide'){
                console.log(element)
                board = this.foundPlayable(line, col, pos, element.status)
            }
          }
    } )

    this.setState({board: board})    
}
    render(){
        return(
            <div>
                {this.state.board.map( (lines, indexLine) => (
                    <div className="lines">
                        {lines.map( (square, indexSquare) => (
    <div className={`squares ${square.status} ${square.jouable ? 'jouable' : ''} `} onClick={() => this.changeCase(indexLine, indexSquare, square.jouable)}>{indexLine} {indexSquare}</div> 
                        ))}
                    </div>
                ))}
            </div>
        )
    } 
}

export default Othello
