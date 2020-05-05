let currentPlayer = 'X';
let gameState = ['', '', '', '', '' ,'' ,'' ,'' ,''];
let roundActive = true;
let winsPlayerX = 0;
let winsPlayerO = 0;

const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const gameBoard = (function() {
    const displayBoard = document.querySelector('#display');
    const nextButton = document.querySelector('#nextButton');

    document.addEventListener("click", e => {
        if (e.target.innerHTML !== '') return;

        if (parseInt(e.target.id) < 10 && currentPlayer === 'X') {  
            e.target.innerHTML = "X";
            playerMove(e.target.id, currentPlayer);
            results();
            if (roundActive) {
                playerChange();
                updateDisplay();
            } else nextGame();
            
        } else if (parseInt(e.target.id)) {
            e.target.innerHTML = "O";
            playerMove(e.target.id, currentPlayer);
            results();
            if (roundActive) {
                playerChange();
                updateDisplay();
            } else nextGame();
        }
    });

    const updateDisplay = () => {
        currentPlayer === 'X' ? displayBoard.innerHTML = "<p>It\'s X\'s turn!</p>" : 
        displayBoard.innerHTML = "<p>It\'s O\'s turn!</p>";
    };

    const resetBoard = () => {
        let cells = document.querySelectorAll(".cell");
        cells.forEach(e => e.innerHTML = '');
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        displayBoard.innerHTML = "<p>It\'s X\'s turn!</p>";
        nextButton.innerHTML = '';
        roundActive = true;
    };

    const playerChange = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateDisplay();
    }

    const nextGame = () => {
        nextButton.innerHTML = '<button id="newGame">Play Again!</button>'
        nextButton.onclick = () => resetBoard();
    }

    return {resetBoard};
})();

const reset = (function () {
    let resetButton = document.querySelector("#restart");
    resetButton.onclick = () => gameBoard.resetBoard();
})();

const playerMove = function(index, player) {
    gameState[index - 1] = player;
}

const results = function() {
    let roundWon = false;
    buttonX = document.getElementById("X");
    buttonO = document.getElementById("O");

    const displayBoard = document.querySelector('#display');

    for (let i = 0; i <= 7; i++) {
        const win = winCondition[i];
        let a = gameState[win[0]];
        let b = gameState[win[1]];
        let c = gameState[win[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        } 
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        displayBoard.innerHTML = `<p>Player ${currentPlayer} wins!</p>`;
        if (currentPlayer == 'X') {
            winsPlayerX++;
            buttonX.innerHTML = `Player X: ${winsPlayerX}`;
            roundActive = false;
        } else {
            winsPlayerO++;
            buttonO.innerHTML = `Player O: ${winsPlayerO}`
            roundActive = false;
        }
        
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        displayBoard.innerHTML = '<p>Draw!</p>';
        roundActive = false;
        return;
    }
};