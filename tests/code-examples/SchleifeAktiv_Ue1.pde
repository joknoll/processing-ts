int offset = 0;

void draw() {
  background(255);
  for (int y = 0; y < height; y += 10) {
    line(0, y + offset, width, y + offset);
  }
  offset++;
  if (offset > 10)
  offset = 0;
}
