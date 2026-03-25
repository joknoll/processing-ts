float cx = 50;
float cy = 50;
float dia = 40;

void setup() {
  size(200, 200);
  strokeWeight(3);
}

void draw() {
  background(0);
  if (dist(mouseX, mouseY, cx, cy) < dia/2) {
    fill(255, 0, 0);
    if (mousePressed) {
      stroke(255, 255, 0);
      cx = mouseX;
      cy = mouseY;
    } else {
      noStroke();
    }
  } else {
    fill(255);
  }
  ellipse(cx, cy, dia, dia);
}
