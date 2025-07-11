const grid = document.querySelector('.grid-container');


function Gameboard() {
    let cells = [null, null, null, null, null, null, null, null, null];

    function getBoard() {
        return cells;
    }

    function setCell(index, marker) {
        if (cells[index] === null) {
            cells[index] = marker;
            updateHTML();
            console.log(`${marker} placed in cell ${index+1}`);
            return true;
        } else {
            console.log("Cell already populated! Try again.");
            return false;
        }
    }

    function reset() {
        cells = [null, null, null, null, null, null, null, null, null];
    }

    
    return { getBoard, setCell, reset  };
}


function Player(name, marker) {
    return { name, marker }
}


function Game(player1, player2, board) {
    let currentPlayer = player1;
    console.log(`Current player: ${currentPlayer.name}`); // delete me
    let gameOver = false;

    function playTurn(index) {
        if (gameOver) return;

        if (board.setCell(index, currentPlayer.marker)) {
            updateHTML();
            if (checkWin()) {
                gameOver = true;
                alert(currentPlayer.name + " wins!");
            } else {
                console.log('game still in progress...');
                switchPlayer();
            }
        }
    }

    function switchPlayer() {
        currentPlayer = (currentPlayer === player1) ? player2:player1;
        console.log(`Current player: ${currentPlayer.name}`); // delete me
    }

    function checkWin() {
        const boardArray = board.getBoard(); // get cells
        let winner = false;
        
        const winLines = [
            [0, 1, 2], // horizontal
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6], // vertical
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], // diagonal
            [2, 4, 6]
        ];
        
        // check if values in win line are not null and are the same
        winLines.forEach(line => {
            const [a, b, c] = line; // assign line values to each placeholder index
            if (
                boardArray[a] &&
                boardArray[a] === boardArray[b] &&
                boardArray[a] === boardArray[c]
            ) {
                winner = true;
            }
        });
        return winner;
    }

    function resetGame() {
        board.reset();
        currentPlayer = player1;
        gameOver = false;
    }

    return { playTurn, resetGame }
}

function updateHTML() {
    const boardArray = board.getBoard(); // get cells

    Array.from(squares).forEach((square, index) => {
        square.textContent = boardArray[index];
    });
}

// DOM/Inititialize Game
let game;
const board = Gameboard();

const startButton = document.querySelector('#start-button');
const inputs = document.querySelectorAll('input');
const squares = document.querySelectorAll('.square');

let gameStarted = false;

startButton.addEventListener('click', function(e){
    if (!gameStarted) {
        const name1 = inputs[0].value.trim();
        const name2 = inputs[1].value.trim();

        // input validation
        if (!name1 || !name2) {
            alert("Both player names are required!");
            return;
        }
        if (name1 === name2) {
            alert("Player names must be different!");
            return;
        }

        const player1 = Player(name1, 'X');
        const player2 = Player(name2, 'O');
        
        game = Game(player1, player2, board);
        board.reset();
        updateHTML();

        startButton.textContent = 'Reset';
        startButton.style.backgroundColor = '#ff5252';
        startButton.style.color = 'white';
        gameStarted = true;
    } else {
        // reset the game and board, keep button as 'Reset'
        board.reset();
        updateHTML();
        if (game && game.resetGame) {
            game.resetGame();
        }
    }
});

Array.from(squares).forEach((square, index) => {
    square.addEventListener('click', function(e){
        e.stopPropagation();
        game.playTurn(index);
    });
});