var element_size = 50, small_line = 2, large_line = 4, outer_margin = 6, inner_margin = 4;

function Rect(x, y, w, h, fill) {
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 1;
	this.h = h || 1;
	this.fill = fill || "#000000";
}

Rect.prototype.draw = function(ctx) {
	ctx.fillStyle = this.fill;
	ctx.fillRect(this.x, this.y, this.w, this.h);
};

Rect.prototype.drawPlayer1 = function(ctx) {
	ctx.save();

	ctx.translate(this.x, this.y);
	ctx.lineWidth = .1*Math.min(this.h, this.w);
	ctx.strokeStyle = "black";
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.moveTo(this.w*.1, this.h*.1);
	ctx.lineTo(this.w*.9, this.h*.9);
	ctx.moveTo(this.w*.1, this.h*.9);
	ctx.lineTo(this.w*.9, this.h*.1);
	ctx.stroke();

	ctx.restore();
}

Rect.prototype.drawPlayer2 = function(ctx) {
	ctx.save();

	ctx.strokeStyle = "black";
	ctx.lineWidth = .1*min(this.w, this.h);
	ctx.translate(this.x, this.y);
	var start = [this.w*.15, this.h/2];
	var stop = [this.w*.85, this.h/2];
	var control_point_high = this.h/30;
	var control_point_low = 29*this.h/30;
	ctx.beginPath();
	ctx.moveTo(start[0], start[1]);
	ctx.bezierCurveTo(start[0], control_point_high, stop[0], control_point_high, stop[0], stop[1]);
	ctx.bezierCurveTo(stop[0], control_point_low, start[0], control_point_low, start[0], start[1]);
	ctx.stroke();

	ctx.restore();
}

function MiniBoard(index) {
	this.row = Math.floor(index/3);
	this.col = index%3;
	this.size = 3*element_size + 2*small_line + 2*inner_margin;
	var diff = this.size + large_line;
	this.x = outer_margin + this.col*diff;
	this.y = outer_margin + this.row*diff;
	this.shape = new Rect(this.x, this.y, this.size, this.size, "green");
	this.elements = [];
	this.createElements();
}

MiniBoard.prototype.createElements = function() {
	var size = element_size + small_line;
	for (var i = 0; i < 9; i++) {
		var row = Math.floor(i/3), col = i%3;
		//var box = new Object();
		this.elements[i] = new Rect(
				this.x + inner_margin + col*size,
				this.y + inner_margin + row*size,
				element_size,
				element_size,
				"blue");
		//box.winner = n;
		//this.elements[i] = box;
	}
};

MiniBoard.prototype.fillElement = function(ctx, player, element) {
	if (player === 1) {
		this.elements[element].drawPlayer1(ctx);
	} else if (player === 2) {
		this.elements[element].drawPlayer2(ctx);
	} else {
		displayError();
	}
}

function CanvasBoard(canvas) {
	this.ctx = canvas.getContext("2d");
	this.shapes = [];
	this.createShapes();
}

CanvasBoard.prototype.createShapes = function() {
	for (var i = 0; i < 9; i++) {
		this.shapes[i] = new MiniBoard(i);
	}
};

CanvasBoard.prototype.drawGrid = function() {
	var start = inner_margin + outer_margin;
	var origin_diff = 3*element_size + 2*small_line + 2*inner_margin + large_line;
	var mini_length = 3*element_size + 2*small_line;
	var big_length = 9*element_size + 6*small_line + 2*large_line + 6*inner_margin;
	this.ctx.fillStyle = "black";

	for (var i = 0, mini_origin_x = start; i < 3; i++, mini_origin_x += origin_diff) {
		for (var j = 0, mini_origin_y = start; j < 3; j++, mini_origin_y += origin_diff) {
			for (var k = 1; k < 3; k++) {
				this.ctx.fillRect(
						mini_origin_x + k*element_size + (k - 1)*small_line,
						mini_origin_y,
						small_line,
						mini_length);
				this.ctx.fillRect(
						mini_origin_x,
						mini_origin_y + k*element_size + (k - 1)*small_line,
						mini_length,
						small_line);
			}
		}
		if (i > 0) {
			this.ctx.fillRect(
					mini_origin_x - inner_margin - large_line,
					outer_margin,
					large_line,
					big_length);
			this.ctx.fillRect(
					outer_margin,
					mini_origin_x - inner_margin - large_line,
					big_length,
					large_line);
		}
	}
};

CanvasBoard.prototype.drawMiniBoard = function() {
	for (var i = 0; i < 9; i++) {
		this.shapes[i].shape.draw(this.ctx);
	}
};

CanvasBoard.prototype.drawElements = function() {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			this.shapes[i].elements[j].draw(this.ctx);
		}
	}
};

function setUpCanvas() {
	var totalLength = 9*element_size + 6*small_line + 2*large_line + 2*outer_margin + 6*inner_margin;
	canvas = document.createElement("canvas");
	canvas.setAttribute("id", "board");
	canvas.setAttribute("width", totalLength.toString() + "px");
	canvas.setAttribute("height", totalLength.toString() + "px");
	document.body.appendChild(canvas);
}
