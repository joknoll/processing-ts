int n = 3;

void draw() {
  background(255);
  noFill();
  for (int i = 0; i < n; i++) {
    ellipse(width/2, height/2, 20 + i*10, 20 + i*10);
  }
}

void mousePressed() {
  if (mouseButton == LEFT) {
    n++;
  } else if (mouseButton == RIGHT) {
    n--;
    if (n < 3) {
      n = 3;
    }
  }
}