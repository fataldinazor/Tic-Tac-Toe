'use strict'

function gameBoard(){
    const mainContainer=document.querySelector('.mainContainer');
    const rows=3;
    const cols=3;
    let board=[];
    let set1=new Set();

    const createGameboard=()=>{
        const squareBoard=document.createElement('div');
        squareBoard.classList.add('square');
        for(let i=0;i<rows;i++){
            const row=document.createElement('div');
            row.classList.add('row');
            for(let j=0;j<cols;j++){
                const col=document.createElement('div');
                col.classList.add('col');
                col.setAttribute('id',`${i}${j}`);
                set1.add(`${i}${j}`);
                row.appendChild(col);
            }
            squareBoard.appendChild(row);
        }
        mainContainer.appendChild(squareBoard);
        console.log(set1);
    }

    const markBox=(marker)=>{
        const boxes=document.querySelectorAll('.col');
        boxes.forEach(function(box){
            box.addEventListener('click',function(e){
                box.textContent=marker;
            })
        })
    }

    return{
        set1,
        createGameboard,
        markBox,
    };
}

function playerDetails(){
    const submitBtn=document.querySelector('.submit');
    const dialog=document.querySelector('dialog');

    const openModal=()=>{
        dialog.showModal();
    }
    document.addEventListener('DOMContentLoaded',openModal());

    submitBtn.addEventListener('click',processForm)

    function processForm(){
        const username=document.querySelector('#user_name').value;
        const markerChoice=document.querySelector('#marker').value;
        // console.log(username,markerChoice);        
        dialog.close();
        return{
            username,
            markerChoice
        }
    }    
    return {
        processForm,
    }
}

function gameController(){
    const game=gameBoard();
    
    game.createGameboard();
    // game.markBox('x');
    const playerInfo=playerDetails();
    console.log(playerInfo);
}

const playGame=gameController();