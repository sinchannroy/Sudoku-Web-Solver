var arr = [ [] , [] , [] , [] , [] , [] , [] , [] , [] ]
var temp = [ [] , [] , [] , [] , [] , [] , [] , [] , [] ]

for (var i = 0 ; i < 9 ; i++) {
    for (var j = 0 ; j < 9 ; j++) {
        arr [i] [j] = document.getElementById (i * 9 + j);

    }
}

function initializeTemp (temp) {

    for (var i = 0 ; i < 9 ; i++) {
        for (var j = 0 ; j < 9 ; j++) {
            temp [i] [j] = false;

        }
    }
}


function setTemp (board , temp) {

    for (var i = 0 ; i < 9 ; i++) {
        for (var j = 0 ; j < 9 ; j++) {
            if (board [i] [j] != 0) {
                temp [i] [j] = true;
            }

        }
    }
}


function setColor (temp) {

    for (var i = 0 ; i < 9 ; i++) {
        for (var j = 0 ; j < 9 ; j++) {
            if (temp [i] [j] == true) {
                arr [i] [j].style.color = "#DC3545";
            }

        }
    }
}

function resetColor() {

    for (var i = 0 ; i < 9 ; i++) {
        for (var j = 0 ; j < 9 ; j++) {

            arr [i] [j].style.color = "green";


        }
    }
}

var board = [ [] , [] , [] , [] , [] , [] , [] , [] , [] ]


let button = document.getElementById ('generate-sudoku')
let solve = document.getElementById ('solve')

console.log (arr)
function changeBoard (board) {
    for (var i = 0 ; i < 9 ; i++) {
        for (var j = 0 ; j < 9 ; j++) {
            if (board [i] [j] != 0) {

                arr [i] [j].innerText = board[i][j];
            }

            else
                arr [i] [j].innerText = '';
        }
    }
}


button.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse (xhrRequest.response)
        console.log (response)
        initializeTemp (temp)
        resetColor ()

        board = response.board
        setTemp (board, temp)
        setColor (temp)
        changeBoard (board)
    }
    xhrRequest.open ('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send ()
}

function isPossible(board, r, c, val) {
    //not repeating in the same row or column
    for (var i = 0 ; i < 9 ; i++) {
        if (board [i] [c] == val || board [r] [i] == val) {
            return false;
        }
    }

    //Subgrid
    var sx = r - r % 3;
    var sy = c - c % 3;

    for (var x = sx ; x < sx + 3; x++) {
        for (var y = sy ; y < sy + 3 ; y++) {
            if (board [x] [y] == val) {
                return false;
            }
        }
    }
    return true;

}

//Main function in which backtracking and recursion concept of DSA is used
function solveSudokuHelper (board, r, c) {
    
    //Base Case
    if (r == 9) {
        changeBoard(board);
        return true;
    }

    //Other Cases
    if (c == 9) {
        return solveSudokuHelper (board, r + 1, 0);
    }

    //Pre-filled cell, skip it
    if (board [r] [c] != 0) {
        return solveSudokuHelper(board, r, c + 1);
    }

    //there is a 0 in the current location
    for (var i = 1; i <= 9; i++) {
        if (isPossible (board, r, c, i)) {
            board [r] [c] = i;
            var success = solveSudokuHelper (board, r, c + 1);

            if (success == true) {
                return true;
            }

            //backtracking step
            board [r] [c] = 0;
        }
    }
    return false;

}

function solveSudoku (board) {
    solveSudokuHelper (board, 0, 0)
}

solve.onclick = function () {
    solveSudoku (board)

}