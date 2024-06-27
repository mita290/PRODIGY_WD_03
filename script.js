const board = document.getElementById("board");
const squares = document.getElementsByClassName("square");
const players = ['X', 'O'];
let currentPlayer = players[0];
let playAgainstComputer = false;

const endMessage = document.createElement("h2");
endMessage.textContent = `X's turn!`;
endMessage.style.marginTop = "5rem";
endMessage.style.textAlign = "center";
board.after(endMessage);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function win(currentPlayer) {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
            return true;
        }
    }
    return false;
}

function tie() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === '') {
            return false;
        }
    }
    return true;
}

function restart() {
    /*for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = "";
        squares[i].style.backgroundColor = 'white';
    }
    endMessage.textContent = `X's turn!`;
    currentPlayer = players[0];*/
    window.location.reload();
}

function toggleComputerMode() {
    playAgainstComputer = !playAgainstComputer;
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = "";
        squares[i].style.backgroundColor = 'white';
    }
    endMessage.textContent = `X's turn!`;
    currentPlayer = players[0];
    document.getElementById("playVsComputerButton").value = playAgainstComputer ? "Play vs Player" : "Play vs Computer";
}

function computerMove() {
    let emptySquares = [];
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === '') {
            emptySquares.push(i);
        }
    }
    if (emptySquares.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptySquares.length);
        squares[emptySquares[randomIndex]].textContent = currentPlayer;
        if (win(currentPlayer)) {
            endMessage.textContent = `Game Over! ${currentPlayer} wins!`;
            return;
        }
        if (tie()) {
            endMessage.textContent = `Tie!`;
            return;
        }
        currentPlayer = players[0];
        endMessage.textContent = `X's turn!`;
    }
}

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        if (squares[i].textContent !== '' || (playAgainstComputer && currentPlayer === players[1])) {
            return;
        }
        squares[i].textContent = currentPlayer;
        if (squares[i].textContent !== '') {
            squares[i].style.backgroundColor = 'lightgray';
        }
        if (win(currentPlayer)) {
            endMessage.textContent = `Game Over! ${currentPlayer} wins!`;
            return;
        }
        if (tie()) {
            endMessage.textContent = `Tie!`;
            return;
        }
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
        endMessage.textContent = `${currentPlayer}'s turn!`;

        if (playAgainstComputer && currentPlayer === players[1]) {
            setTimeout(computerMove, 200); 
        }
    });
}
