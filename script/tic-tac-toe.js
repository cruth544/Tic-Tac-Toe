// document.addEventListener("DOMContentLoaded", function(event) {
  var ultimateFlag;
  var player1;
  var player2;
  var board;

//player parent
  function Player (letter, color) {
    this.letter = letter;
    this.color = color;
    this.filledCells = {};
    this.squaresWon = [];
  }

  //turn logic
  var currentTurn = {
    turn: "X",
    getPlayer: function () {
      if (currentTurn.turn === "X") {
        return player1;
      } else {
        return player2;
      }
    },
    isTurnX: function () {
      return currentTurn.turn === "X";
    },
    changeTurns: function () {
      if (currentTurn.isTurnX()) {
        currentTurn.turn = "O";
      } else {
        currentTurn.turn = "X";
      }
      var footer = document.getElementsByTagName('footer')[0]
      footer.innerHTML = currentTurn.getPlayer().letter + "'s turn";
      footer.style.color = currentTurn.getPlayer().color;
    },
    turnText: function () {
      // if (currentTurn.getPlayer() === player1) {
        return currentTurn.getPlayer().letter + "'s turn";
      // }
    }
  }

  function fillCell (cell, player, ultimateId, smallId) {
    var cellText      = currentTurn.getPlayer().letter;
    cell.innerHTML    = cellText;
    cell.style.color  = currentTurn.getPlayer().color;
  }

  function drawLine (argument) {

  }

  function storeCell (player, ultimateId, smallId) {
    if (player[ultimateId]) {
      player[ultimateId].push(smallId);
    } else {
      player[ultimateId] = [smallId];
    }
    if (ultimateFlag) {
      board[ultimateId].push(smallId);
    }
  }

  //winning logic
  function checkWin (player, ultimateId, smallId) {
    //check to see if player has at least 3 moves in square
    if (player.filledCells[ultimateId].length > 2) {
      //check if either player has already won this square
      if  (player1.squaresWon.indexOf(ultimateId) === -1
        && player2.squaresWon.indexOf(ultimateId) === -1) {
        //check if player wins this square
        if (loopCheck(player.filledCells[ultimateId])) {
          if (!document.getElementById('ultimateTable')) {
            console.log("GAME OVER");
            return true;
          }

          winOverlayLetter(ultimateId, '.5');
          // var style       = window.getComputedStyle(div);
          // var letterColor = style.getPropertyValue('color');
          // letterColor     = letterColor.substring(letterColor.indexOf('(')+1,
          //                                         letterColor.indexOf(')'));
          // letterColor     = 'rgba(' + letterColor + ', .8'


          console.log(player.letter, "wins the box");
          //add sqaure to players won square
          player.squaresWon.push(ultimateId);

          //call function to show change

          //return wether or not player has won the game
          return loopCheck(player.squaresWon);
        }
      }
    }
  }

  function loopCheck (playerArray) {
    //first check for diagonals
    if (playerArray.length > 2) {
      if (playerArray.indexOf('11') > -1) {
        if  (playerArray.indexOf('00') > -1
          && playerArray.indexOf('22') > -1) {
          return true;
        } else if (playerArray.indexOf('20') > -1
                && playerArray.indexOf('02') > -1) {
          return true;
        }
      }
    }

    //next check if any row has 3
    var countFirst  = [0,0,0];
    var countSecond = [0,0,0];
    for (var i = 0; i < playerArray.length; i++) {
      countFirst[Number(playerArray[i].charAt(0))]++;
      countSecond[Number(playerArray[i].charAt(1))]++;
    }

    if  (countFirst.indexOf(3) > -1
      || countSecond.indexOf(3) > -1) {
      return true;
    }
    return false;
  }

