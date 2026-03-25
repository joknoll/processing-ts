void draw() {
  background(255);
  for (int y = 0; y < mouseY; y += 3) {
    for (int x = 0; x < mouseX; x += 3) {
      point(x, y);
    }
  }
}