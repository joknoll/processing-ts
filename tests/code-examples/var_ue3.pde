int bg = 0;

void draw() {
  background(bg);
  fill(255-bg);
  ellipse(50,50,30,30);
}

void keyPressed() {
  bg = 255;
}

void mousePressed() {
  bg = 0;
}
