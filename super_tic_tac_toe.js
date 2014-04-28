var x = "x", o = "o", n = "n", cat = "cat";

function BigBoard() {
	this.open = true;
	this.value = n;
	this.board = [];
	for (var i = 0; i < 9; i++) {
		this.board[i] = new LittleBoard();
	}
}

BigBoard.prototype.checkWinner = function() {
	game_board = this.board;
	function checkRow(row) {
		var value, oldValue;
		for (var i = 0; i < 3; i++) {
			value = game_board[3*row + i].value;
			if ((value === n || value !== oldValue) && i !== 0) {
				return false;
			} else {
				oldValue = value;
			}
		}
		return true;
	}

	function checkCol(col) {
		var value, oldValue;
		for (var i = 0; i < 3; i++) {
			value = game_board[3*i + col].value;
			if ((value === n || value !== oldValue) && i !== 0) {
				return false;
			} else {
				oldValue = value;
			}
		}
		return true;
	}

	function checkDiag(diag) {
		var value, oldValue;
		var d = diag%2 ? -1 : 1;
		for (var i = -1; i < 2; i++) {
			value = game_board[4 + (3 + (-1)*d)*i];
			if ((value === n || value !== oldValue) && i !== 0) {
				return false;
			} else {
				oldValue = value;
			}
		}
		return true;
	}

	function checkCompletion() {
		for (var i = 0; i < 9; i++) {
			if (game_board[i].value === n) {
				return false;
			}
		}
		return true;
	}

	var winner = n;
	for (var i = 0; i < 3; i++) {
		if (checkRow(i)) {
			this.value = game_board[3*i].value;
			winner = this.value;
			this.open = false;
		} else if (checkCol(i)) {
			this.value = game_board[i].value;
			winner = this.value;
			this.open = false;
		} else if (i < 2 && checkDiag(i)) {
			this.value = game_board[2*i].value;
			winner = this.value;
			this.open = false;
		}
	}

	if (winner !== n) {
		return true;
	}

	if (checkCompletion() && winner === n) {
		//counting the number of x, o, and cat games
		var xCount = 0, oCount = 0, catCount = 0;
		for (var i = 0; i < 9; i++) {
			value = game_board[i].value;
			if (value === x) {
				xCount += 1;
			} else if (value === o) {
				oCount += 1;
			} else {
				catCount += 1;
			}
		}
		if (xCount > oCount) {
			this.value = x;
			winner = this.value;
		} else if (xCount < oCount) {
			this.value = o;
			winner = this.value;
		} else {
			this.value = cat;
			winner = this.value;
		}
		return true;
	}

	return false;
}

function LittleBoard() {
	this.open = true;
	this.value = n;
	this.board = []; //Setting up the board
	for (var i = 0; i < 9; i++) {
		this.board[i] = n;
	}
}

LittleBoard.prototype.placeX = function(position) {
	if (this.open && this.board[position] === n) {
		this.board[position] = x;
	} else {
		console.log("This spot is already taken.");
	}
	if (this.checkWinner()) {
		console.log("The winner is " + this.value);
	}
	this.printBoard();
};

LittleBoard.prototype.placeO = function(position) {
	if (this.open && this.board[position] === n) {
		this.board[position] = o;
	} else {
		console.log("This spot is already taken.");
	}
	if (this.checkWinner()) {
		console.log("The winner is " + this.value);
	}
	this.printBoard();
};

LittleBoard.prototype.printBoard = function() {
	/*for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			console.log(this.board[3*i + j]);
		}
	}*/
	console.log(this.board[0], this.board[1], this.board[2], this.board[3], this.board[4], this.board[5], this.board[6], this.board[7], this.board[8]);
};

LittleBoard.prototype.checkWinner = function() {
	//This checks to see if the given row is a winning row
	game_board = this.board;
	function checkRow(row) {
		var ch, old;
		for (var i = 0; i < 3; i++) {
			ch = game_board[3*row + i];
			if ((ch === n || ch !== old) && i !== 0) {
				return false;
			} else {
				old = ch;
			}
		}
		console.log("The row is " + row);
		return true;
	}

	//This checks to see if the given col is a winning col
	function checkCol(col) {
		var ch, old;
		for (var i = 0; i < 3; i++) {
			ch = game_board[3*i + col];
			if ((ch === n || ch !== old) && i !== 0) {
				return false;
			} else {
				old = ch;
			}
		}
		console.log("The col is " + col);
		return true;
	}

	//This checks to see if the given diag is a winning diag
	function checkDiag(diag) {
		var ch, old;
		var d = diag%2 ? -1 : 1;
		for (var i = -1; i < 2; i++) {
			ch = game_board[4 + (3 + (-1)*d)*i];
			if ((ch === n || ch !== old) && i !== -1) {
				return false;
			} else {
				old = ch;
			}
		}
		console.log("The diag is " + diag);
		return true;
	}

	//This checks to see if the board is complete in order to determine if the board is at a cats game/stalemate
	function checkCompletion() {
		for (var i = 0; i < 9; i++) {
			if (game_board[i] === n) {
				return false;
			}
		}
		return true;
	}

	var winner = n;
	//Checking for the winning three-in-a-row and returning the winner
	for (var i = 0; i < 3; i++) {
		if (checkRow(i)) {
			this.value =  this.board[3*i];
			winner = this.value;
			this.open = false;
		} else if (checkCol(i)) {
			this.value = this.board[i];
			winner = this.value;
			this.open = false;
		} else if (i < 2 && checkDiag(i)) {
			this.value = this.board[2*i];
			winner = this.value;
			this.open = false;
		}
	}

	if (winner !== n) {
		return true;
	}

	if (checkCompletion() && this.value === n) {
		this.value = cat;
		this.open = false;
		return true;
	}

	return false;
}

function OtherBoard() {
	this.open = true;
	this.winner = "n";
	var board = [];
	for (var i = 0; i < 9; i++) {
		board[i] = "n";
	}

	this.placeX = function(position) {
		board[position] = "x";
	};

	this.placeO = function(position) {
		board[position] = "o";
	};

	this.printBoard = function() {
		for (item in board) {
			console.log(board[item]);
		}
	};
}

function Game() {
	this.board = new BigBoard();
	this.currentBoard = null;
	this.currentPlayer = null;
	this.currentMove = [null, null]//0th position will be the board and 1st will be the position in that board
	this.winner = n;
	this.totalMoves = 0;
}

Game.prototype.startGame = function() {
	this.currentPlayer = x;
	this.totalMoves = 0;
}

function game() {
	var myGame = new LittleBoard();
	myGame.placeX(0);
	myGame.placeO(0);
	myGame.placeO(2);
	myGame.placeX(3);
	myGame.placeO(6);
	myGame.placeX(4);
	myGame.placeO(8);
	myGame.placeX(7);
	myGame.placeO(5);
}
