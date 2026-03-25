void draw() {
  background(255);
  float d = 2*sqrt(mouseX*mouseX + mouseY*mouseY);
  ellipse(0,0,d,d);
}
