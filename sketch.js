var snake;
var pixel_size = 20;
var shots = [];
var movement = [];
var highscore = 0;
var fr = 10
var gameState = 'init';

// setup the game's canvas and frameRate
function setup(){
  createCanvas(800, 800);
  frameRate(fr);
}

//Welcome screen with instructions and start button
function initGame(){
  background(0, 0, 0);
  var name = 'SNAKE';
  textSize(200);
  fill(255);
  nameWidht = textWidth(name);
  text(name, (width - nameWidht)/2, height/2);

  //instructions
  var inst = 'Use the arrow keys on your keyboard to control the snake.\nEating food makes you bigger and faster.\nThere are no walls.'
  textSize(20);
  fill(255);
  textAlign(CENTER);
  text(inst, 400, 600);


  //start button
  startBtn = createButton('START (or press space)');
  startBtn.position(background.width/2, 600);
  startBtn.mousePressed(startGame);

  noLoop();
}

function startGame(){
  removeElements();
  gameState = 'play';
  snake = new Snake();
  setJelloShots(5); //JelloShots = food
  loop();
}

function runGame(){
  background(0, 0, 0);
  textSize(12);
  fill (255); //text color
  textAlign(LEFT);
  text("SCORE: " + snake.tail.length, 1, 10);
  text("HIGHSCORE: " + highscore, 100, 10);

  snake.update();
  snake.show();
  snake.checkDeath();

  fill(5, 117, 230); //food color
  for(var i=0;i<shots.length;i++){
    rect(shots[i].x, shots[i].y, pixel_size, pixel_size);
    if(snake.eat(shots[i])){
      snake.tail.push(createVector(snake.x, snake.y));
      shots.splice(i, 1);
      setJelloShots(1);
      if(snake.tail.length > highscore) highscore = snake.tail.length;
      if (fr < 60) fr++;
      frameRate(fr);
    }
  }
}

function endGame(){
  background(0, 0, 0);
  textSize(60);
  var msg = 'GAME OVER';
  var score = 'YOUR SCORE: ' + snake.tail.length;
  msgWidht = textWidth(msg);
  scoreWidht = textWidth(score);
  fill(255);
  text(msg, (width - msgWidht)/2, height/2 - 80);
  text(score, (width - scoreWidht)/2, height/2);

  startBtn = createButton('RESTART (or press space)');
  startBtn.position(background.width/2, 600);
  startBtn.mousePressed(startGame);
  noLoop();
}

function draw(){
  if(gameState == 'init'){
    initGame();
  }
  else if(gameState == 'play'){
    runGame();
  }
  else if(gameState == 'end'){
    endGame();
  }
}

function setJelloShots(num){
  var cols = floor(width / pixel_size);
  var rows = floor(height / pixel_size);
  for(var i=0;i<num;i++){
    var location = createVector(floor(random(cols)), floor(random(rows))).mult(pixel_size);
    while(snake_intersect(location)){
      location = createVector(floor(random(cols)), floor(random(rows))).mult(pixel_size);
    }
    shots.push(location);
  }
}

function snake_intersect(location){
  var intersect = false;
  if(location.x == snake.pos.x && location.y == snake.pos.y){
    intersect = true;
  }else{
    for(var i=0;i<snake.tail.length;i++){
      if(location.x == snake.tail[i].x && location.y == snake.tail[i].y){
        intersect = true;
        break;
      }
    }
    for(var i=0;i<shots.length;i++){
      if(location.x == shots[i].x && location.y == shots[i].y){
        intersect = true;
        break;
      }
    }
  }
  return intersect;
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    movement.push([0, 1]);
  }else if(keyCode === UP_ARROW){
    movement.push([0, -1]);
  }else if(keyCode === LEFT_ARROW){
    movement.push([-1, 0]);
  }else if(keyCode === RIGHT_ARROW){
    movement.push([1, 0]);
  }else if (gameState != 'play' && keyCode === 32){
    startGame();
  }
}
