// document.addEventListener("DOMContentLoaded", function(event) {
  function setUpBoard (version) {
    var main = document.getElementsByTagName('main')[0];
    var boxNode = document.createElement('div');
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

    var TicTacToe = Object.create(TicTacToeParent);
      TicTacToe.childBoard = false;
      TicTacToe.isHighlighted = false;
      TicTacToe.setHighlight = function (state) {
        // this.isHighlighted = state;
      }

    function basicHash(nodeToAppend, ultimateHashIndex) {
      // creates a <table> element and a <tbody> element
      var tbl     = document.createElement("table");
      var tblBody = document.createElement("tbody");

      // creating all cells
      for (var i = 0; i < 3; i++) {
        // creates a table row
        var row = document.createElement("tr");

        for (var j = 0; j < 3; j++) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          var cell = document.createElement("td");
          var cellID = 'i'+ultimateHashIndex[0]+'-'+ultimateHashIndex[1]+'-'+i+"-"+j;
          var cellText = document.createTextNode(cellID);
          cell.setAttribute("class", "cell");
          cell.setAttribute("id", cellID);
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
    }

    function ultimateHash () {
      if (document.getElementById('ultimateTable')) {console.log("table exists"); return;};
      var ultimateTbl = document.createElement("table");
      ultimateTbl.setAttribute("id", "ultimateTable");
      var ultimateTblBody = document.createElement("tbody");

      for (var i = 0; i < 3; i++) {
        var ultimateRow = document.createElement("tr");

        for (var j = 0; j < 3; j++) {
           var ultimateCell = document.createElement("td");
           var ultimateCellID = 'i'+i+'-'+j;
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
    ultimateHash();
  }
// });



























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
