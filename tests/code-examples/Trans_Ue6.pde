float a = 0;

void draw() {
  background(0);
  noStroke();
  rectMode(CENTER);
  translate(50, 50);
  rotate(a);
  rect(0,0,60,5);
  translate(30,0);
  rotate(a);
  rect(0,0,20,20);
  
  
  
  
  
  a += .01;
}

