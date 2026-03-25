int x = 0;
int speed = 1;

void draw() {
  background(255);
  ellipse(50, 50, x, x);
  x = x + speed;
  
  if (x >= width) {
    x = 0;
  }
}

