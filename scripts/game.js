const xPlayerWinCondition = 3;
const yPlayerWinCondition = -3;

function Gameboard() {
    if (!new.target) {
        return new Gameboard();
    }

    this.board = [
        [1, -1, -1],
        [-1, -1, 1],
        [-1, 1, 1]
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

    //check left root diagonals
    let leftdiagsum = 0;
    let rightdiagsum = 0;
    for (let i = 0; i < gameboard.board.length; i++) {
        if (gameboard.board[i][i] == 1) {
            leftdiagsum++;
        }
        else if (gameboard.board[i][i] == -1) {
            leftdiagsum--;
        }

        if (leftdiagsum == 3) {
            return { xWins: true, yWins: false }
        }
        else if (leftdiagsum == -3) {
            return { xWins: false, yWinds: true }
        }
    }

    for (let i = 0; i < gameboard.board.length; i++) {
        let n = gameboard.board[i].length
        if (gameboard.board[i][n - 1 - i] == 1) {
            rightdiagsum++;
        }
        else if (gameboard.board[i][n - 1 - i] == -1) {
            rightdiagsum--;
        }

        console.log(rightdiagsum)
        if (rightdiagsum == 3) {
            return { xWins: true, yWins: false }
        }
        else if (rightdiagsum == -3) {
            return { xWins: false, yWinds: true }
        }
    }


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
