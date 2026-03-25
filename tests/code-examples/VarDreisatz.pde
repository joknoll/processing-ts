float x = 130;
float y = 100;
float w = 60;
float h = 40;

void setup() {
  size(200, 150);
}

void draw() {
  background(0);
  stroke(255);
  noFill();
  rect(x, y, w, h);
  fill(255);
  ellipse(mouseX, mouseY, 10, 10);
  
  float x2 = x + w/width * mouseX;
  float y2 = y + h/height * mouseY;
  ellipse(x2, y2, 2, 2);
}
