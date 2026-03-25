int n = 3;

void draw() {
  background(255);
  noFill();
  for (int i = 0; i < n; i++) {
    ellipse(mouseX, mouseY, 30 + i * 10, 30 + i * 10);
  }
}