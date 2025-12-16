/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


/*---------------------------- Variables (state) ----------------------------*/
let mainBoard = [];
let board0 = [];
let board1 = [];
let board2 = [];
let board3 = [];
let board4 = [];
let board5 = [];
let board6 = [];
let board7 = [];
let board8 = [];
let turn;
let winner;
let tie;
let bPos;

/*------------------------ Cached Element References ------------------------*/
const boardEls = document.querySelectorAll('.board');
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

init();

/*-------------------------------- Functions --------------------------------*/
function init() {
    mainBoard = ['','','','','','','','',''];
    board0 = ['','','','','','','','',''];
    board1 = ['','','','','','','','',''];
    board2 = ['','','','','','','','',''];
    board3 = ['','','','','','','','',''];
    board4 = ['','','','','','','','',''];
    board5 = ['','','','','','','','',''];
    board6 = ['','','','','','','','',''];
    board7 = ['','','','','','','','',''];
    board8 = ['','','','','','','','',''];
    turn = 'X';
    winner = false;
    tie = false;
    bPos = -1;

    squareEls.forEach(sq => {
        sq.textContent = '';
    })

    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard(eventId) {
    let nodeEl = Array.from(squareEls).find(el => {
        return el.id === eventId;
    })
    
    if (nodeEl) {
        nodeEl.textContent = turn;
    }
}

function updateMessage() {
    if(winner === false) {
        if (tie === false) {
            messageEl.innerText = `It is currently ${turn}'s turn`;
        }
        else {
            messageEl.innerText = `It's a tie!`;
        }
    } else {
        messageEl.innerText = `${turn} is the winner!`;
    }
}

function handleClick(event) {
    let boardNum = Number(event.target.id[1]); // used to pass the small board to placePiece()
    let squareNum = Number(event.target.id[3]); // used to grab the index of the small board for placePiece()
    let sqNum = event.target.id; // userd to grab the correct element to render the piece
    let board = determineBoard(boardNum);

    if(event.target.textContent === 'X' || event.target.textContent === 'O') {
        return;
    }
    
    if(winner) {
        return;
    }
    
    bPos = mainBoard.findIndex(str => {
        return str === 'A'
    })

    if (bPos === -1 || bPos === boardNum) {
        // console.log("valid")
        if (checkForWinner(board)) {
            return;
        }

        if (board) {
            if(bPos >= 0 && bPos <= 8) {
                mainBoard[bPos] = '';
            }
            placePiece(board, squareNum);
            updateBoard(sqNum);
            if(checkForWinner(board)) {
                mainBoard[boardNum] = turn;
            }
            if(checkForWinner(mainBoard)) {
                winner = true;
            }
            if(checkForTie(board)) {
                mainBoard[boardNum] = 'T';
            }
            if(checkForTie(mainBoard)) {
                tie = true;
            }
            switchPlayerTurn();
        }
    } 
    
    // console.log(boardNum);
    // console.log(squareNum);
    // console.log(sqNum);
    // console.log(board);
    // console.log(mainBoard);

    render();
}

function determineBoard(board) {
    if (board === 0) {
        return board0;
    } else if (board === 1) {
        return board1;
    } else if (board === 2) {
        return board2;
    } else if (board === 3) {
        return board3;
    } else if (board === 4) {
        return board4;
    } else if (board === 5) {
        return board5;
    } else if (board === 6) {
        return board6;
    } else if (board === 7) {
        return board7;
    } else if (board === 8) {
        return board8;
    } 
}

function placePiece(board, index) {    
    
    board[index] = turn;
    
    // console.log(board);
    if(mainBoard[index] !== 'X' && mainBoard[index] !== 'O' && mainBoard[index] !== 'T') {
        mainBoard[index] = 'A';
        // console.log(mainBoard);
    }
    else {
        bPos = -1;
    }
}

function checkForWinner(board) {
    for (let i = 0; i < winningCombos.length; i++) {
        if(board[winningCombos[i][0]] === '') {
            // Do Nothing
        }
        else if (board[winningCombos[i][0]] === 'X' || board[winningCombos[i][0]] === 'O') {
            if (board[winningCombos[i][0]] === board[winningCombos[i][1]]) {
                if (board[winningCombos[i][0]] === board[winningCombos[i][2]]) {
                    return true;
                }
            }

        }
    }
}

function checkForTie(board) {  
    if(winner === true) {
        return;
    }

    for (let i = 0; i < board.length; i++) {
        if(board[i] === '') { 
            return false;
        }
    }

    return true;
}

function switchPlayerTurn() {
    if (winner === true) {
        return;
    } 
    
    if (turn === 'X') {
        turn = 'O';
    }
    else if (turn === 'O') {
        turn = 'X';
    }
}


/*----------------------------- Event Listeners -----------------------------*/
const squareIndex = boardEls.forEach(board => {
    board.addEventListener('click', handleClick);
})
const reset = resetBtnEl.addEventListener('click', init);
