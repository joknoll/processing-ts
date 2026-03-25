int x = 0;
int y = 50;

void draw() {
  background(0);
  fill(255);
  noStroke();
  ellipse(x,y,30,30);
  x++;
  if (x > width) 
  x = 0;
}

void keyPressed() {
  y -= 5;
}

void mousePressed() {
  y += 5;
}