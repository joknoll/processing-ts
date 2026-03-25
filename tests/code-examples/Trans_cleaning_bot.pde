// Cleaning bot movement
// (c) 2021 Michael Kipp
// www.michaelkipp.de

float dia = 50; // diameter
float x = 50;
float y = 50;
float a = 0;    // angle
float as = 0.1; // angular speed
float s = 2;    // forward/backward speed

void setup() {
  size(200, 200);
}

void draw() {
  background(0);
  stroke(255);
  strokeWeight(2);
  noFill();
  translate(x, y);
  rotate(a);
  ellipse(0, 0, dia, dia);
  strokeWeight(1);
  ellipse(10, 0, 10, 10); // the "eye"
  checkKeys();
}

void checkKeys() {
  if (keyPressed) {
    if (keyCode == LEFT) {
      a -= as;
    }
    if (keyCode == RIGHT) {
      a += as;
    }
    if (keyCode == UP) {
      float dx = s * cos(a);
      float dy = s * sin(a);
      
      if (((dx > 0 && x < width - dia/2 - dx) ||
      (dx < 0 && x > dia/2 - dx)) && 
      ((dy > 0 && y < height - dia/2 - dy) ||
      (dy < 0 && y > dia/2 - dy))) {
        x += dx;
        y += dy;
      } 

    }
  }
}
