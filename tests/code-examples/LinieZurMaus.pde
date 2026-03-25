void draw() {
  background(255);
  for (int x = 0; x < mouseX; x += 3) {
    point(x, mouseY);
  }
}