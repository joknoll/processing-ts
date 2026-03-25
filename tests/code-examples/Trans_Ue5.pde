float a = 0;

void draw() {
  background(0);
  noStroke();
  rectMode(CENTER);
  translate(25, 50);
  pushMatrix();
  rotate(a);
  rect(0,0,25,25);
  
  popMatrix();
  translate(50, 0);
  rotate(a);
  rect(0,0,25,25);
  
  a += .01;
}

