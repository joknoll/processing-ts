float x = 0;
float a = 0;

void draw() {
  background(0);
  rectMode(CENTER);
  translate(x, 30);
  rotate(-a);
  rect(0, 0, 20, 20);
  rotate(a);
  translate(0, 40);
  rotate(a);
  
  rect(0, 0, 20, 20);
  x++;
  a += .05;
  if (x > width + 10) 
    x = -10;
}