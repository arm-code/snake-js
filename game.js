
let board;
let context;
let block_size = 20;
let cols = 30;
let rows = 20;

let snakeX = 0;
let snakeY = 0;
let tail = [];

let foodX;
let foodY;

let score = 0;

let velocityX = 1;
let velocityY = 0;

let game_over =false;

window.onload = () =>{
    board = document.getElementById("board");
    context = board.getContext("2d");

    board.width = cols * block_size;
    board.height = rows * block_size;

    document.addEventListener('keyup', gameDirection);

    board.addEventListener('click', () => {
        game_over = false;
        score = 0;
    });

    foodPlace();

    setInterval(update, 1000 / 10);
}

function update(){
    // clear screen
    createRect(0, 0, board.width, board.height);

    if(game_over){
        createText(`GAME OVER`, board.width / 2, board.height / 2 -25, 'center', 50);

        createText(`Score: ${score}`, board.width / 2, board.height /2 +25, 'center');

        createText(`Click to start again`, (cols * block_size)/2, board.height -50, 'center');

        return 
    }

    //write score
    createText(`Score: ${score}`, 30, 40);

    //write first food
    createRect(foodX, foodY, block_size, block_size, "lime");

    //did it eat
    if(snakeX == foodX && snakeY == foodY){
        tail.push([foodX, foodY]);
        score += 10;
        foodPlace()
    }

    //snake tail
    for (let i = tail.length -1; i > 0; i--) {
        tail[i] = tail[i - 1];        
    }

    if(tail.length){
        tail[0] =  [snakeX, snakeY];
    }

    //snake position
    snakeX += velocityX * block_size;
    snakeY += velocityY * block_size;

    createRect(snakeX, snakeY, block_size, block_size, 'orange');

    for (let i = 0; i < tail.length; i++) {
        createRect(tail[i][0], tail[i][1], block_size, block_size, 'lime');        
    }

    //hit the wall
    if(snakeX < 0 || snakeX > cols * block_size || snakeY < 0 || snakeY > rows * block_size){
        gameOverEvent()
    }

    //shot herself
    for (let i = 0; i < tail.length; i++) {
        if(snakeX == tail[i][0] && snakeY == tail[i][1]){
            gameOverEvent()
        }
        
    }
}

function foodPlace(){
    foodX = Math.floor(Math.random() * cols) * block_size;
    foodY = Math.floor(Math.random() * rows) * block_size;
}

function gameDirection(e){
    if(e.code == "ArrowUp"){
        velocityX = 0;
        velocityY = -1;
    }else if(e.code == "ArrowDown"){
        velocityX = 0;
        velocityY = 1;
    }else if(e.code == "ArrowLeft"){
        velocityX = -1;
        velocityY = 0;
    }else if(e.code == "ArrowRight"){
        velocityX = 1;
        velocityY = 0;
    }
}

function gameOverEvent(){
    game_over = true;
    tail = [];
    snakeX = 0;
    snakeY = 0;
    velocityX = 1;
    velocityY = 0;
}

function createRect(x, y, width, height, color = "black"){
    context.fillStyle = color;
    context.fillRect(x,y, width, height);
}

function createText(text, x, y, textAlign = "start", fontSize =20){
    context.fillStyle = 'lime';
    context.font = `${fontSize}px Roboto Mono`;
    context.textAlign = textAlign;
    context.fillText(text,x,y);
}

