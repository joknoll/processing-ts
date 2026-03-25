void draw() {
  background(255);
  noStroke();
  fill(mouseX/100.0*255);
  rectMode(CENTER);
  rect(50,50,80,80);
}
