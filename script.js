const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let score = 0

const brickRowCount = 9
const brickColumnCount = 5

// Create Ball Properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

// Create Paddle Properties
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height -20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
    
}

// Create Brick Properties
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

// Create Bricks
const bricks = []
for(let i = 0; i < brickRowCount; i++){
    bricks[i] = []
    for(let j = 0; j < brickColumnCount; j++){
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
        bricks[i][j] = {x, y, ...brickInfo}
    }
}

// Draw ball on canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x,ball.y,ball.size,0,Math.PI*2)
    ctx.fillStyle = "#0095dd"
    ctx.fill()
    ctx.closePath()
}

// Draw Paddle on canvas
function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#0095dd'
    ctx.fill()
    ctx.closePath()
}

// Draw score on canvas
function drawScore() {
    ctx.font = '20px Arial'
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

// Draw Bricks on canvas
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent'
            ctx.fill()
            ctx.closePath()
        })
    })
}

// Move Paddle on Canvas
function movePaddle() {
    paddle.x += paddle.dx

    // Wall Detection
    if(paddle.x + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w
    }

    if(paddle.x < 0) {
        paddle.x = 0
    }
}

// Move Ball on Canvas
function moveBall() {
    ball.x += ball.dx
    ball.y += ball.dy

    // Set Wall Collisions for Right/Left
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1
    }

    // Set Wall Collisions for Top/Bottom
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0){
        ball.dy *= -1
    }

    // Paddle Collision
    if(ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed
    }

    // Brick Collision
    bricks.forEach(column => {
        column.forEach(brick => {
            if(brick.visible) {
                if(ball.x - ball.size > brick.x && ball.x + ball.size < brick.x + brick.w && 
                    ball.y + ball.size > brick.y && ball.y - ball.size < brick.y + brick.h){
                        ball.dy *= -1
                        brick.visible = false
                        increaseScore()
                    }
            }
        })
    })

    // If ball hits bottom wall Lose condtition
    if(ball.y + ball.size > canvas.height){
        showAllBricks()
        score = 0
    }
}

// Create a function to increase the score
function increaseScore() {
    score++

    if(score % (brickRowCount * brickColumnCount) === 0){
        showAllBricks()
    }
    
}

// Make all bricks appear again
function showAllBricks(){
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true
        })
    })
}

// Draw Everything
function draw() {
    // Clear context
    ctx.clearRect(0,0,canvas.width,canvas.height)


    drawBall()
    drawPaddle()
    drawScore()
    drawBricks()
}

// Update Canvas Drawing And Animation
function update() {

    // move paddle
    movePaddle()

    // move the ball
    moveBall()

    // Draw Everything
    draw()

    requestAnimationFrame(update)
}

update()

// KeyDown event
function keyDown(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed
    } else if(e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = paddle.speed * -1
    }
}

// KeyUp event
function keyUp(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = 0
    }
}

// Keyboard Event handlers
document.addEventListener('keydown',keyDown)
document.addEventListener('keyup',keyUp)


// EventListners

// Show rules
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
})

// Close rules
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show')
})