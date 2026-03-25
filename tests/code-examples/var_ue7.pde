int x = 0;

void setup() {
  fill(255);
}

void draw() {
  background(0);
  noStroke();
  ellipse(x,mouseY,30,30);
  x++;
  if (x > width) 
  x = 0;
}

void mousePressed() {
  fill(255, 0, 0);
}

void keyPressed() {
  fill(255);
}
