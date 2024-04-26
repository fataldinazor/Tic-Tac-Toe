'use strict'

function gameBoard(){
    const rows=3;
    const cols=3;
    let board=[];
    const alpha=['a','b','c','d','e','f','g','h','i'];
    let map1= new Map();
    
    const getGameboard=()=>{
        let x=0;
        for(let i=0;i<rows;i++){
            board[i]=[];
            for(let j=0;j<cols;j++){
                map1.set(alpha[x],`${i}${j}`);
                board[i][j]=alpha[x];
                x++;
            }
        }
        // console.log(map1);
    }
   

    const modifyBoard=(value,where)=>{
        let cell=map1.get(where);
        board[cell[0]][cell[1]]=value;
    }

    const displayGameboard=()=>{
            for(let i=0;i<rows;i++){
                let rowString='';
                for(let j=0;j<cols;j++){
                    rowString+= board[i][j];
                    if(j<cols-1){
                        rowString+=' | ';
                    }
                }
                console.log(rowString);
                if(i<rows-1){
                    console.log('---------');
                }
            }
    }

    return {
        getGameboard,
        displayGameboard,
        modifyBoard
    };
}

function isWinning(){

}

const myGameboard=gameBoard();

myGameboard.getGameboard();
myGameboard.displayGameboard();
myGameboard.modifyBoard('x','b');
myGameboard.displayGameboard();