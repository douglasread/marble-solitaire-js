
class MarbleSolitaireView {

  constructor(dim) {
    if (dim <=0) throw "Board side dimension must be positive";
    this.boardSize = dim;
    var tmpHtml = '';
    for (var r = 0; r < dim; r++) {
      tmpHtml += '<tr id="'+r+'">';
      for (var c = 0; c < dim; c++) {
        tmpHtml += '<td id="'+r+'-'+c+'"></td>';
      }
      tmpHtml += '</tr>'
    }
    var boardDisplay = document.querySelector("#board");
    boardDisplay.innerHTML = tmpHtml;
    var scoreDisplay = document.querySelector("#score-disp");
    scoreDisplay.style.display = "inline";
  }

  slotToString(slot) {
    var prop = {
      1: "background-color:#4b5bb3;box-shadow: inset -5px -5px 5px rgba(0,0,0,.5);",
      2: "background-color:white;box-shadow: inset 4px 4px 5px rgba(0,0,0,.5);"
    }
    var slotTpl = '<div class="circle" style="%%%"/>';

    return slotTpl.replace(/%%%/, prop[slot]);
  }

  renderBoard(board, score) {
    var boardDisplay  = document.querySelector("#board");
    if(board.length !== this.boardSize) {
      throw "Invalid board dimension: " + board.length;
    }
    for (var r = 0; r < board.length; r++) {
      if(board[r].length !== this.boardSize) {
        throw "Invalid board dimension: " + board[r].length;
      }
      var row = boardDisplay.tBodies[0].rows[r];
      for (var c = 0; c < board[r].length; c++) {
        row.cells[c].innerHTML = this.slotToString(board[r][c]);
      }
    }
    var scoreDisplay = document.querySelector("#score");
    scoreDisplay.innerHTML =  score;
  }

  setMessage(msg) {
    var messageDisplay = document.querySelector("#msg");
    messageDisplay.innerHTML = msg;
  }

  highlightCell(r, c, color) {
    if (r < 0 || r >= this.boardSize || c < 0 || c >= this.boardSize) {
      throw "Invalid cell position: " + r + "," + c;
    }
    $('#'+r+'-'+c).css('background-color', color);
    var cell = document.querySelector(''+r+'-'+c);
    cell.style.backgroundColor = color;
  }

  addCellClickListener(func) {
    $('td').click(function(evt) {
      var cell = $(evt.target).attr('id') || $(evt.target).parent('td').attr('id');
      var [row, col] = cell.split('-');
      func(+row, +col);
    })
  }
}