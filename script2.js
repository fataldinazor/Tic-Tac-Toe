"use strict";

function gameBoard() {
  const mainContainer = document.querySelector(".mainContainer");
  const rows = 3;
  const cols = 3;
  let board = [];
  let set1 = new Set();

  const createGameboard = () => {
    const squareBoard = document.createElement("div");
    squareBoard.classList.add("square");
    for (let i = 0; i < rows; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < cols; j++) {
        const col = document.createElement("div");
        col.classList.add("col");
        col.setAttribute("id", `${i}${j}`);
        set1.add(`${i}${j}`);
        row.appendChild(col);
      }
      squareBoard.appendChild(row);
    }
    mainContainer.appendChild(squareBoard);
    console.log(set1);
    // return set1;
  };

  const markBox = (marker) => {
    const boxes = document.querySelectorAll(".col");
    boxes.forEach(function (box) {
      box.addEventListener("click", function (e) {
        box.textContent = marker;
      });
    });
  };

  return {
    set1,
    createGameboard,
    markBox,
  };
}

function player() {
  const mainContainer = document.querySelector(".mainContainer");

  let playerName;
  let playerMarker;
  const playerDetails = () => {
    playerName = prompt("What is your Name?");
    do {
      playerMarker = prompt("Which Marker do you want?").toUpperCase();
    } while (playerMarker !== "O" && playerMarker !== "X");

    return {
      playerName,
      playerMarker,
    };
  };

  const displayName = (playerName) => {
    const displayDiv = document.createElement("div");
    displayDiv.classList.add('playerDisplay');
    displayDiv.textContent = playerName;
    mainContainer.appendChild(displayDiv);
  };

  return { playerDetails, displayName };
}

function gameController() {
  const playerInfo = player();
  const { playerName: username, playerMarker: marker } =
    playerInfo.playerDetails();

  console.log(username, marker);
  playerInfo.displayName(username);



  const game = gameBoard();

  game.createGameboard();
}

const playGame = gameController();
