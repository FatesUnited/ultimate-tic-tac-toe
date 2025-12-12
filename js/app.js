//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


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
let board = [];
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('.board');
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

init();

/*-------------------------------- Functions --------------------------------*/
function init() {
    board = ['','','','','','','','',''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((sq, index) => {
        if(board[index] === 'X') {
            squareEls[index].textContent = 'X';
        }
        else if (board[index] === 'O') {
            squareEls[index].textContent = 'O';
        } else {
            squareEls[index].textContent = '';
        }
    });
}

function updateMessage() {
    if(winner === false) {
        if (tie === false) {
            messageEl.innerText = `It is currently ${turn}'s turn`;
            updateBoard();
        }
        else {
            messageEl.innerText = `It's a tie!`;
            // console.log("It's a tie!");
        }
    } else {
        messageEl.innerText = `${turn} is the winner!`;
        // console.log(`${turn} is the winner!`);
    }
}

function handleClick(event) {
    if(event.target.textContent === 'X' || event.target.textContent === 'O') {
        return;
    }
    
    if(winner) {
        return;

    }

    placePiece(event.target.id);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();

    render();
}

function placePiece(index) {
    board[index] = turn;

    updateBoard();
    // console.log(board);
}

function checkForWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        // for (let j = 0; j < winningCombos[i].length; j++) {

            // if(j === 0) {
                if(board[winningCombos[i][0]] === '') {
                    // continue;
                }
                else if (board[winningCombos[i][0]] === 'X' || board[winningCombos[i][0]] === 'O') {
                    if (board[winningCombos[i][0]] === board[winningCombos[i][1]]) {
                        if (board[winningCombos[i][0]] === board[winningCombos[i][2]]) {
                            winner = true;
                            // console.log(`Winner! ${winner}`);
                        }
                    }

                }
            // }   
        // }
    }
}

function checkForTie() {
    let hasSpace = false;
    
    if(winner === true) {
        return;
    }

    for (let i = 0; i < board.length; i++) {
        if(board[i] === '') { 
            hasSpace = true;
        }
    }

    if(hasSpace === true) { 
        tie = false;
        // console.log(`Tie! ${tie}`);
    } else {
        tie = true;
        // console.log(`Tie! ${tie}`);
    }    
}

function switchPlayerTurn() {
    if (winner === true) {
        return;
    } 
    
    if (turn === 'X') {
        turn = 'O';
        // console.log(`Turn! ${turn}`);
    }
    else if (turn === 'O') {
        turn = 'X';
        // console.log(`Turn! ${turn}`);
    }
}


/*----------------------------- Event Listeners -----------------------------*/
const squareIndex = boardEl.addEventListener('click', handleClick);
const reset = resetBtnEl.addEventListener('click', init);
