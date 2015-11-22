// document.addEventListener("DOMContentLoaded", function(event) {
  var playerX;
  var playerO;

  //turn logic
  var currentTurn = {
    turn: "X",
    getPlayer: function () {
      if (currentTurn.turn === "X") {
        return playerX;
      } else {
        return playerO;
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
    }
  }

  var board;

  function fillCell (cell, player, ultimateId, smallId) {
    var cellText = currentTurn.getPlayer().letter;
    cell.innerHTML = cellText;
    cell.style.color = currentTurn.getPlayer().color;

    //fill board obj
    if (player === playerX) {
      board[ultimateId][smallId.charAt(0)][smallId.charAt(1)]++;
    } else {
      board[ultimateId][smallId.charAt(0)][smallId.charAt(1)]--;
    }

    // var arrayToPush = cell.getAttribute('id').replace(/i/g, '');
    // currentTurn.getPlayer().filledCells.push(arrayToPush);
  }

  function storeCell (cell, player, ultimateId, smallId) {
    if (player[ultimateId]) {
      player[ultimateId].push(smallId);
    } else {
      player[ultimateId] = [smallId];
    }
  }

  //winning logic
  function checkWin (cell, player, ultimateId, smallId) {
    if (player.filledCells[ultimateId].length > 2) {
      if (playerX.squaresWon.indexOf(ultimateId) === -1 && playerO.squaresWon.indexOf(ultimateId) === -1) {
        if (loopCheck(player.filledCells[ultimateId])) {
          console.log(player.letter, "wins!");
          player.squaresWon.push(ultimateId);
          //call function to show change
          return loopCheck(player.squaresWon);
        }
      }
    }
  }

  function loopCheck (playerArray) {
    //first check for diagonals
    if (playerArray.length > 2) {
      if (playerArray.indexOf('11') > -1) {
        if (playerArray.indexOf('00') > -1 && playerArray.indexOf('22') > -1) {
          return true;
        } else if (playerArray.indexOf('20') > -1 && playerArray.indexOf('02') > -1) {
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

    if (countFirst.indexOf(3) > -1 || countSecond.indexOf(3) > -1) {
      return true;
    }
    return false;
  }

//player parent
  function Player (letter, color) {
    this.letter = letter;
    this.color = color;
    this.filledCells = {};
    this.squaresWon = [];
  }

  //what happens when a cell is clicked
  function cellWasClicked (cell) {
    if (!cell.innerHTML) {
      var player = currentTurn.getPlayer();
      var id = cell.getAttribute('id');
      var ultimateId = id.replace(/i/g, '').split('/')[0];
      var smallId = id.split('/')[1];
      // console.log(cell.getAttribute("id"), "was clicked")
      fillCell(cell, player, ultimateId, smallId);
      storeCell(cell, player.filledCells, ultimateId, smallId);
      if (checkWin(cell, player, ultimateId, smallId)) {
        console.log(player.letter, 'WINS THE GAME!');
      }


      currentTurn.changeTurns();
    }
  }

  var TicTacToeParent = function () {
    this.state = false;
    this.location = null;
    this.setState = function (player) {
      // this.state = player;
    }
    this.setLocation = function (location) {
      //this.location = location;
    }
  }
  var Cell = Object.create(TicTacToeParent);
    Cell.wasClicked = function (player) {
        //set click state
    }
    Cell.tableCell = document.createElement('td');
    Cell.tableCell.addEventListener('click', function () {this.wasClicked();})

  function setUpBoard (flag) {
    var main = document.getElementsByTagName('main')[0];

    function basicHash(nodeToAppend, ultimateHashIndex) {
      // creates a <table> element and a <tbody> element
      var tbl     = document.createElement("table");
      var tblBody = document.createElement("tbody");

      // creating all cells
      for (var i = 0; i < 3; i++) {
        // creates a table row
        var row = document.createElement("tr");
        row.setAttribute("class", "cellRow");

        board[ultimateHashIndex.join('')].push([]);

        for (var j = 0; j < 3; j++) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          var cell = document.createElement("td");
          var cellID = 'i'+ultimateHashIndex[0]+ultimateHashIndex[1]+'/'+i+j;
          var cellText = document.createTextNode("");
          cell.setAttribute("class", "cell");
          cell.setAttribute("id", cellID);
          cell.setAttribute("onClick", "cellWasClicked(this)")

          // set up board obj
          board[ultimateHashIndex.join('')][i].push(0);

          cell.appendChild(cellText);
          row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
      }

      // put the <tbody> in the <table>
      tbl.appendChild(tblBody);
      // appends <table> into <body>
      nodeToAppend.appendChild(tbl);
      // sets the border attribute of tbl to 2;
      // tbl.setAttribute("border", "2");
      playerX = new Player("X", "red");
      playerO = new Player("O", "blue");
    }

    function ultimateHash () {
      if (document.getElementById('ultimateTable')) {
        if (confirm("Are you sure you want to reset?")) {
          main.removeChild(document.getElementById('ultimateTable'));
        } else {
          return;
        }
      }
      var ultimateTbl = document.createElement("table");
      ultimateTbl.setAttribute("id", "ultimateTable");
      var ultimateTblBody = document.createElement("tbody");
      board = {};

      for (var i = 0; i < 3; i++) {
        var ultimateRow = document.createElement("tr");

        for (var j = 0; j < 3; j++) {

          var ultimateCell = document.createElement("td");
          var ultimateCellID = 'i'+i+'-'+j;
          board[''+i+j] = [];
          ultimateCell.setAttribute("class", "ultimateCell");
          ultimateCell.setAttribute("id", ultimateCellID);
          basicHash(ultimateCell, [i,j]);
          ultimateRow.appendChild(ultimateCell);
         }

         ultimateTblBody.appendChild(ultimateRow);
      }

      ultimateTbl.appendChild(ultimateTblBody);
      main.appendChild(ultimateTbl);

    }
    if (flag) {
      ultimateHash();
    } else {
      basicHash(main, ["", ""]);
    }
  }
// });

setUpBoard(true);
















  // function checkWin (cell, player, ultimateId, smallId) {
  //   if (playerX.squaresWon.indexOf(ultimateId) === -1 && playerO.squaresWon.indexOf(ultimateId) === -1) {
  //     if (player.filledCells[ultimateId].length > 2) {
  //       var countFirst  = [0,0,0];
  //       var countSecond = [0,0,0];
  //       for (var i = 0; i < player.filledCells[ultimateId].length; i++) {
  //         countFirst[Number(player.filledCells[ultimateId][i].charAt(0))]++;
  //         countSecond[Number(player.filledCells[ultimateId][i].charAt(1))]++;
  //       }

  //       if (countFirst.indexOf(3) > -1 || countSecond.indexOf(3) > -1) {
  //         player.squaresWon.push(ultimateId);
  //         console.log(player.letter, "wins!");
  //       }
  //       for (var i = 0; i < countFirst.length; i++) {
  //         countFirst[i]--;
  //         countSecond[i]--;
  //       }
  //       if (countFirst.indexOf(0) > -1 && countSecond.indexOf(0) > -1 && countFirst.indexOf(-1) < 0 && countSecond.indexOf(-1) < 0 && player.filledCells[ultimateId].indexOf('11') > -1) {
  //         console.log(player.letter, "wins!");
  //       }
  //     }
  //   }
  // }



    // function loopBoard (version) {
    //   var divString = '<div id="bigBoard" class="hash"><br>\n';
    //   for (var i = 0; i < 9; i++) {
    //     divString += '<div class="hash bigger" id="[' + i + ']">\n';
    //     if (i % 3 === 0) {
    //       divString += '<br>\n';
    //     };
    //     for (var j = 0; j < 9; j++) {
    //       divString += '<div class="hash inner" id="[' + i + '][' + j + ']"></div>\n';
    //       if (j % 3 === 0) {
    //         divString += '<br>\n';
    //       }
    //     }
    //     divString += '</div>\n';
    //   }
    //   divString += '</div>\n';
    //   return divString;
    // }
    // main.innerHTML = loopBoard();
