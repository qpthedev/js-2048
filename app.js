document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.querySelector("#score");
  const resultDisplay = document.querySelector("#result");
  const width = 4;

  let squares = [];
  let score = 0;
  let highScore = 0;

  function setColor(squares) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML != 0) {
        squares[i].style.color = "#f38181";
      } else if (squares[i].innerHTML == 0) {
        squares[i].style.color = "#cbf1f5";
      }
    }
  }

  function creatBoard() {
    let loadedHigh = localStorage.getItem("HighScore");
    // console.log(loadedHigh);
    highscore.innerHTML = loadedHigh;
    for (let i = 0; i < width * width; i++) {
      square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }

    generate();
    generate();

    setColor(squares);
  }

  creatBoard();

  function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      checkForGameOver();
    } else {
      generate();
    }
  }

  function swipeRight() {
    for (let i = 0; i < width * width; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;

        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);
        // console.log(filteredRow);

        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);

        let newRow = zeros.concat(filteredRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
    // setColor(squares);
  }

  function swipeLeft() {
    for (let i = 0; i < width * width; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;

        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);

        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);

        let newRow = filteredRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
    // setColor(squares);
  }

  function combineRow() {
    for (let i = 0; i < width * width - 1; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combindedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);

        squares[i].innerHTML = combindedTotal;
        squares[i + 1].innerHTML = 0;

        score += combindedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    // setColor(squares);
    checkForWin();
  }

  function swipeDown() {
    for (let i = 0; i < width; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;

      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredColumn);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
    // setColor(squares);
  }

  function swipeUp() {
    for (let i = 0; i < width; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;

      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = filteredColumn.concat(zeros);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
    // setColor(squares);
  }

  function combineColumn() {
    for (let i = 0; i < width * width - 4; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let combindedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + width].innerHTML);

        squares[i].innerHTML = combindedTotal;
        squares[i + width].innerHTML = 0;

        score += combindedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    // setColor(squares);
    checkForWin();
  }

  function control(event) {
    if (event.keyCode === 39) {
      keyRight();
    } else if (event.keyCode === 37) {
      keyLeft();
    } else if (event.keyCode === 38) {
      keyUp();
    } else if (event.keyCode === 40) {
      keyDown();
    }
  }
  document.addEventListener("keyup", control);

  function keyRight() {
    swipeRight();
    combineRow();
    swipeRight();
    generate();
    setColor(squares);
  }
  function keyLeft() {
    swipeLeft();
    combineRow();
    swipeLeft();
    generate();
    setColor(squares);
  }
  function keyDown() {
    swipeDown();
    combineColumn();
    swipeDown();
    generate();
    setColor(squares);
  }
  function keyUp() {
    swipeUp();
    combineColumn();
    swipeUp();
    generate();
    setColor(squares);
  }

  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = "You Win!";
        document.removeEventListener("keyup", control);
      }
    }
  }

  function checkForGameOver() {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++;
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = "You Lose!";
      highScore = score;
      highscore.innerHTML = highScore;
      localStorage.setItem("HighScore", score);
      document.removeEventListener("keyup", control);
    }
  }
});
