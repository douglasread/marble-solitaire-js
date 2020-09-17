class MarbleSolitaireController {
  lastClickCell = null;
  constructor(m, v) {
    v.renderBoard(m.getBoard(), "");
    v.setMessage("Click to select starting empty slot");
    v.addCellClickListener(function (row, col) {
      if(this.lastClickCell) {
        if (!(this.lastClickCell.r === row && this.lastClickCell.c === col)) {
          try {
            m.move(this.lastClickCell.r, this.lastClickCell.c, row, col);
            v.renderBoard(m.getBoard(), m.getScore());
            v.setMessage("");
            if(m.isGameOver()) {
              v.setMessage("Game Over!");
            }
          } catch(err) {
            v.setMessage(err);
          }
        }
        var unhighlightR = this.lastClickCell.r;
        var unhighlightC = this.lastClickCell.c;
        this.lastClickCell = null;
        v.highlightCell(unhighlightR, unhighlightC, "white");
      } else if (!m.hasEmpty) {
        m.setStartingEmpty(row, col);
        v.renderBoard(m.getBoard(), m.getScore());
        v.setMessage("");
        this.lastClickCell = null;
      } else if(m.getBoard()[row][col] === Slot.MARBLE) {
        this.lastClickCell = {r: row, c: col};
        v.highlightCell(row, col, "pink");
      }
    }.bind(this));
  }
}