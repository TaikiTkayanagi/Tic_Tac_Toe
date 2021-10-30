let player = 'player1';
let opponent = '';
let isMyTurn = true;
let stage = 1;
var board = new Board(stage);
var socket = new Socket("test");

function putBoardView(playerOrOpponent, putElement) {
  if (playerOrOpponent === 'player1') {
    let img = document.createElement('img');
    img.src = '/icon/circle.png';
    img.classList.add("img-size");
    putElement.append(img);
  } else {
    let img = document.createElement('img');
    img.src = '/icon/cross.png';
    img.classList.add("img-size");
    putElement.append(img);
  }
}

function receive(jsonData) {
  if (jsonData["player"] === 'player1' && isMyTurn) {
    player = 'player2';
  }

  if (jsonData["player"] === player) {
    let is3Line = board.is3Line(jsonData["row"], jsonData["column"]);
    if(is3Line){
      winner(jsonData["player"]);
    } else if(board.isAllFilled() && stage === 4){
      draw();
    } else if(board.isAllFilled()){
      addSquareView();
      board.addSquare();
    }
    return;
  }

  opponent = jsonData["player"]
  isMyTurn = true;

  board.put(opponent, jsonData["row"], jsonData["column"]);
  putBoardView(opponent, document.getElementById(jsonData["place"]));

  let is3Line = board.is3Line(jsonData["row"], jsonData["column"]);
  if (is3Line) {
    winner(jsonData["player"]);
  } else if(board.isAllFilled() && stage === 4) {
    draw();
  } else if(board.isAllFilled()){
    addSquareView();
    board.addSquare();
  }
}

function winner(winnerPlayer) {
  if (player === winnerPlayer) {
    document.getElementById("winner-player").innerHTML = "あなたの勝ちです。";
  } else {
    document.getElementById("winner-player").innerHTML = "あなたの負けです。";
  }
}

function draw(){
  document.getElementById("winner-player").innerHTML = "引き分けです。";
}

function notPut() {
  window.alert("そこは置けません");
}

function addSquareView(){
  let board = document.getElementById("board-area");

  let divLeft = document.getElementById(`add${stage}-left-block`)
  let divCenter = document.getElementById(`add${stage}-center-block`);
  let divRight = document.getElementById(`add${stage}-right-block`);

  divLeft.classList.add("container", "col-4", "border-top", "border-right");
  divCenter.classList.add("container", "col-4", "border-left", "border-top", "border-right");
  divRight.classList.add("container", "col-4", "border-left", "border-top");

  stage++;

  board.append(divLeft);
  board.append(divCenter);
  board.append(divRight);
}

document.addEventListener('DOMContentLoaded', () => {
  socket.connect();

  document.getElementById('top-left-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "top", "left");

    if (result) {
      putBoardView(player, document.getElementById("top-left-block"));
      socket.send("top-left-block", "top", "left", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('top-center-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "top", "center");

    if (result) {
      putBoardView(player, document.getElementById("top-center-block"));
      socket.send("top-center-block", "top", "center", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('top-right-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "top", "right");

    if (result) {
      putBoardView(player, document.getElementById("top-right-block"));
      socket.send("top-right-block", "top", "right", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('middle-left-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "middle", "left");

    if (result) {
      putBoardView(player, document.getElementById("middle-left-block"));
      socket.send("middle-left-block", "middle", "left", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('middle-center-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "middle", "center");

    if (result) {
      putBoardView(player, document.getElementById("middle-center-block"));
      socket.send("middle-center-block", "middle", "center", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('middle-right-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "middle", "right");

    if (result) {
      putBoardView(player, document.getElementById("middle-right-block"));
      socket.send("middle-right-block", "middle", "right", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('bottom-left-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "bottom", "left");

    if (result) {
      putBoardView(player, document.getElementById("bottom-left-block"));
      socket.send("bottom-left-block", "bottom", "left", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('bottom-center-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "bottom", "center");

    if (result) {
      putBoardView(player, document.getElementById("bottom-center-block"));
      socket.send("bottom-center-block", "bottom", "center", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('bottom-right-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "bottom", "right");

    if (result) {
      putBoardView(player, document.getElementById("bottom-right-block"));
      socket.send("bottom-right-block", "bottom", "right", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('add1-left-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "add1", "left");

    if (result) {
      putBoardView(player, document.getElementById("add1-left-block"));
      socket.send("add1-left-block", "add1", "left", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('add1-center-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "add1", "center");

    if (result) {
      putBoardView(player, document.getElementById("add1-center-block"));
      socket.send("add1-center-block", "add1", "center", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('add1-right-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "add1", "right");

    if (result) {
      putBoardView(player, document.getElementById("add1-right-block"));
      socket.send("add1-right-block", "add1", "right", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('add2-left-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "add2", "left");

    if (result) {
      putBoardView(player, document.getElementById("add2-left-block"));
      socket.send("add2-left-block", "add2", "left", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('add2-center-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "add2", "center");

    if (result) {
      putBoardView(player, document.getElementById("add2-center-block"));
      socket.send("add2-center-block", "add2", "center", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('add2-right-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "add2", "right");

    if (result) {
      putBoardView(player, document.getElementById("add2-right-block"));
      socket.send("add2-right-block", "add2", "right", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('add3-left-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "add3", "left");

    if (result) {
      putBoardView(player, document.getElementById("add3-left-block"));
      socket.send("add3-left-block", "add3", "left", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('add3-center-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "add3", "center");

    if (result) {
      putBoardView(player, document.getElementById("add3-center-block"));
      socket.send("add3-center-block", "add3", "center", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

  document.getElementById('add3-right-block').addEventListener('click', () => {
    if (!isMyTurn) { return; }
    let result = board.put(player, "add3", "right");

    if (result) {
      putBoardView(player, document.getElementById("add3-right-block"));
      socket.send("add3-right-block", "add3", "right", player);
      isMyTurn = false;
    } else {
      notPut();
    }
  })

})
