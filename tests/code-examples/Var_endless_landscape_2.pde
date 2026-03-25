float x1, y1, x2, y2, x3, y3, x4, y4;
float speed = 2;

void setup() {
  size(200, 200);
  x1 = 0;
  y1 = random(height);
  x2 = width/2;
  y2 = random(height);
  x3 = width;
  y3 = random(height);
  x4 = 1.5* width;
  y4 = random(height);
}

void draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  line(x1, y1, x2, y2);
  line(x2, y2, x3, y3);
  line(x3, y3, x4, y4);

  x1 -= speed;
  x2 -= speed;
  x3 -= speed;
  x4 -= speed;

  if (x2 < 0) {
    x1 = x2;
    y1 = y2;
    x2 = x3;
    y2 = y3;
    x3 = x4;
    y3 = y4;
    x4 = 1.5*width;
    y4 = random(height);
  }
}
