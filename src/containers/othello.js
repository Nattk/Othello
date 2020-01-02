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
           console.log('playableSquare')
           this.playableSquare()
        }    
    }

    foundPlayable = (line, col, direction, status) => {    
        let board = this.state.board         
        switch (direction) {
            case 'up':
             for(let i = line; i > this.state.min; i--){
                 if( board[i][col].status === "vide"){
                        board[i][col].jouable = true  
                        return board 
                 }
             }
                break 
            case 'upLeft':
                for(let i = line; i > this.state.min; i--){
                    for (let j = col; j > this.state.min; j--){  
                        if( board[i][j].status === "vide"){
                            board[i][j].jouable = true 
                            return board 
                        }
                    }
                }
                break;
            case 'upRight':
                for(let i = line; i > this.state.min; i--){
                    for (let j = col; j < this.state.max; j++){                     
                        if( board[i][j].status === "vide"){
                            board[i][j].jouable = true  
                            return board 
                        }
                    }
                }
                break;         
            case 'down':
                for(let i = line; i < this.state.max; i++){
                    if( board[i][col].status === "vide"){
                           board[i][col].jouable = true   
                           return board 
                        }
                }
                break;
            case 'downRight':
                for(let i = line; i < this.state.max; i++){
                    for (let j = col; j < this.state.max; j++){                     
                        if( board[i][j].status === "vide"){
                            board[i][j].jouable = true
                            return board 
                        }
                    }
                }
        
                break;
            case 'downLeft':
                for(let i = line; i < this.state.max; i++){
                    for (let j = col; j > this.state.min; j--){                     
                        if( board[i][j].status === "vide"  ){
                            board[i][j].jouable = true 
                            return board 
                        }
                    }
                }

                break;
            case 'left':
                for(let j = col; j > this.state.min; j--){
                    if( board[line][j].status === "vide"){
                           board[line][j].jouable = true 
                           return board 
     
                    }   
                }
                break;
            case 'right':
                for(let j = col; j < this.state.max; j++){
                    if( board[line][j].status === "vide"){
                           board[line][j].jouable = true
                           return board 

                    }
                }
                break;
            default:
            break;
        } 
    }

    parcoursCase = (line, col, direction) => {
        let board = this.state.board
        const caseStatus = board[line][col].status
        let i,j 
        switch (direction) {
            case 'up':
             i = line-1
            while(board[i][col] && caseStatus !== board[i][col].status && board[i][col].status !== 'vide'){
                if(this.state.player === 1){
                    board[i][col].status = 'green'
                }
                else if(this.state.player === 2){
                    board[i][col].status = 'red'
                }
                i--
            }
                break; 
            case 'upLeft':
                 i = line-1
                 j = col-1
                while(board[i][j] && caseStatus !== board[i][j].status && board[i][j].status !== 'vide'){
                    if(this.state.player === 1){
                        board[i][j].status = 'green'
                    }
                    else if(this.state.player === 2){
                        board[i][j].status = 'red'
                    }
                    i--
                    j--
                }
                break;
            case 'upRight':
                 i = line-1
                 j = col+1
                while(board[i][j] && caseStatus !== board[i][j].status && board[i][j].status !== 'vide'){
                    if(this.state.player === 1){
                        board[i][j].status = 'green'
                    }
                    else if(this.state.player === 2){
                        board[i][j].status = 'red'
                    }
                    i--
                    j++
                }
                break;         
            case 'down':
                 i = line+1
                while(board[i][col] && caseStatus !== board[i][col].status && board[i][col].status !== 'vide'){
                    if(this.state.player === 1){
                        board[i][col].status = 'green'
                    }
                    else if(this.state.player === 2){
                        board[i][col].status = 'red'
                    }
                    i++
                }
                break;
            case 'downRight':
                 i = line+1
                 j = col+1
                while( board[i][j] && caseStatus !== board[i][j].status && board[i][j].status !== 'vide'){
                    if(this.state.player === 1){
                        board[i][j].status = 'green'
                    }
                    else if(this.state.player === 2){
                        board[i][j].status = 'red'
                    }
                    i++
                    j++
                }
             break
            case 'downLeft':
                 i = line+1
                 j = col-1
                while(board[i][j] && caseStatus !== board[i][j].status && board[i][j].status !== 'vide'){
                    if(this.state.player === 1){
                        board[i][j].status = 'green'
                    }
                    else if(this.state.player === 2){
                        board[i][j].status = 'red'
                    }
                    i++
                    j--
                }
                break;
            case 'left':
                 j = col-1
                while(board[line][j] && caseStatus !== board[line][j].status && board[line][j].status !== 'vide'){
                    if(this.state.player === 1){
                        board[line][j].status = 'green'
                    }
                    else if(this.state.player === 2){
                        board[line][j].status = 'red'
                    }
                    j--
                }
                break;
            case 'right':
                 j = col+1
                while(board[line][j] && caseStatus !== board[line][j].status && board[line][j].status !== 'vide'){
                    if(this.state.player === 1){
                        board[line][j].status = 'green'
                    }
                    else if(this.state.player === 2){
                        board[line][j].status = 'red'
                    }
                    j++
                }
                break;
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
                this.parcoursCase(line, col, element)
            }

        }
        else if(this.state.player === 2 && jouable){
            board[line][col].status = 'red'
            this.setState({board : board})
            this.cleanBoard()
            for(const element of direction){
               this.parcoursCase(line, col, element)
            }
        }
        if(this.state.player === 1 ){
            this.setState({ player: 2 },()=> {
                this.playableSquare()
            });

        }

        if(this.state.player === 2 ){
            this.setState({ player: 1 },()=> {
                this.playableSquare()
            });

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
                            <div className={`squares ${square.status} ${square.jouable ? 'jouable' : ''} `} onClick={() => this.changeCase(indexLine, indexSquare, square.jouable)}>LAs</div> 
                        ))}
                    </div>
                ))}
                
            </div>
        )
    } 
}

export default Othello
