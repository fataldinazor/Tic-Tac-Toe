"use strict";

function player() {
  const playerInfo = (callback) => {
    const form = document.querySelector("form");
    const dialog = document.querySelector("dialog");

    function showDialog() {
      dialog.showModal();
    }
    document.addEventListener("DOMContentLoaded", showDialog);

    form.addEventListener("submit", getInfo);

    function getInfo(event) {
      event.preventDefault();

      const formData = new FormData(form);
      const name = formData.get("username");
      const marker = formData.get("marker");
      createPlayer(name, marker);
      callback(name, marker);
      dialog.close();
    }
  };
  const createPlayer = (userName, marker) => {
    return {
      name: userName,
      marker: marker,
    };
  };
  return { playerInfo, createPlayer };
}

function gameBoard() {
  const mainContainer = document.querySelector(".mainContainer");
  const rows = 3;
  const cols = 3;
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
  };

  function displayPlayerName(userName) {
    const nameContainer = document.createElement("div");
    nameContainer.textContent = userName;
    nameContainer.classList.add("nameContainer");
    mainContainer.appendChild(nameContainer);
  }

  const getAiMove = () => {
    let ranNum1, ranNum2;
    const boxes = document.querySelectorAll(".col");
    do {
      ranNum1 = Math.floor(Math.random() * 3);
      ranNum2 = Math.floor(Math.random() * 3);
    } while (!set1.has(`${ranNum1}${ranNum2}`));
    return `${ranNum1}${ranNum2}`;    
  };

  const markBox = (marker) => {
    const boxes = document.querySelectorAll(".col");
    boxes.forEach(function (box) {
      box.addEventListener("click", function (e) {
        if (box.textContent === "") {
            box.textContent = marker;
            console.log(box.id);
        }
      });
    });
  };

  return {
    set1,
    displayPlayerName,
    createGameboard,
    markBox,
    getAiMove,
  };
}

const getPlayer = player();

getPlayer.playerInfo(startGame);

function startGame(name, marker) {
  const game = gameBoard();
  game.displayPlayerName(name);
  game.createGameboard();

  const player = getPlayer.createPlayer(name, marker);

  const ai = {
    name: "Ai",
    marker: player.marker === "X" ? "O" : "X",
  };

  let aiMove = game.getAiMove();

  let activePlayer = player.marker === "X" ? player : ai;

  function switchPlayer() {
    activePlayer = activePlayer === player ? ai : player;
    return activePlayer;
  }
  
  
}
