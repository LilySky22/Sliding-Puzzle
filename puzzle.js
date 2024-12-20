var rows = 3;
var columns = 3;

var currTile;
var otherTile; // blank tile

var turns = 0;

// Image order with "3.png" as the blank tile
var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"]; 

window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // Create an image element for each tile
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".png";

            // Make images draggable
            tile.setAttribute("draggable", true);

            // Add drag event listeners
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
};

function dragStart(e) {
    currTile = this;
    e.dataTransfer.setData("text/plain", this.id);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
    // Optional: Add styling for when a tile is dragged over
}

function dragDrop(e) {
    e.preventDefault();
    otherTile = this;

    // Ensure the other tile is the blank tile ("3.png")
    if (!otherTile.src.includes("3.png")) {
        return;
    }

    // Get the row and column of the current and other tiles
    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    // Check if the tiles are adjacent
    let moveLeft = r === r2 && c2 === c - 1;
    let moveRight = r === r2 && c2 === c + 1;
    let moveUp = c === c2 && r2 === r - 1;
    let moveDown = c === c2 && r2 === r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        // Swap the tiles' sources
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        // Increment the turn counter
        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
}

function dragEnd() {
    // Logic for after dragging ends
}