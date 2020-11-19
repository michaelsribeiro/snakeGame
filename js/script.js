let scoreText = document.getElementById("score");
let score = 0;
let highscore = localStorage.getItem("highscore");
let highscoreText = document.getElementById("highscore");
highscoreText.innerText = highscore;
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

//Create the Unit
let box = 32;

//Create the snake
let snake = [];
snake[0] = {
    x: 4 * box,
    y: 4 * box
}

//Load Images
const foodImg = new Image();
foodImg.src = "images/food.png";

//Load audio
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3"
eat.src = "audio/eat.mp3"
up.src = "audio/up.mp3"
left.src = "audio/left.mp3"
right.src = "audio/right.mp3"
down.src = "audio/down.mp3"

//Create the food
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}   

var gameOver = "Game Over!";

//Initial direction movement
let direction = "down";

//Create button startBtn
let startBtn = document.getElementById("startBtn");   

//Initialize the game after 1 second.
setTimeout(function(){    
    startBtn.onclick = function(){  
        let jogo = setInterval(iniciarJogo, 100);
    }

}, 1000);

//Draw the Background
function criarBG(){
    context.fillStyle= "#252e38";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Draw the snake
function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = (i == 0)? "#f2bb13" : "white";
        context.fillRect(snake[i].x,snake[i].y,box,box);
        
        //Draw the yellow line
        context.strokeStyle = "#f2bb13";
        context.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    //Draw the food and show the score
    context.drawImage(foodImg, food.x, food.y);
}

document.addEventListener('keydown', update);

//Keyboard evens - Control the snake
function update (event){
    if(event.keyCode == 37 && direction != "right"){
        left.play();
        direction = "left";
    }else if(event.keyCode == 38 && direction != "down"){
        up.play();
        direction = "up";
    }else if(event.keyCode == 39 && direction != "left"){
        right.play();
        direction = "right";
    }else if(event.keyCode == 40 && direction != "up"){
        down.play();
        direction = "down";
    }
}

function iniciarJogo(){

    if(snake[0].x > 15 * box && direction == "rigth") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //If snake colision, game over.
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){ 
            context.fillStyle = "red";
            context.font = "50px Modak";  
            context.fillText(gameOver,3.8*box,8*box);              
            dead.play();
            clearInterval(jogo);
        }
    }

    criarBG();
    criarCobrinha();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        scoreText.innerText = score;
        if(score > highscore){
            highscore = score;
        }
        localStorage.setItem("highscore", highscore);
        highscoreText.innerText = highscore;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        }
    } else{
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

