float a = 0;

void draw() {
  background(0);
  noStroke();
  translate(50, 50);
  rectMode(CENTER);

  rotate(a);
  rect(0, 0, 15, 15);  
  translate(40, 0);
  ellipse(0, 0, 20, 20);
  a += .05;
}

