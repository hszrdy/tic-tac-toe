const xPlayerWinCondition = 3;
const yPlayerWinCondition = -3;

function Gameboard() {
    if (!new.target) {
        return new Gameboard();
    }

    this.board = [
        [1, -1, -1],
        [-1, 1, -1],
        [1, 1, -1]
    ];
}

function CheckBoardCondition(gameboard) {


    //check rows
    for (let i = 0; i < gameboard.board.length; i++) {
        let rowsum = 0;
        for (let j = 0; j < gameboard.board[i].length; j++) {
            if (gameboard.board[i][j] === 1) {
                rowsum++;
            }
            else if (gameboard.board[i][j] === -1) {
                rowsum--;
            }
        }

        if (rowsum == 3) {
            return { xWins: true, yWins: false }
        }
        else if (rowsum == -3) {
            return { xWins: false, yWins: true }
        }
    }

    //check columns
    for (let i = 0; i < gameboard.board.length; i++) {
        let colsum = 0;
        for (let j = 0; j < gameboard.board[i].length; j++) {
            if (gameboard.board[j][i] === 1) {
                colsum++;
            }
            else if (gameboard.board[j][i] === -1) {
                colsum--;
            }
        }

        if (colsum == 3) {
            return { xWins: true, yWins: false }
        }
        else if (colsum == -3) {
            return { xWins: false, yWins: true }
        }
    }

    //check diagonals



    return { xWins: false, yWins: false }
}

function Player(name) {
    if (!new.target) {
        return new Player(name);
    }

    this.name = name;
    this.score = 0;
}


let gb = new Gameboard();
let state = CheckBoardCondition(gb);
console.log(state)
