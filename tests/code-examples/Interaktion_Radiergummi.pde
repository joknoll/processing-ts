// Aufgabe Radiergummi

void setup() {
  background(255);
  fill(0);
  rectMode(CENTER);
  rect(50, 50, 70, 70);
}

void draw() {
  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 15, 15);
}