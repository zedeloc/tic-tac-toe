// Create Gameboard object with gameboard array
// Create Player object
// Create Game object that controls the game
// Remember: Little to no global code. Use factories in general, and IIFE (module pattern) for single instances.
// Consider carefully where each bit of logic goes
// Use buttons for the board items, column attribute (0, 1, 2)

const aGameboard = createGameboard()

function createGameboard () {
    const gameboard = [
        [undefined, undefined, undefined],[undefined, undefined, undefined],[undefined, undefined, undefined]
    ];

    const updateCell = (row, col, value) => {
        if (checkIfFree(row, col)) {
            gameboard[row].splice(col, 1, value);
            console.log(`Row: ${row}, Column: ${col}: is now ${value}.`);
            return true;
        
        } else {
            return false;
        }; 
    };

    const checkIfFree = (row, col) => {
        if ( gameboard[row][col] === undefined ) {
            return true;
        } else {
            return false;
        };
    };

    const getGameboard = () => gameboard;

    const clearGameboard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameboard[i].splice(j, 1, undefined);
            }
        }
        console.table(gameboard)
    }
    return { getGameboard, updateCell, clearGameboard };
};

function createPlayer (player) {
    let name = player;
    let wins = 0;
    let mark = undefined;

    const getName = () => name;
    const updateName = (newName) => name = newName;
    const getWins = () => wins;
    const addWin = () => wins++;
    const getMark = () => mark;
    const assignMark = (newMark) => mark = newMark;

    return { getName, getWins, addWin, getMark, assignMark, updateName };
};

function game() {
    // make player objects, store in array, designate marks
    active = true;
    const players = [
        createPlayer("player1"),
        createPlayer("player2")
    ];
    players[0].assignMark("x");
    players[1].assignMark("o");
    // make gameboard and set active mark
    const gameboard = createGameboard();
    let activeMark = "x";
    // Text update with instructions for the player
    function getStatus() {
        return `${getActivePlayer()}'s turn (your mark is ${getActiveMark()})`
    }

    function getActivePlayer() {
        for (player of players) {
            if (player.getMark() === activeMark) {
                return player.getName();
            };
        };
    };

    function switchActiveMark() {
        ( activeMark === "x" ) ? activeMark ="o" : activeMark = "x";
    };

    function makeMove(move) {
        console.log(`${getActivePlayer()}'s turn. Place mark: ${activeMark}`); 
        const moveArray = move.split('-');
        const isValidMove = gameboard.updateCell(moveArray[0], moveArray[1], activeMark);
        console.log(activeMark)
        if (!isValidMove) {
            return false;
        } else {
            return true;
        }
    };

    function checkForWin(mark) {
        const boardToEvaluate = gameboard.getGameboard();
        // check horizontal
        for (row of boardToEvaluate) {
            if (row[0] === mark && row[1] === mark && row[2] === mark) {
                return `${mark} wins in row:`;
            };
        };
        // check vertical
        for (let i = 0; i < 3; i++) {
            if (boardToEvaluate[0][i] === mark && boardToEvaluate[1][i] === mark && boardToEvaluate[2][i] === mark) {
                return `${mark} wins! in column ${i+1}`;
            };
        };
        // check diagonal
        if (boardToEvaluate[0][0] === mark && boardToEvaluate[1][1] === mark &&boardToEvaluate[2][2] === mark) {
            return `${mark} wins with diagonal 1`;

        } else if (boardToEvaluate[0][2] === mark && boardToEvaluate[1][1] === mark && boardToEvaluate[2][0] === mark) {
            return `${mark} wins with diagonal 2`;
            
        };
    };

    function checkForDraw() {
        const boardToEvaluate = gameboard.getGameboard();
        for (row of boardToEvaluate) {
            for (let i = 0; i < 3; i++) {
                if (!row[i]) {
                    return false;
                };
            };
        };
        return "DRAW!"
    };

    const getActiveMark = () => activeMark;

    function resetGame() {
        gameboard.clearGameboard();
        activeMark = 'x';
    }

    return { players, gameboard, getActivePlayer, switchActiveMark, makeMove, getActiveMark, checkForDraw, checkForWin, getStatus, resetGame };
};

const displayController = (() => {
    let ticTacToe = game();
    let isActive = true;
    
    const squares = document.querySelectorAll(".square");
    const info = document.querySelector("#info");
    const resetButton = document.querySelector("#reset-button");
    const butPlayer1 = document.querySelector("#but-player-1");
    const player1Name = document.querySelector("#player-1");
    const butPlayer2 = document.querySelector("#but-player-2");
    const player2Name = document.querySelector("#player-2");
    info.textContent = ticTacToe.getStatus();

    butPlayer1.addEventListener("click", () => {
        ticTacToe.players[0].updateName(player1Name.value)
        info.textContent = ticTacToe.getStatus();
    })

    player1Name.addEventListener('keydown', (e) => {
        
        if (e.key === 'Enter') {
            e.preventDefault();
            ticTacToe.players[0].updateName(player1Name.value)
            info.textContent = ticTacToe.getStatus();
        }
    })

    butPlayer2.addEventListener("click", () => {
        ticTacToe.players[1].updateName(player2Name.value)
        info.textContent = ticTacToe.getStatus();
    })

    player2Name.addEventListener('keydown', (e) => {
        
        if (e.key === 'Enter') {
            e.preventDefault();
            ticTacToe.players[1].updateName(player2Name.value)
            info.textContent = ticTacToe.getStatus();
        }
    })

    resetButton.addEventListener('click', () => {
        ticTacToe.resetGame();
        squareLoader();
        isActive = true;
        info.textContent = ticTacToe.getStatus();
    })

    squares.forEach((square) => {
        square.addEventListener('click', () => {
                if (isActive){
                const activeMark = ticTacToe.getActiveMark();
                const squareArray = square.classList;

                console.log(squareArray[1])
                const isValid = ticTacToe.makeMove(squareArray[1])
                if (isValid) {
                    squareLoader();
                    ticTacToe.switchActiveMark();
                    info.textContent = ticTacToe.getStatus();
                }
                const isWin = ticTacToe.checkForWin(activeMark);
                const isDraw = ticTacToe.checkForDraw();

                if (isWin) {
                    info.textContent = isWin;
                    isActive = false;
                } else if (isDraw) {
                    info.textContent = isDraw;
                    isActive = false
                }
            }    
        })
    })

    function getRowColArray(squareClass) {
        return squareClass.classList[1].split("-");
    }
    function squareLoader() {
        squares.forEach((square) => {
            const squareLocation = getRowColArray(square);
            const currentGameboard = ticTacToe.gameboard.getGameboard()
            square.textContent = currentGameboard[squareLocation[0]][squareLocation[1]]

        })
    }
})();

