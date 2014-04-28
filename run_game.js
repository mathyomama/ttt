setUpCanvas();
canvas = document.getElementById("board");
myCanvasBoard = new CanvasBoard(canvas);
myCanvasBoard.drawGrid();
myCanvasBoard.drawMiniBoard();
myCanvasBoard.drawElements();
myCanvasBoard.drawGrid();
