var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
var correctOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]; // Correct order of tiles

window.onload = function() {
    // Randomize the board with the imgOrder
    shuffle(imgOrder);
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".png";

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (!otherTile) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;

    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;

        checkWin(); // Check if the puzzle is solved after every move
    }
}

// Shuffle function to randomize the order of the tiles at the start
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Check if the puzzle is solved
function checkWin() {
    let isSolved = true;
    let tiles = document.querySelectorAll("#board img");

    // Check if the tiles are in the correct order
    tiles.forEach((tile, index) => {
        let expectedImg = correctOrder[index] + ".png"; // Correct image for this position
        if (tile.src.indexOf(expectedImg) === -1) {
            isSolved = false;
        }
    });

    if (isSolved) {
        // Display the "You won!" message and the number of turns
        setTimeout(() => {
            showWinModal(); // Show win modal
        }, 100); // Small delay to ensure the last move is completed
    }
}

// Show the win modal
function showWinModal() {
    document.getElementById("winTurns").innerText = turns;
    document.getElementById("winModal").style.display = "block";
}

// Close the win modal
function closeWinModal() {
    document.getElementById("winModal").style.display = "none";
    resetPuzzle(); // Reset puzzle after closing the modal
}

// Optional: Reset the puzzle when the game is won
function resetPuzzle() {
    turns = 0;
    document.getElementById("turns").innerText = turns;
    imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"]; // Reset the image order to start fresh
    shuffle(imgOrder); // Randomize the board
    document.getElementById("board").innerHTML = ''; // Clear the board
    window.onload(); // Reload the game with the initial tile arrangement
}
