class Board {
  constructor(stage) {
    this.board;
    this.stage = stage;
    this.createBoard();
  }

  getRowNumberEachStage(row) {
    let rowNumber = 0;

    if (this.stage === 1) {
      if (row === 'top') {
        rowNumber = 1;
      } else if (row === 'middle') {
        rowNumber = 2;
      } else {
        rowNumber = 3;
      }
    } else if (this.stage === 2) {
      rowNumber = 4;
    } else if(this.stage === 3){
      rowNumber = 5;
    } else if(this.stage === 4){
      rowNumber = 6;
    }
    return rowNumber;
  }

  getColumnNumberEachStage(column) {
    let columnNumber = 0;

    if (column === 'left') {
      columnNumber = 1;
    } else if (column === 'center') {
      columnNumber = 2;
    } else {
      columnNumber = 3;
    }

    return columnNumber
  }

  put(player, row, column) {
    let playerNumber = (player === 'player1') ? 1 : 2;
    let rowNumber = this.getRowNumberEachStage(row);
    let columnNumber = this.getColumnNumberEachStage(column);

    if (!this.isPut(rowNumber, columnNumber)) {
      return false;
    };

    this.board[rowNumber][columnNumber] = playerNumber;
    return true;
  }

  isPut(rowNumber, columnNumber) {
    return (this.board[rowNumber][columnNumber] !== 0) ? false : true;
  }

  is3Line(row, column) {
    let rowNumber = this.getRowNumberEachStage(row);
    let columnNumber = this.getColumnNumberEachStage(column);
    let playerNumber = this.board[rowNumber][columnNumber];

    let upperToLowerDirection = this.upperDirectionCount(rowNumber, columnNumber, playerNumber) + this.lowerDirectionCount(rowNumber, columnNumber, playerNumber) + 1;

    if (upperToLowerDirection === 3) {
      return true;
    }

    let leftToRightDirection = this.leftDirectionCount(rowNumber, columnNumber, playerNumber) + this.rightDirectionCount(rowNumber, columnNumber, playerNumber) + 1;

    if (leftToRightDirection === 3) {
      return true;
    }

    let lowerLeftToUpperRightDirection = this.lowerLeftDirectionCount(rowNumber, columnNumber, playerNumber) + this.upperRightDirectionCount(rowNumber, columnNumber, playerNumber) + 1;

    if (lowerLeftToUpperRightDirection === 3) {
      return true;
    }

    let upperLeftToLowerRightDirection = this.upperLeftDirectionCount(rowNumber, columnNumber, playerNumber) + this.lowerRightDirectionCount(rowNumber, columnNumber, playerNumber) + 1;

    if (upperLeftToLowerRightDirection === 3) {
      return true;
    }

    return false;
  }

  upperDirectionCount(rowNumber, columnNumber, playerNumber) {
    let lineCount = 0;
    for (let i = rowNumber - 1; this.board[i][columnNumber] !== -1; i--) {
      if (this.board[i][columnNumber] === playerNumber) {
        lineCount++;
      } else {
        break;
      }
    }
    return lineCount;
  }

  lowerDirectionCount(rowNumber, columnNumber, playerNumber) {
    let lineCount = 0;
    for (let i = rowNumber + 1; this.board[i][columnNumber] !== -1; i++) {
      if (this.board[i][columnNumber] === playerNumber) {
        lineCount++;
      } else {
        break;
      }
    }
    return lineCount
  }

  leftDirectionCount(rowNumber, columnNumber, playerNumber) {
    let lineCount = 0;
    for (let i = columnNumber - 1; this.board[rowNumber][i] !== -1; i--) {
      if (this.board[rowNumber][i] === playerNumber) {
        lineCount++;
      } else {
        break;
      }
    }
    return lineCount;
  }

  rightDirectionCount(rowNumber, columnNumber, playerNumber) {
    let lineCount = 0;
    for (let i = columnNumber + 1; this.board[rowNumber][i] !== -1; i++) {
      if (this.board[rowNumber][i] === playerNumber) {
        lineCount++;
      } else {
        break;
      }
    }
    return lineCount;
  }

  lowerLeftDirectionCount(rowNumber, columnNumber, playerNumber) {
    let lineCount = 0;
    let i = rowNumber + 1;
    let j = columnNumber - 1;
    while (this.board[i][j] !== -1) {
      if (this.board[i][j] === playerNumber) {
        lineCount++;
        i++;
        j--;
      } else {
        break;
      }
    }
    return lineCount;
  }

  upperRightDirectionCount(rowNumber, columnNumber, playerNumber) {
    let lineCount = 0;
    let i = rowNumber - 1;
    let j = columnNumber + 1;
    while (this.board[i][j] !== -1) {
      if (this.board[i][j] === playerNumber) {
        lineCount++;
        i--;
        j++;
      } else {
        break;
      }
    }
    return lineCount;
  }

  upperLeftDirectionCount(rowNumber, columnNumber, playerNumber) {
    let lineCount = 0;
    let i = rowNumber - 1;
    let j = columnNumber - 1;
    while (this.board[i][j] !== -1) {
      if (this.board[i][j] === playerNumber) {
        lineCount++;
        i--;
        j--;
      } else {
        break;
      }
    }
    return lineCount;
  }

  lowerRightDirectionCount(rowNumber, columnNumber, playerNumber) {
    let lineCount = 0;
    let i = rowNumber + 1;
    let j = columnNumber + 1;
    while (this.board[i][j] !== -1) {
      if (this.board[i][j] === playerNumber) {
        lineCount++;
        i++;
        j++;
      } else {
        break;
      }
    }
    return lineCount;
  }

  isAllFilled() {
    let result = true;
    for (let i = 0; i < this.board.length; i++) {
      result = this.board[i].every(value => value !== 0);
      if (!result) { break; }
    }

    return result;
  }

  addSquare() {
    this.board[this.board.length - 1].forEach((value, index, array) => {
      if (index !== 0 && index !== array.length - 1) {
        array[index] = 0;
      }
    });
    this.stage++;
    this.board.push([-1, -1, -1, -1, -1]);
  }

  createBoard() {
    this.board = [[-1, -1, -1, -1, -1], [-1, 0, 0, 0, -1], [-1, 0, 0, 0, -1], [-1, 0, 0, 0, -1], [-1, -1, -1, -1, -1]];
  }
}
