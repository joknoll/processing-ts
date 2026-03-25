int d = 40;

void draw() {
  background(0);
  fill(255);
  noStroke();
  rectMode(CENTER);
  rect(50,50,d,d);
}

void mousePressed() {
  d = d + 5;
}

void keyPressed() {
  d = d - 5;
}
