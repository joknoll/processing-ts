float a = 0;

void draw() {
  background(0);
  noStroke();
  translate(50, 50);
  rotate(a);
  rectMode(CENTER);
  rect(0, 0, 50, 50);
  a += .01;
}

