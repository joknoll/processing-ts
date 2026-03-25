// lokale Variable

void draw() {
  background(255);
  
  fill(0);
  int y = 100-mouseY;
  rect(0, y, 20, mouseY);
  rect(30, y, 40, mouseY);
  rect(80, y, 20, mouseY);
  
  fill(255);
  rect(10, mouseY, 30, height-mouseY);
  rect(60, mouseY, 30, height-mouseY);
}
