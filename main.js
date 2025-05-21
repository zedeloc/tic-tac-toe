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
        gameboard[row].splice(col, 1, value);
        console.log(`Row: ${row}, Column: ${col}: is now ${value}.`);

        console.table(Gameboard.getGameboard());
    }

    const getGameboard = () => gameboard;
    return { getGameboard, updateCell };
};

const Gameboard = createGameboard();