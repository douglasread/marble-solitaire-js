// represents values of slots on a gameboard and possible states
var Slot = {
  MARBLE: 1,
  EMPTY: 2,
  INVALID: 3,
};

// English Style Model
class MarbleSolitaireModel {
  constructor(armLength) {
    if (!armLength) {
      armLength = 3;
    } else if (armLength < 3 || armLength % 2 !== 1) {
      // must be odd and greater than 3
      throw "Invalid arm length";
    }
    var boardSize = 3 * armLength - 2;
    this.score = 0;

    this.board = [];
    for (var r = 0; r < boardSize; r++) {
      this.board[r] = Array(boardSize).fill(Slot.INVALID);
      for (var c = 0; c < boardSize; c++) {
        if (c >= armLength - 1 && c < armLength * 2 - 1
            || r >= armLength - 1 && r < armLength * 2 - 1) {
          this.board[r][c] = Slot.MARBLE;
          this.score++;
        }
      }
    }
    this.hasEmpty = false;
  }

  setStartingEmpty(row, column) {
    if (this.hasEmpty) {
      throw "Cannot set  starting empty when the game has started";
    }

    if (row === undefined && column === undefined) {
      let middle = Math.floor(this.board.length / 2);
      row = middle;
      column = middle;
    } else if (row < 0 || column < 0
        || row > this.board.length || column > this.board.length
        || this.board[row][column] === Slot.INVALID) {
      throw "Illegal starting space."
    }
    this.board[row][column] = Slot.EMPTY;
    this.score--;
    this.hasEmpty = true;
  }

  getBoard() {
    return this.board;
  }

  getScore() {
    return this.score;
  }

  getSize() {
    return this.board.length;
  }

  isGameOver() {
    if (!this.hasEmpty) {
      return false;
    }
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board.length; j++) {
        if (this._checkMove(i, j, i + 2, j) === 'VALID'
            || this._checkMove(i, j, i, j + 2) === 'VALID'
            || this._checkMove(i, j, i - 2, j) === 'VALID'
            || this._checkMove(i, j, i, j - 2) === 'VALID') {
          return false;
        }
      }
    }
    return true;
  }

  // return "VALID" if valid, message otherwise
  _checkMove(r0, c0, r1, c1) {

    if (!(this._isInBounds(r0) && this._isInBounds(r1) && this._isInBounds(c0)
        && this._isInBounds(c1))) {
      return "Out of bounds";
    }
    if (this.board[r0][c0] !== Slot.MARBLE) {
      return "Start piece must be a marble";
    }
    if (this.board[r1][c1] !== Slot.EMPTY) {
      return "Must move to an empty space";
    }

    let jumpedRow;
    let jumpedCol;
    if ((r0 - r1 === 0) && (Math.abs(c0 - c1) === 2)) {
      jumpedRow = r0;
      jumpedCol = (c0 + c1) / 2;
    } else if ((c0 - c1 === 0) && (Math.abs(r0 - r1) === 2)) {
      jumpedCol = c0;
      jumpedRow = (r0 + r1) / 2;
    } else {
      return "A piece must be moved only 2 spaces horizontally or vertically.";
    }

    if (this.board[jumpedRow][jumpedCol] !== Slot.MARBLE) {
      return "Must jump a marble.";
    }
    return "VALID";
  }

  _isInBounds(val) {
    return val < this.board.length && val >= 0;
  }

  move(r0, c0, r1, c1) {
    let status = this._checkMove(r0, c0, r1, c1);
    if (status === "VALID") {
      let rowMove = r1 - r0;
      let colMove = c1 - c0;
      this.board[r0][c0] = Slot.EMPTY;
      this.board[r1][c1] = Slot.MARBLE;
      this.board[r0 + rowMove / 2][c0 + colMove / 2] = Slot.EMPTY;
      this.score--;
    } else {
      throw status;
    }
  }
}


