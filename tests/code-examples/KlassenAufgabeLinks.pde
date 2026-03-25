Ball[] balls = new Ball[15];
Link[] links = new Link[100];
int numLinks = 0;

void setup() {
  size(200,200);
  for (int i = 0; i < balls.length; i++) {
    balls[i] = new Ball();
  }
}

void draw() {
  background(0);
  //println(numLinks);

  // draw links
  for (int i = 0; i < numLinks; i++) {
    links[i].render();
  }

  // draw balls
  for (int i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].render();
    Ball b = balls[i].checkCollision(balls);
    if (b != null) {
      if (numLinks < links.length) {
        links[numLinks] = new Link(balls[i], b);
        numLinks++;
      }
    }
  }
}

class Ball {
  PVector pos;
  PVector speed;
  float d = 10;
  int col;

  Ball() {
    pos = new PVector(random(d, width-d), random(d, height-d));
    speed = new PVector(random(-1.5,1.5), random(-1.5,1.5));
    col = (int)random(100, 255);
  }

  void render() {
    noStroke();
    fill(col);
    ellipse(pos.x, pos.y, d, d);
  }

  void update() {
    pos.add(speed);
    if (pos.x < d/2 || pos.x > width-d/2) {
      speed.x = -speed.x;
    }
    if (pos.y < d/2 || pos.y > height-d/2) {
      speed.y = -speed.y;
    }
  }
  
  Ball checkCollision(Ball[] balls) {
    for (int i = 0; i < balls.length; i++) {
      if (this != balls[i]) {
        if (pos.dist(balls[i].pos) < d/2) {
          //print("hit ");
          return balls[i];
        }
      }
    }
    return null;
  }
}

class Link {
  Ball ball1;
  Ball ball2;
  int col;
  
  Link(Ball b1, Ball b2) {
    ball1 = b1;
    ball2 = b2;
    col = (int)random(50, 255);
  }
  
  void render() {
    //print(".");
    strokeWeight(1);
    stroke(col);
    line(ball1.pos.x, ball1.pos.y, ball2.pos.x, ball2.pos.y);
  }
}
