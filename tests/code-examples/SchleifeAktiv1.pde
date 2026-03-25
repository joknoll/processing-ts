int num = 5;

void draw() {
  background(255);
  //rectMode(CENTER);
  rect(mouseX, mouseY, 10, 10);
  for (int y = 0; y < num; y++) {
    float ry = mouseY - num/2.0 * 10.0 + y * 10;
    for (int x = 0; x < num; x++) {
      float rx = mouseX - num/2.0 * 10.0 + x * 10;
      rect(rx, ry, 10, 10);
    }
  }
}
