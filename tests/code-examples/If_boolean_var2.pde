boolean hor = true;
int x = 50;
int y = 50;

void draw() {
  background(0);
  fill(255);
  noStroke();
  
  if (hor) {
    x++;
  } else {
    y++;
  }
  
  if (x > width) {
    x = 0;
  }
  
  if (y > height) {
    y = 0;
  }
  
  ellipse(x, y, 30, 30);
}

void mousePressed() {
  hor = !hor;
}

