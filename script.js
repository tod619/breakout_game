const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// Create Ball Properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

// Draw ball on canvas
function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x,ball.y,ball.size,0,Math.PI*2)
    ctx.fillStyle = "#0095dd"
    ctx.fill()
    ctx.closePath()
}

drawBall()


// EventListners

// Show rules
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
})

// Close rules
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show')
})