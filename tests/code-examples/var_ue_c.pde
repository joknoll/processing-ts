void draw() {
  background(0);  
  fill(255, 255, 0);
  ellipse(mouseX, mouseY, 50, 50);
  ellipse(mouseX - 10, mouseY - 10, 10, 10);
  ellipse(mouseX + 10, mouseY - 10, 10, 10);
  arc(mouseX, mouseY, 30, 20, 0, PI);
}