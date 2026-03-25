float x = 0;
float a = 0;

void draw() {
  background(0);
  translate(x, height/2);
  rotate(a);
  rectMode(CENTER);
  rect(0, 0, 20, 20);
  x++;
  a += .05;
  if (x > width + 10) 
    x = -10;
}