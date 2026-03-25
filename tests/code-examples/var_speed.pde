int x = 0;
int speed = 1;

void draw() {
  background(0);
  fill(0, 255, 0);
  noStroke();
  ellipse(x,50,20,20);
  x += speed;
  x = x % 100;
}

void mousePressed() {
  speed += 1;
}

void keyPressed() {
  speed = 1;
}
