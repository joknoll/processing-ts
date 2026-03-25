int y = 50;
int d = 20;

void draw() {
  background(255);
  strokeWeight(5);
  line(width/2, 0, width/2, y);
  line(width/2, y + d, width/2, height);
  if (keyPressed) {
    if (keyCode == DOWN && y < height-d) {
      y += 2;
    }
    if (keyCode == UP && y > 2) {
      y -= 2;
    }
  }
}