//check if all sqaures are filled
  function specialValidSquareCase (smallId) {
    if (ultimateFlag) {
      return board[smallId].length === 9;
    }
    return true;
  }

  //next available board logic
  function isValidSquare (ultimateId, smallId) {
    //check if its the first move of the game
    if (!ultimateFlag) {
      return true;
    }
    if (Object.keys(player1.filledCells).length === 0) {
      return true;
    }
    if (specialValidSquareCase(smallId)) {
      return true;
    }
      var arrayOfUltimateCells = document.getElementsByClassName('ultimateCell');
      for (var i = 0; i < arrayOfUltimateCells.length; i++) {
        var style = window.getComputedStyle(arrayOfUltimateCells[i]);
        if (style.getPropertyValue('background-color') === 'rgb(255, 255, 255)') {
          if (arrayOfUltimateCells[i].getAttribute('id').replace(/i/g, '').replace(/-/g, '') === ultimateId) {
            return true;
          }
        }
      }
      return false;
  }

  function setCellBackground (smallId, specialCase) {
    var arrayOfUltimateCells = document.getElementsByClassName('ultimateCell');
    var color = "rgba(150, 150, 150, .6)";
    if (specialCase) {
      color = "white";
    }
    for (var i = 0; i < arrayOfUltimateCells.length; i++) {
      if (arrayOfUltimateCells[i].getAttribute('id').replace(/i/g, '').replace(/-/g, '') === smallId) {
        arrayOfUltimateCells[i].style.backgroundColor = 'white';
      } else {
        arrayOfUltimateCells[i].style.backgroundColor = color;
      }
    }
  }


  //win function
  function winner (player) {
    var cells             = document.getElementsByClassName('cell');
    var footer            = document.getElementsByTagName('footer')[0];
    footer.innerHTML      = "Congratulations " + player.letter + "!!!";
    footer.style.color    = player.color;
    footer.style.fontSize = '48px';

    winOverlayLetter('UltOverlay', '.8');

    for (var i = 0; i < cells.length; i++) {
      cells[i].removeAttribute('onClick');
    };
    // if (ultimateFlag) {

    // } else {

    // }
  }

  function winOverlayLetter (id, opacity) {
    var div           = document.getElementById('div'+id);
    if (!ultimateFlag) {
      div             = document.getElementsByClassName('winnerDiv')[0];
    }
    div.innerHTML     = currentTurn.turn;
    div.style.color   = currentTurn.getPlayer().color;
    div.style.opacity = opacity;
  }

  //what happens when a cell is clicked
  function cellWasClicked (cell) {
    //first check if cell has been taken
    if (!cell.innerHTML) {
      var player      = currentTurn.getPlayer();
      var id          = cell.getAttribute('id');
      var ultimateId  = id.replace(/i/g, '').split('/')[0];
      var smallId     = id.split('/')[1];
      // console.log(cell.getAttribute("id"), "was clicked")

      //check if square is in next valid square
      if (isValidSquare(ultimateId, smallId)) {
        //fill cell first, then set background color, then store
        //in order for special case logic
        fillCell(cell, player, ultimateId, smallId);
        setCellBackground(smallId, specialValidSquareCase(smallId));
        storeCell(player.filledCells, ultimateId, smallId);
        if (checkWin(player, ultimateId, smallId)) {
          winner(player);
          setCellBackground(smallId, true);
          console.log(player.letter, 'WINS THE GAME!');
          return;
        }

        currentTurn.changeTurns();
      }
    }
  }

  function setUpFooter (winFlag) {
    var footer            = document.getElementsByTagName('footer')[0];
    var player            = currentTurn.getPlayer();

    if (winFlag) {
      var footer            = document.getElementsByTagName('footer')[0];
      footer.innerHTML      = player.letter + " WINS!";
      footer.style.color    = player.color;
      footer.style.fontSize = '48px';
    } else {
      footer.style.color    = player.color;
      footer.style.fontSize = '24px';
      footer.innerHTML      = currentTurn.turnText();
    }

  }

  function clearPlayerSquares () {
    player1.filledCells = {};
    player1.squaresWon = [];
    player2.filledCells = {};
    player2.squaresWon = [];
  }

  function resetBoard () {
    if (!document.getElementById('start-screen')) {
      if (confirm("Are you sure you want to reset?")) {
        setUpBoard(ultimateFlag);
        //reset footer message
        setUpFooter(false);
        clearPlayerSquares();

      }
    }
  }

  function firstSetUp () {
    var main          = document.getElementById('mainBoard');
    var setUpDiv      = document.getElementById('start-screen');
    var firstPlayer   = document.getElementById('firstPlayer').value.toUpperCase();
    var secondPlayer  = document.getElementById('secondPlayer').value.toUpperCase();
    var firstColor    = document.getElementById('firstColor').value;
    var secondColor   = document.getElementById('secondColor').value;
    ultimateFlag      = document.getElementById('ultimateFlag').checked;


    if ( firstPlayer && secondPlayer) {
      if (firstPlayer !== secondPlayer) {
        if (firstColor !== secondColor) {
          main.removeChild(document.getElementById('start-screen'));
          setUpBoard(ultimateFlag, firstPlayer, secondPlayer, firstColor, secondColor);
        } else {
          alert("Please choose different colors.");}
      } else {
        alert("Please choose different Player letters.");}
    } else {
      alert("Please fill out both fields.");}
  }

  function setUpBoard (flag, firstPlayer, secondPlayer, firstColor, secondColor) {
    var main  = document.getElementById('mainBoard');
    if (main.children[0]) {
      main.removeChild(main.children[0]);
    }

    //create div to overlay cells with the winner
      function winnerOverlayBox (divID) {
        var div = document.createElement('div');
        divID   = divID.join('').replace(/i/g, '');

        // div.appendChild(drawingPad);
        div.setAttribute('class', 'winnerDiv');
        div.setAttribute('id',    'div' + divID);
        div.style.position        = 'absolute';
        div.style.height          = '100%';
        div.style.width           = '100%';
        div.style.top             = '0';
        div.style.left            = '0';
        div.style.zIndex          = '10';
        div.style.pointerEvents   = 'none';
        if (!ultimateFlag) {
          div.style.marginTop     = '94px';
        }

        return div;
      }

    function basicHash(nodeToAppend, ultimateHashIndex) {

      // creates a <table> element and a <tbody> element
      var tbl     = document.createElement("table");
      var tblBody = document.createElement("tbody");

      tblBody.style.position = 'relative';

      if (!flag) {
        tbl.style.margin = "50px auto"
      }

      // creating all cells
      for (var i = 0; i < 3; i++) {
        // creates a table row
        var row = document.createElement("tr");
        row.setAttribute("class", "cellRow");

        // board[ultimateHashIndex.join('')].push([]);

        for (var j = 0; j < 3; j++) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          var cell      = document.createElement("td");
          var cellID    = 'i'+ultimateHashIndex[0]+ultimateHashIndex[1]+'/'+i+j;
          var cellText  = document.createTextNode("");
          cell.setAttribute("class", "cell");
          cell.setAttribute("id", cellID);
          cell.setAttribute("onClick", "cellWasClicked(this)")

          // set up board obj
          // board[ultimateHashIndex.join('')][i].push(0);

          cell.appendChild(cellText);
          row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
      }

      // put the <tbody> in the <table>
      tbl.appendChild(tblBody);
      tbl.appendChild(winnerOverlayBox(ultimateHashIndex));
      // appends <table> into <body>
      nodeToAppend.appendChild(tbl);
      // sets the border attribute of tbl to 2;
      // tbl.setAttribute("border", "2");
      if (!player1 || !player2) {
        player2 = new Player(secondPlayer.toUpperCase(), secondColor);
        player1 = new Player( firstPlayer.toUpperCase(), firstColor );
      }
    }

    function ultimateHash () {
      // if (document.getElementById('ultimateTable')) {
      //     main.removeChild(document.getElementById('ultimateTable'));
      // }

      var ultimateTbl = document.createElement("table");
      ultimateTbl.setAttribute("id", "ultimateTable");
      var ultimateTblBody = document.createElement("tbody");

      //initialize board obj
      board = {};

      for (var i = 0; i < 3; i++) {
        var ultimateRow = document.createElement("tr");

        for (var j = 0; j < 3; j++) {

          var ultimateCell    = document.createElement("td");
          var ultimateCellID  = 'i'+i+'-'+j;

          //add large cell to board
          board[''+i+j] = [];

          ultimateCell.setAttribute("class", "ultimateCell");
          ultimateCell.setAttribute("id", ultimateCellID);
          ultimateCell.style.position = "relative";

          //adds smaller board into ultimate cell
          basicHash(ultimateCell, [i,j]);
          ultimateRow.appendChild(ultimateCell);
         }

         ultimateTblBody.appendChild(ultimateRow);
      }

      ultimateTblBody.appendChild(winnerOverlayBox(['UltOverlay', '']));
      ultimateTbl.appendChild(ultimateTblBody);
      main.appendChild(ultimateTbl);

    }

    if (flag) {
      ultimateHash();
    } else {
      basicHash(main, ["", ""]);
    }
    setUpFooter(false);
  }










