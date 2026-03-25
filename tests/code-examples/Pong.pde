float playerX, playerY;
float ballX, ballY;
float ballSpeedX, ballSpeedY;
float playerSpeed = 5;
float PLAYER_WIDTH = 60;
float PLAYER_HEIGHT = 10;
float BALL_SIZE = 15;
boolean gameOver = false;

void setup() {
  size(250, 250);
  init();
}

void draw() {
  background(0);

  if (gameOver) {
    textAlign(CENTER);
    textSize(30);
    text("Press SPACE", width/2, height/2+10);
  } else {
    noStroke();
    fill(255);
    rect(playerX, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);

    rect(ballX, ballY, BALL_SIZE, BALL_SIZE);
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    checkCollisions();
    
    if (ballY + BALL_SIZE > height) {
      gameOver = true;
    }

    if (keyPressed) {
      if (keyCode == LEFT) {
        playerX -= playerSpeed;
      } else if (keyCode == RIGHT) {
        playerX += playerSpeed;
      }
      playerX = constrain(playerX, 0, width-PLAYER_WIDTH);
    }
  }
}

void init() {
  playerX = width/2 - PLAYER_WIDTH/2;
  playerY = height - PLAYER_HEIGHT - 10;
  ballX = width/2;
  ballY = height/2;
  ballSpeedX = (random(0,1) < .5 ? -1 : 1)*random(2, 3);
  ballSpeedY = random(-2, -3);
}

void checkCollisions() {
  if (ballX < 0 || ballX > width - BALL_SIZE) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // small tolerance in y direction

  if (ballY + BALL_SIZE > playerY && ballY + BALL_SIZE < playerY + ballSpeedY * 1.5 &&
    ((playerX + PLAYER_WIDTH > ballX + BALL_SIZE && ballX + BALL_SIZE > playerX)
    || (playerX + PLAYER_WIDTH > ballX && ballX + BALL_SIZE > playerX))) {
    ballSpeedY = -ballSpeedY;
  }
}

void keyPressed() {
  if (gameOver && key == ' ') {
    gameOver = false;
    init();
  }
}
