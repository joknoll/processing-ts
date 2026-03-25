int x = 0;
int bg = 0;

void draw() {
  background(bg);
  fill(255, 0, 0);
  noStroke();
  ellipse(x,50,30,30);
  x++;
  if (x > width) 
  x = 0;
}

void keyPressed() {
  bg = 0;
}

void mousePressed() {
  bg = 255;
}
