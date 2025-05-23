console.log("It works!")

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

        console.table(Gameboard.getGameboard());
        } else {
            return false;
        }  
    }

    const checkIfFree = (row, col) => {
        if ( gameboard[row][col] === undefined ) {
            return true;
        } else {
            return false;
        }
    }

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

    return { getName, getWins, addWin, getMark, assignMark }
}

const game = (() => {
    const players = [
        createPlayer("player1"),
        createPlayer("player2")
    ];
    players[0].assignMark("x");
    players[1].assignMark("o");

    const gameboard = createGameboard();
    let activeMark = "x";



    function getActivePlayer() {
        for (player of players) {
            if (player.getMark() === activeMark) {
                return player.getName();
            }
        }

    }

    function switchActiveMark() {
        ( activeMark === "x" ) ? activeMark ="o" : activeMark = "x";
    };

    function makeMove() {
        
        console.log(" ")
    }

    return { players, gameboard, getActivePlayer, switchActiveMark }
})();



function flipForChoice() {
    return Math.round(Math.random())
}