(function () {
    const xPlayerWinCondition = 3;
    const yPlayerWinCondition = -3;
    let turn = 1; //1 for x, -1 for y
    let maxNumberOfTurns = 9;
    let currentTurn = 1;
    let isGameOver = false;
    let boardArray = new Array(9).fill(0);


    function CheckBoardCondition(gameboard) {

        /* 
            winning conditions:
            1. horizontal
                [1,2,3], [4,5,6], [7,8,9]
            2. vertical
                [1,4,7], [2,5,8], [3,6,9]
            3. diagonal
                [1,5,9], [3,5,7]
        */

        //check horizontals
        let row1 = gameboard[0] + gameboard[1] + gameboard[2];
        let row2 = gameboard[3] + gameboard[4] + gameboard[5];
        let row3 = gameboard[6] + gameboard[7] + gameboard[8];

        if (row1 === xPlayerWinCondition || row2 === xPlayerWinCondition || row3 === xPlayerWinCondition) {
            isGameOver = true;
            return 'X wins';
        } 
        else if (row1 === yPlayerWinCondition || row2 === yPlayerWinCondition || row3 === yPlayerWinCondition) {
            isGameOver = true;
            return 'O wins';
        }


        //check verticals
        let col1 = gameboard[0] + gameboard[3] + gameboard[6];
        let col2 = gameboard[1] + gameboard[4] + gameboard[7];
        let col3 = gameboard[2] + gameboard[5] + gameboard[8];

        if (col1 === xPlayerWinCondition || col2 === xPlayerWinCondition || col3 === xPlayerWinCondition) {
            isGameOver = true;
            return 'X wins';
        } 
        else if (col1 === yPlayerWinCondition || col2 === yPlayerWinCondition || col3 === yPlayerWinCondition) {
            isGameOver = true;
            return 'O wins';
        }

        //check diagonals
        let diag1 = gameboard[0] + gameboard[4] + gameboard[8];
        let diag2 = gameboard[2] + gameboard[4] + gameboard[6];

        if (diag1 === xPlayerWinCondition || diag2 === xPlayerWinCondition) {
            isGameOver = true;
            return 'X wins';
        } 
        else if (diag1 === yPlayerWinCondition || diag2 === yPlayerWinCondition) {
            isGameOver = true;
            return 'O wins';
        }

        return 'No winner yet';
    }

    function CheckWinner() {
        if (currentTurn === maxNumberOfTurns) {
            gameOver = true;
            return alert('Game Over! The game is a draw!');
        }


        let state = CheckBoardCondition(boardArray);

        if (state === 'X wins') {
            return alert('Game Over! X wins!');
        } else if (state === 'O wins') {
            return alert('Game Over! O wins!');
        }
        
    }

    function Player(name) {
        if (!new.target) {
            return new Player(name);
        }

        this.name = name;
        this.score = 0;
    }


    function GenerateUIBoard(arrayObj) {
        const gridContainer = document.querySelector('.grid-container');
        let n = 1;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');

                cell.classList.add('grid-item');
                cell.dataset.index = n;
                cell.dataset.clicked = false;

                cell.addEventListener('click', (e) => {
                    if(cell.dataset.clicked === 'true') {
                        return;
                    }
                    if(isGameOver) {
                        return;
                    }
                    cell.textContent = turn === 1 ? 'X' : 'O';
                    arrayObj[cell.dataset.index - 1] = turn;
                    turn *= -1;
                    currentTurn++;
                    cell.dataset.clicked = true;
                    CheckWinner();
                    console.log(arrayObj);
                });
                

                gridContainer.appendChild(cell);
                n++;
            }
        }
    }

    GenerateUIBoard(boardArray);
} )();
