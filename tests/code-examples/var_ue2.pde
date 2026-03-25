int bg = 0;

void draw() {
  background(bg);
  rectMode(CENTER);
  rect(50, 50, 40, 40);
}

void keyPressed() {
  bg = 255;
}

void mousePressed() {
  bg = 0;
}