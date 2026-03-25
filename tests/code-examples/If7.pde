void draw() {
  background(255);
  if (mouseX < 50) {
    fill(255);
    ellipse(mouseX, mouseY, 20, 20);
  } else {
    rectMode(CENTER);
    fill(0);
    rect(mouseX, mouseY, 20, 20);
  }
}

