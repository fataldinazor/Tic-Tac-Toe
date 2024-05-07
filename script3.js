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

  return {
    set1,
    displayPlayerName,
    createGameboard,
  };
}

const getPlayer = player();

getPlayer.playerInfo(initGame);

function initGame(name, marker) {
  const game = gameBoard();
  game.displayPlayerName(name);
  game.createGameboard();
  let set = game.set1;
  const player = getPlayer.createPlayer(name, marker);

  const ai = {
    name: "Ai",
    marker: player.marker === "X" ? "O" : "X",
  };

  let activePlayer = player.marker === "X" ? player : ai;

  function startGame(){
    if(activePlayer===ai){
      getAiMove();
    }
  }

  
  const boxes = document.querySelectorAll(".col");
  boxes.forEach(function(box){
    box.addEventListener('click',function(){
      if(set.size>0){
        if (box.textContent === "") {
          box.textContent = player.marker;
          console.log(box.id);
          set.delete(box.id);
          if(isWinning()===true){
            console.log('The Player has Won the Match');
            return player;
          }
          getAiMove();
        }
      }
      else console.log('Game Over');
    })
  })
  
  const getAiMove = () => {
    let ranNum1, ranNum2;
    if(set.size>0){
      do {
        ranNum1 = Math.floor(Math.random() * 3);
        ranNum2 = Math.floor(Math.random() * 3);
      } while (!set.has(`${ranNum1}${ranNum2}`));
      const box = document.getElementById(`${ranNum1}${ranNum2}`);
      box.textContent=ai.marker;
      set.delete(box.id);
      if(isWinning()===true){
        console.log('The AI has Won the Match');
        return player;
      }
    }
    else console.log('Game Over');
  };
  
  const isWinning=()=>{
    
    for(let i=0;i<3;i++){
      let tempSet1=new Set();
      let tempSet2=new Set();
      for(let j=0;j<3;j++){
        const box1=document.getElementById(`${i}${j}`);
        if(box1.textContent==='')
        tempSet1.add('A');
        else
        tempSet1.add(box1.textContent);
        const box2=document.getElementById(`${j}${i}`);
        if(box2.textContent==='')
        tempSet2.add('B');
        else
        tempSet2.add(box2.textContent);
      }
      if (tempSet1.size === 1 && (tempSet1.has('X') || tempSet1.has('O'))) return true;
      if (tempSet2.size === 1 && (tempSet2.has('X') || tempSet2.has('O'))) return true;
    }

    let tempSet1 = new Set();
    for (let i = 0; i < 3; i++) {
      const box=document.getElementById(`${i}${2-i}`)
      if(box.textContent==='')
        tempSet1.add('A');
      else
      tempSet1.add(box.textContent);
    }
    if (tempSet1.size === 1 && (tempSet1.has('X') || tempSet1.has('O'))) return true;
    tempSet1.clear();

    for (let i = 0; i < 3; i++) {
      const box=document.getElementById(`${i}${i}`)
      if(box.textContent==='')
        tempSet1.add('A');
      else
      tempSet1.add(box.textContent);
    }
    if (tempSet1.size === 1&& (tempSet1.has('X') || tempSet1.has('O'))) return true;
  }
  
  function displayResults(winner){
    
  }
  startGame();
}
