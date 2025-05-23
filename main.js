// Create Gameboard object with gameboard array
// Create Player object
// Create Game object that controls the game
// Remember: Little to no global code. Use factories in general, and IIFE (module pattern) for single instances.
// Consider carefully where each bit of logic goes
// Use buttons for the board items, column attribute (0, 1, 2)

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
    return { getGameboard, updateCell };
};

function createPlayer (player) {
    const name = player;
    let wins = 0;
    let mark = undefined;

    const getName = () => name;
    const getWins = () => wins;
    const addWin = () => wins++;
    const getMark = () => mark;
    const assignMark = (newMark) => mark = newMark;

    return { getName, getWins, addWin, getMark, assignMark };
};

const game = (() => {
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
    // let the user know what to do and show gameboard
    function updateCurrentState() {
        console.clear();
        for (let i = 0; i < 6; i++) {
            console.log(i);
        };
        console.log("To make a move call 'game.makeMove()' and please enter Row.Col separated by a single period");
        console.table(gameboard.getGameboard());
    };

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

    function makeMove() {
        console.log(`${getActivePlayer()}'s turn. Place mark: ${activeMark}`);
        promptForMove();

        function promptForMove() {
            const move = prompt(`${getActivePlayer()} (${activeMark}), enter move as Row.Col separated by a single period`);
            const moveArray = move.split('.');
            const isValidMove = gameboard.updateCell(moveArray[0], moveArray[1], activeMark);
            if (!isValidMove) {
                console.log("invalid move. Lets try again");
                makeMove();
           } else {
                console.table(gameboard.getGameboard());
                switchActiveMark();
           };
        };
    };

    function checkForWin(mark) {
        const boardToEvaluate = gameboard.getGameboard();
        // check horizontal
        for (row of boardToEvaluate) {
        
            if (row[0] === mark && row[1] === mark && row[2] === mark) {
                console.log(`${mark} wins in row:`)
                return true
            }
        }
        // check vertical
        for (let i = 0; i < 3; i++) {
            if (boardToEvaluate[0][i] === mark && boardToEvaluate[1][i] === mark && boardToEvaluate[2][i] === mark) {
                console.log(`${mark} wins! in column ${i+1}`)
                return true
            }
        }
        // check diagonal
        if (boardToEvaluate[0][0] === mark && boardToEvaluate[1][1] === mark &&boardToEvaluate[2][2] === mark) {
            console.log(`${mark} wins with diagonal 1`);
            return true;
        } else if (boardToEvaluate[0][2] === mark && boardToEvaluate[1][1] === mark && boardToEvaluate[2][0] === mark) {
            console.log(`${mark} wins with diagonal 2`);
            return true;
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
        console.log("DRAW!")
        return true;
    };
    // Keep game running without having to manually call methods in the console
    function gameLoop() {
        while (active) {
            updateCurrentState()
            checkForWin("x");
            checkForWin('o');
            checkForDraw();
            makeMove();
        };
    };

    gameLoop();

    return { players, gameboard, getActivePlayer, switchActiveMark, makeMove };
})();



function flipForChoice() {
    return Math.round(Math.random());
};