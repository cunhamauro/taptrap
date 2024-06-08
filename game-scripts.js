//############# Developed by Mauro Cunha #############//

///// Text Animation Scripts /////

const animateText = document.getElementById('animate-text');
const text = animateText.textContent;
const textAnimateLength = text.length;

// Span and ID text
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('animate-text');
    const text = textElement.textContent;
    textElement.innerHTML = '';

    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.id = 'S' + index; // Span IDs (S0, S1, S2, ...)
        textElement.appendChild(span);
    });

    startAnimation();
});

// Animate text
function startAnimation() {
    setInterval(() => {
        for (let i = 0; i < textAnimateLength; i++) {
            document.getElementById("S" + i).style.color = "white";
        }

        let randomLetterIndex = Math.floor(Math.random() * textAnimateLength);
        let randomSpan = "S" + randomLetterIndex;

        document.getElementById(randomSpan).style.color = "red";

    }, 600);
}

///// Generate Table //////

function generateTable(rows, cols) {
    const tableBody = document.getElementById('game-table-body');

    let cellId = 1;
    for (let row = 0; row < rows; row++) {
        const tr = document.createElement('tr');

        for (let col = 0; col < cols; col++) {
            const td = document.createElement('td');
            td.id = cellId;
            td.onclick = (function (id) {
                return function () { handleCellClick(id); };
            })(cellId);
            tr.appendChild(td);
            cellId++;
        }

        tableBody.appendChild(tr);
    }
}

/////// Game Scripts ////////

let cells = [...Array(81).keys()].map(x => x + 1);

const MS_PER_CELL = 1600;
let currentRedCell = null;
let interval;
let gameOn = false;

// Select random cell that was not conquered
function selectRandomCell() {
    let randomIndexCell = Math.floor(Math.random() * cells.length);
    return cells[randomIndexCell];
}

// Color cell red
function colorCellRed(cellId) {
    document.getElementById(cellId).style.backgroundColor = "red";
    currentRedCell = cellId;
}

// Reset cell if not conquered on time
function resetCellColor(cellId) {
    document.getElementById(cellId).style.backgroundColor = "white";
    currentRedCell = null;
}

// Track cell click
function handleCellClick(cellId) {
    if (cellId === currentRedCell) {
        conquerCell(cellId);
    }
}

// Conquer cell
function conquerCell(cellId) {
    let index = cells.indexOf(cellId);
    cells.splice(index, 1);

    document.getElementById(cellId).style.backgroundColor = "black";
    currentRedCell = null;
}

// Game loop
function gameLoop() {
    if (cells.length == 0) {
        clearInterval(interval);
        alert("The game was conquered!");
        return;
    }
    if (currentRedCell != null) {
        resetCellColor(currentRedCell);
    }
    let randomCellId = selectRandomCell();
    colorCellRed(randomCellId);

    let timeToConquer = (cells.length / 81) * MS_PER_CELL;
    setTimeout(() => {
        if (currentRedCell == randomCellId) {
            resetCellColor(randomCellId);
        }
    }, timeToConquer);
}

// Game start
function gameStart() {
    if (gameOn == false) {
        gameOn = true;
        interval = setInterval(gameLoop, MS_PER_CELL + 100);
    }
    else {
        alert("Game is on! Never give up!");
    }
}
