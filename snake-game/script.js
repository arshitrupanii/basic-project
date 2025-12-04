const board = document.querySelector(".board")
const TimerSpan = document.querySelector(".time")
const ScoreSpan = document.querySelector(".score")
const HighScoreSpan = document.querySelector(".highScore")

const blockWidth = 50
const blockHeight = 50

const cols = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)

let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols)
}

let Time = 0
let Score = 0
let HighScore = localStorage.getItem('SnakeGameHighScore') || 0
HighScoreSpan.innerHTML = HighScore


let SnakeInterval = null
let TimeInterval = null


let blocks = []


let snake = [{ x: 4, y: 5}]
let direction = 'right';


// add block in board and blocks array
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        
        const block = document.createElement("div");
        block.classList.add("block")
        // block.innerText = `${row}-${col}`
        board.appendChild(block);

        blocks[`${row}-${col}`] = block
    }
}


// clear snake for per frame render
function clearBoard() {
    Object.values(blocks).forEach(b => b.classList.remove("fill"))
}


// End game function
function endGame() {
    clearInterval(SnakeInterval)
    clearInterval(TimeInterval)

    if (Score > HighScore) {
        localStorage.setItem("SnakeGameHighScore", Score)
    }

    alert('Game over')
    location.reload()
}


// render snake according to blocks array
function snakeRender() {
    clearBoard()

    let head;

    // add food in board using random food location
    blocks[`${food.x}-${food.y}`].classList.add("food")

    // it direct snake location according to direction
    if (direction == 'left') head = { x: snake[0].x, y: snake[0].y - 1 }
    else if (direction == 'right') head = { x: snake[0].x, y: snake[0].y + 1 }
    else if (direction == 'up') head = { x: snake[0].x - 1, y: snake[0].y }
    else if (direction == 'down') head = { x: snake[0].x + 1, y: snake[0].y }

    // check that snake it not bite itself 
    // if bite snake itself then game over
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == head.x && snake[i].y == head.y) endGame()
    }

    // check if snake touch border of board and clear time out
    if (head.x < 0 || head.x >= rows || head.y >= cols || head.y < 0) endGame()


    // check food location and snake location match
    // it remove the food and add food in random location
    if (food.x == head.x && food.y == head.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food")

        // add into score 
        ScoreSpan.innerHTML = ++Score;

        // random food location
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
        blocks[`${food.x}-${food.y}`].classList.add("food")

        snake.push(food)
    }


    // it add head segment into array
    // it add head block of snake
    snake.unshift(head)

    // it remove last element of array
    // it remove last block of snake
    snake.pop()

    // it render snake
    snake.forEach((segment) => {
        const block = blocks[`${segment.x}-${segment.y}`]
        if (block) { block.classList.add("fill") }
    })

}

// Start here
SnakeInterval = setInterval(snakeRender, 400);

TimeInterval = setInterval(() => {
    let minutes = String(Math.floor(Time / 60));
    let seconds = String(Time % 60);

    // it add time string into span
    TimerSpan.innerHTML = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
    Time++
}, 1000)


// track arrow key 
addEventListener("keydown", (e) => {
    if (e.key == 'ArrowLeft' || e.key == 'a') direction = 'left'
    else if (e.key == 'ArrowUp' || e.key == 'w') direction = 'up'
    else if (e.key == 'ArrowDown' || e.key == 's') direction = 'down'
    else if (e.key == 'ArrowRight' || e.key == 'd') direction = 'right'
})