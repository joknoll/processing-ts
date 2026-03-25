PVector pos;
PVector velocity;
int radius = 15;

void setup() {
  size(200, 200);
  pos = new PVector(width/2, height/2);
  velocity = new PVector(random(1,4), random(1,4));
  strokeWeight(2);
  textAlign(CENTER);
  textSize(16);
}

void draw() {
  background(0);
  noStroke();
  fill(255, 255, 0);
  ellipse(pos.x, pos.y, 2*radius, 2*radius);
  stroke(255, 0, 0);
  line(pos.x, pos.y, 
    pos.x + 10* velocity.x, pos.y + 10* velocity.y);
  pos.add(velocity);
  fill(255);
  textSize(16);
  text("velocity: (" + round(velocity.x) + 
  ", " + round(velocity.y) + ")", 
  width/2, 25);
  textSize(14);
  text("cursor keys to adjust vector", width/2, height-22);
  text("space to reset", width/2, height-8);

  if (pos.x > width - radius || pos.x < radius) {
    velocity.x = -velocity.x;
  }

  if (pos.y > height - radius || pos.y < radius) {
    velocity.y = -velocity.y;
  }
}

void keyPressed() {
  if (key == ' ') {
    velocity = new PVector(random(1,3), random(1,3));
    pos.x = width/2;
    pos.y = height/2;
  }
  if (keyCode == RIGHT) {
    velocity.x += 1;
  }
  if (keyCode == LEFT) {
    velocity.x -= 1;
  }
  if (keyCode == UP) {
    velocity.y -= 1;
  }
  if (keyCode == DOWN) {
    velocity.y += 1;
  }
}
