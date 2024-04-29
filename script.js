"use strict";

function gameBoard() {
  const rows = 3;
  const cols = 3;
  let board = [];
  const alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  let map1 = new Map();

  const getGameboard = () => {
    let x = 0;
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < cols; j++) {
        map1.set(alpha[x], `${i}${j}`);
        board[i][j] = alpha[x];
        x++;
      }
    }
  };

  const modifyBoard = (marker, where) => {
    let cell = map1.get(where);
    board[cell[0]][cell[1]] = marker;
    map1.delete(where);
  };

  const getAiMove = () => {
    let ranNum;
    do {
      ranNum = Math.floor(Math.random() * alpha.length);
    } while (!map1.has(alpha[ranNum]));
    return alpha[ranNum];
  };

  const getPlayerChoice = () => {
    let playerChoice;
    do {
      playerChoice = prompt("Enter your choice on the Board");
    } while (!map1.has(playerChoice));
    return playerChoice;
  };

  const displayGameboard = () => {
    for (let i = 0; i < rows; i++) {
      let rowString = "";
      for (let j = 0; j < cols; j++) {
        rowString += board[i][j];
        if (j < cols - 1) {
          rowString += " | ";
        }
      }
      console.log(rowString);
      if (i < rows - 1) {
        console.log("---------");
      }
    }
    console.log("\n");
  };

  return {
    board,
    map1,
    getGameboard,
    modifyBoard,
    getPlayerChoice,
    getAiMove,
    displayGameboard,
  };
}

function playerDesc() {
  const playerMarker = () => {
    let getMarker;
    do {
      getMarker = prompt("Choose your marker => 'X' or 'O'");
    } while (
      getMarker !== "O" &&
      getMarker !== "o" &&
      getMarker !== "X" &&
      getMarker !== "x"
    );
    if (getMarker === "X" || getMarker === "x") {
      return "X";
    } else if (getMarker === "O" || getMarker === "o") {
      return "O";
    }
  };

  return {
    playerMarker,
  };
}

function gameController() {
  const myGameboard = gameBoard();
  const playerInfo = playerDesc();

  let map1 = myGameboard.map1;
  let board = myGameboard.board;
  const player = {
    name: "fataldinazor",
    marker: playerInfo.playerMarker(),
  };

  const computer = {
    name: "Computer",
    marker: player.marker === "X" ? "O" : "X",
  };

  myGameboard.getGameboard();
  let aiMove = () => myGameboard.getAiMove();
  let playerChoice = () => myGameboard.getPlayerChoice();

  let activePlayer = player.marker === "X" ? player : computer;

  const switchPlayer = () => {
    activePlayer = activePlayer === player ? computer : player;
    return activePlayer;
  };

  myGameboard.displayGameboard();

  function isWinning(currBrd) {
    for (let i = 0; i < 3; i++) {
      let set1 = new Set();
      let set2 = new Set();
      for (let j = 0; j < 3; j++) {
        set1.add(currBrd[i][j]);
        set2.add(currBrd[j][i]);
      }
      if (set1.size === 1) return true;
      if (set2.size === 1) return true;
    }

    let set1 = new Set();
    for (let i = 0; i < 3; i++) {
      set1.add(currBrd[i][2 - i]);
    }
    if (set1.size === 1) return true;
    set1.clear();

    for (let i = 0; i < 3; i++) {
      set1.add(currBrd[i][i]);
    }
    if (set1.size === 1) return true;
  }

  const game = () => {
    while (map1.size > 0) {
      if (activePlayer === player) {
        myGameboard.modifyBoard(player.marker, `${playerChoice()}`);
      } else if (activePlayer === computer) {
        myGameboard.modifyBoard(computer.marker, `${aiMove()}`);
        myGameboard.displayGameboard();
      }
      let win = isWinning(board);
      if (win === true) {
        myGameboard.displayGameboard();
        console.log(`Winner is ${activePlayer.name}`);
        return true;
      }
      switchPlayer();
    }
    return false;
  };
  if (game() === false) {
    console.log("The Game Tied!");
  }
}

gameController();
