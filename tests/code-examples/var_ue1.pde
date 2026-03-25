float x = 50;
float y = 50;

void draw() {
  background(255);
  fill(0);
  ellipse(x, y, 10,10);
}

void mousePressed() {
  x = random(0,100);
  y = random(0,100);
}
