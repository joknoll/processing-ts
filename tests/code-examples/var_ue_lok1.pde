void draw() {
  background(200);
  fill(255);
  ellipse(mouseX, mouseY, 20, 20);
  fill(0);
  ellipse(width-mouseX, height-mouseY, 20, 20);
}
