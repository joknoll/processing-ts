PVector pos;
PVector velocity;
int radius = 15;

void setup() {
  size(200, 200);
  pos = new PVector(100, 100);
  velocity = new PVector(random(1,4), random(1,4));
  textAlign(CENTER);
  textSize(16);
}

void draw() {
  background(0);
  noStroke();
  fill(255, 255, 0);
  ellipse(pos.x, pos.y, 2*radius, 2*radius);  
  pos.add(velocity);
  fill(255);
  textSize(14);
  text("space to reset velocity", 100, 200-8);

  if (pos.x > 200 - radius || pos.x < radius) {
    velocity.x = -velocity.x;
  }

  if (pos.y > 200 - radius || pos.y < radius) {
    velocity.y = -velocity.y;
  }
}

void keyPressed() {
  if (key == ' ') {
    pos.x = width/2;
    pos.y = height/2;
    velocity = new PVector(random(1,3), random(1,3));
  }
}
