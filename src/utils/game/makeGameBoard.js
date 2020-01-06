// Create  and return the Initial GameBoard

function makeGameBoard () {
  const arr = new Array(8)
  for (let i = 0, length = arr.length; i < length; i++) {
    arr[i] = new Array(8)
    for (let j = 0, length = arr[i].length; j < length; j++) {
      if ((i === 3 && j === 3) || (i === 4 && j === 4)) {
        arr[i][j] = { status: 'black', jouable: false }
      } else if ((i === 4 && j === 3) || (i === 3 && j === 4)) {
        arr[i][j] = { status: 'white', jouable: false }
      } else {
        arr[i][j] = { status: 'vide', jouable: false }
      }
    }
  }
  arr[3][2] = { status: 'vide', jouable: true }
  arr[2][3] = { status: 'vide', jouable: true }
  arr[4][5] = { status: 'vide', jouable: true }
  arr[5][4] = { status: 'vide', jouable: true }
  return arr
}

export default makeGameBoard
