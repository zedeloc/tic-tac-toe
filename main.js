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
    let symbol = undefined;

    const getName = () => name;
    const getWins = () => wins;
    const addWin = () => wins++;
    const getSymbol = () => symbol;
    const assignSymbol = (sym) => symbol = sym;

    return { getName, getWins, addWin, getSymbol, assignSymbol}
}


const Gameboard = createGameboard();
const Player1 = createPlayer("Bill");

