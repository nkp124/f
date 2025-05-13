
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    let cells = [];
    let currentPlayer = 'X';
    let gameActive = true;

    function createBoard() {
      board.innerHTML = '';
      cells = [];
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
        cells.push(cell);
      }
      currentPlayer = 'X';
      gameActive = true;
      status.textContent = 'Ходит: X';
    }

    function handleCellClick(index) {
      if (!gameActive || cells[index].textContent !== '') return;
      cells[index].textContent = currentPlayer;
      if (checkWinner()) {
        status.textContent = `Победил: ${currentPlayer}`;
        gameActive = false;
        return;
      }
      if (cells.every(cell => cell.textContent !== '')) {
        status.textContent = 'Ничья!';
        gameActive = false;
        return;
      }
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Ходит: ${currentPlayer}`;
    }

    function checkWinner() {
      const combos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];
      return combos.some(([a,b,c]) =>
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      );
    }

    function restartGame() {
      createBoard();
    }

    createBoard();