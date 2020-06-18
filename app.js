const startButton = document.getElementById('start-button');
const score = document.getElementById('score');
const grid = document.querySelector('.grid');

const width = 10;
const displayWidth = 4;

let displayIndex = 0;

const jTetromino = [
  [1, 2, width + 1, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const lTetromino = [
  [0, 1, width + 1, width * 2 + 1],
  [2, width, width + 1, width + 2],
  [0, width, width * 2, width * 2 + 1],
  [width * 2, width, width + 1, width + 2],
];

const sTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
];

const zTetromino = [
  [1, width, width + 1, width * 2],
  [width, width + 1, width * 2 + 1, width * 2 + 2],
  [1, width, width + 1, width * 2],
  [width, width + 1, width * 2 + 1, width * 2 + 2],
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

document.addEventListener('DOMContentLoaded', () => {
  let squares = Array.from(document.querySelectorAll('.grid div'));
  let displaySquares = document.querySelectorAll('.mini-grid div');

  const tetris = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
    sTetromino,
    jTetromino,
  ];

  let currentPosition = 4;
  let currentRotation = 0;
  // Randomize tetrominoes

  let random = Math.floor(Math.random() * tetris.length);
  let nextRandom = 0;

  let current = tetris[random][currentRotation];

  //timerId = setInterval(moveDown, 1000);

  function draw() {
    current.forEach((indexValue) => {
      squares[currentPosition + indexValue].classList.add('tetromino');
    });
  }
  function unDraw() {
    current.forEach((indexValue) => {
      squares[currentPosition + indexValue].classList.remove('tetromino');
    });
  }

  // assign functions to keycode
  function control(e) {
    // rotate
    if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Numpad8')
      rotate();

    // move right
    if (e.code === 'ArrowRight' || e.code === 'KeyD' || e.code === 'Numpad6')
      moveRight();

    // move down
    if (e.code === 'ArrowDown' || e.code === 'KeyS' || e.code === 'Numpad2')
      moveDown();

    // move left
    if (e.code === 'ArrowLeft' || e.code === 'KeyA' || e.code === 'Numpad4')
      moveLeft();
  }

  document.addEventListener('keyup', control);

  function moveDown() {
    unDraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // freeze function
  function freeze() {
    if (
      current.some((indexValue) =>
        squares[currentPosition + indexValue + width].classList.contains(
          'taken'
        )
      )
    ) {
      current.forEach((indexValue) =>
        squares[currentPosition + indexValue].classList.add('taken')
      );
      random = nextRandom;

      nextRandom = Math.floor(Math.random() * tetris.length);
      currentPosition = 4;
      current = tetris[random][currentRotation];

      draw();
      displayShape();
    }
  }

  // Move the tetromino left, unless is at the edge or there is a blockage
  function moveLeft() {
    unDraw();

    const isAtLeftEdge = current.some(
      (indexValue) => (currentPosition + indexValue) % width === 0
    );

    if (!isAtLeftEdge) currentPosition = currentPosition - 1;

    if (
      current.some((indexValue) =>
        squares[currentPosition + indexValue].classList.contains('taken')
      )
    ) {
      currentPosition += 1;
    }

    draw();
  }

  // move the tetromino right, unless at the edge or there is a blockage
  function moveRight() {
    unDraw();

    const isAtRightEdge = current.some(
      (indexValue) => (currentPosition + indexValue) % width === width - 1
    );

    if (!isAtRightEdge) currentPosition += 1;

    if (
      current.some((indexValue) =>
        squares[currentPosition + indexValue].classList.contains('taken')
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }

  // rotate the tetromino
  function rotate() {
    unDraw();
    currentRotation++;
    if (currentRotation === 4) currentRotation = 0;

    current = tetris[random][currentRotation];
    draw();
  }

  const upNextTetrominoes = [
    [0, 1, displayWidth + 1, displayWidth * 2 + 1], // lTetromino
    [1, displayWidth, displayWidth + 1, displayWidth * 2], // zTetromino
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // tTeromino
    [0, 1, displayWidth, displayWidth + 1], //oTetromino
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //sTetromino
    [1, 2, displayWidth + 1, displayWidth * 2 + 1], //jTetromino
  ];

  function unDrawShape() {
    displaySquares.forEach((squares) => {
      squares.classList.remove('tetromino');
    });
  }

  // display the shape in the mini-grid display
  function displayShape() {
    unDrawShape();

    console.log(
      upNextTetrominoes,
      nextRandom,
      upNextTetrominoes[nextRandom],
      displaySquares
    );

    upNextTetrominoes[nextRandom].forEach((indexValue) =>
      displaySquares[displayIndex + indexValue].classList.add('tetromino')
    );
  }
});
