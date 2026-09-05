(function () {
    const xPlayerWinCondition = 3;
    const yPlayerWinCondition = -3;
    let turn = 1; //1 for x, -1 for y
    let maxNumberOfTurns = 9;
    let currentTurn = 0;
    let isGameOver = false;
    let boardArray = new Array(9).fill(0);
    let p1Score = 0;
    let p2Score = 0;
    let xPlayer = null;
    let yPlayer = null;

    function Player(name) {
        if (!new.target) {
            return new Player(name);
        }
        this.name = name;
    }

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
            return 'X wins';
        } 
        else if (row1 === yPlayerWinCondition || row2 === yPlayerWinCondition || row3 === yPlayerWinCondition) {
            return 'O wins';
        }


        //check verticals
        let col1 = gameboard[0] + gameboard[3] + gameboard[6];
        let col2 = gameboard[1] + gameboard[4] + gameboard[7];
        let col3 = gameboard[2] + gameboard[5] + gameboard[8];

        if (col1 === xPlayerWinCondition || col2 === xPlayerWinCondition || col3 === xPlayerWinCondition) {
            return 'X wins';
        } 
        else if (col1 === yPlayerWinCondition || col2 === yPlayerWinCondition || col3 === yPlayerWinCondition) {
            return 'O wins';
        }

        //check diagonals
        let diag1 = gameboard[0] + gameboard[4] + gameboard[8];
        let diag2 = gameboard[2] + gameboard[4] + gameboard[6];

        if (diag1 === xPlayerWinCondition || diag2 === xPlayerWinCondition) {
            return 'X wins';
        } 
        else if (diag1 === yPlayerWinCondition || diag2 === yPlayerWinCondition) {
            return 'O wins';
        }

        return 'No winner yet';
    }

    function UpdateScoreUI() {
        const p1ScoreElement = document.getElementById('p1-wins');
        const p2ScoreElement = document.getElementById('p2-wins');

        p1ScoreElement.textContent = p1Score;
        p2ScoreElement.textContent = p2Score;
    }


    function CheckWinner() {

        let state = CheckBoardCondition(boardArray);

        if (state === 'X wins') {
            isGameOver = true;
            p1Score++;
            UpdateScoreUI();
            return alert('Game Over! X wins!');
        } else if (state === 'O wins') {
            isGameOver = true;
            p2Score++;
            UpdateScoreUI();
            return alert('Game Over! O wins!');
        }
        
        if (currentTurn === maxNumberOfTurns) {
            isGameOver = true;
            return alert('Game Over! The game is a draw!');
        }

    }

    function GenerateTicTacToeCell(arrayObj, index) {
        const cell = document.createElement('div');

        cell.classList.add('grid-item');
        cell.dataset.index = index;
        cell.dataset.clicked = false;

        cell.addEventListener('click', (e) => {
            if(cell.dataset.clicked === 'true') {
                return;
            }
            if(isGameOver) {
                return;
            }
            cell.textContent = turn === 1 ? 'X' : 'O';
            cell.classList.add(turn === 1 ? 'red-mark' : 'blue-mark');
            arrayObj[cell.dataset.index - 1] = turn;
            turn *= -1;
            currentTurn++;
            cell.dataset.clicked = true;
            CheckWinner();
            console.log(arrayObj);
        });
            
        return cell;
    }


    function GenerateUIBoard(arrayObj) {
        const gridContainer = document.querySelector('.grid-container');
        let n = 1;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = GenerateTicTacToeCell(arrayObj, n);

                gridContainer.appendChild(cell);
                n++;
            }
        }
    }

    function HideBoard() {
        const board = document.querySelector('.grid-container');
        board.style.display = 'none';
    }
    
    function ShowBoard() {
        const board = document.querySelector('.grid-container');
        board.style.display = 'grid';
    }

    function GameStart()
    {
        const p1Name = document.getElementById('player1-name-input').value;
        const p2Name = document.getElementById('player2-name-input').value;
        const name1 = document.getElementById('p1-name');
        const name2 = document.getElementById('p2-name');

        if (p1Name.trim() !== '')
            name1.textContent = p1Name;
        if (p2Name.trim() !== '')
            name2.textContent = p2Name;

        ShowBoard();
    }

    function NewRound()
    {
        boardArray.fill(0);
        const grid = document.querySelector('.grid-container');
        grid.replaceChildren();
        boardArray.fill(0);
        currentTurn = 0;
        isGameOver = false;
        turn = 1;
        GenerateUIBoard(boardArray);
        UpdateScoreUI();
    }

    function ResetGame(player1, player2)
    {
        NewRound();
        p1Score = 0;
        p2Score = 0;
        UpdateScoreUI();
    }

    function Init()
    {
        xPlayer = new Player('Player 1');
        yPlayer = new Player('Player 2');

        GenerateUIBoard(boardArray);
        HideBoard();

        document.getElementById('p1-name').textContent = xPlayer.name;
        document.getElementById('p2-name').textContent = yPlayer.name;

        const startButton = document.getElementById('start-button');
        startButton.addEventListener('click', () => { 
            GameStart(xPlayer, yPlayer);
        });

        const newRoundButton = document.getElementById('new-round-button');
        newRoundButton.addEventListener('click', () => {
            NewRound(xPlayer, yPlayer);
        });

        const resetButton = document.getElementById('reset-button');
        resetButton.addEventListener('click', () => {
            ResetGame(xPlayer, yPlayer);
        });

    }

    Init();
} )();
