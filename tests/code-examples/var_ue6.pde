int x = 0;

void draw() {
  background(0);
  fill(255);
  noStroke();
  ellipse(x,50,30,30);
  x++;
  if (x > width) 
  x = 0;
}


