class SudokuSolver {
  constructor() {
    this.conflict = [];
  }

  resetConflict(){
    this.conflict = [];
  }

  validate(puzzleString) {
    const pattern = /^[1-9.]+$/;
    if (puzzleString.length !== 81) {
      throw new Error('Expected puzzle to be 81 characters long');
    }

    if (!pattern.test(puzzleString)) {
      throw new Error('Invalid characters in puzzle');
    }
    return true;
  }

  letterToNum(input) {
    const letterMap = {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9
    };
    return letterMap[input] || null;
  }

  splitCoords(input) {
    const row = input[0].toUpperCase();
    let rowNum = this.letterToNum(row);
    const column = parseInt(input.slice(1), 10);
    return { rowNum, column };
  }

  getIndex(row, col) {
    return (row - 1) * 9 + (col - 1);
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const rowStartIdx = this.getIndex(row, 1);
    const rowValues = puzzleString.slice(rowStartIdx, rowStartIdx + 9);

    if (rowValues.includes(value.toString())) {
      this.conflict.push('row');
      return false;
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let r = 1; r <= 9; r++) {
      const index = this.getIndex(r, column);
      if (puzzleString[index] === value.toString()) {
        this.conflict.push('column');
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const regionRowStart = Math.floor((row - 1) / 3) * 3;
    const regionColStart = Math.floor((column - 1) / 3) * 3;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const index = this.getIndex(regionRowStart + r + 1, regionColStart + c + 1);
        if (puzzleString[index] === value.toString()) {
          this.conflict.push('region');
          return false;
        }
      }
    }
    return true;
  }

  isValidPlacement(puzzleString, row, column, value) {
    this.resetConflict();
    let valid = true;

    if (!this.checkRowPlacement(puzzleString, row, column, value)) valid = false;
    if (!this.checkColPlacement(puzzleString, row, column, value)) valid = false;
    if (!this.checkRegionPlacement(puzzleString, row, column, value)) valid = false;

    return valid;
  }

  solve(puzzleString) {
    let puzzleArray = puzzleString.split("");

    const backtrack = () => {
      const emptyIdx = puzzleArray.indexOf(".");
      if (emptyIdx === -1) return true;

      const row = Math.floor(emptyIdx / 9) + 1;
      const col = (emptyIdx % 9) + 1;

      for (let n = 1; n <= 9; n++) {
        if (this.isValidPlacement(puzzleArray.join(""), row, col, n)) {
          puzzleArray[emptyIdx] = n.toString();

          if (backtrack()) return true;

          puzzleArray[emptyIdx] = ".";
        }
      }
      return false;
    };

    if (backtrack()) {
      return puzzleArray.join("");
    } else {
      throw new Error("Puzzle cannot be solved");
    }
  }
}

module.exports = SudokuSolver;
