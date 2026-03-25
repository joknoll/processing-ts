void draw() {
  background(200);

  line(0,0,mouseX, mouseY);
  ellipse(mouseX, mouseY, 20, 20);
  float x = mouseX/2;
  float y = mouseY/2;
  ellipse(x, y, 20, 20);
}
