class SudokuSolver {

  validate(puzzleString) {
    const pattern = /^[1-9.]+$/;
      if(puzzleString.length !== 81){
        throw new Error('Expected puzzle to be 81 characters long')
      }

       if(!pattern.test(puzzleString)) {
        throw new Error('Invalid characters in puzzle')
       }
    return(true)
  }

  splitIntoChunks(puzzleString){
    return puzzleString.match(/.{1,9}/g)
  }

  splitCoords(input){
    const row = input[0].toUpperCase();
    const column = parseInt(input.slice(1), 10,10)

    return { row , column }
  }

  letterToNumber(letter){

  }

  checkRowPlacement(puzzleString, row, column, value) {

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

