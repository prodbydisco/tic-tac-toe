function Gameboard() {
    let cells = [null, null, null, null, null, null, null, null, null];

    function getBoard() {
        return cells;
    }

    function setCell(index, marker) {
        if (cells[index] === null) {
            cells[index] = marker;
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
            if (checkWin()) {
                gameOver = true;
                alert(currentPlayer.name + "wins!");
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
        return winner;board
    }

    function resetGame() {
        board.reset();
        currentPlayer = player1;
        gameOver = false;
    }

    return { playTurn, resetGame }
}

// Initialise game
const board = Gameboard();
const player1 = Player('Mark', 'X');
const player2 = Player('Steve', 'O');
const game = Game(player1, player2, board);

game.playTurn(0);
game.playTurn(0);