float a = 0;

void draw() {
  background(0);
  noStroke();
  translate(50, 50);
  rectMode(CENTER);
  rect(0,0,15,15);
  rotate(a);  
  translate(40, 0);
  ellipse(0,0,20,20);
  a += .05;
}

