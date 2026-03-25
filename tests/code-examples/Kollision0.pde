float ax = 50;

float bx = 5;
float bwidth = 30;

void draw() {
  background(0);
  strokeWeight(5);
  
  stroke(0,255,0);
  point(ax, 50);
  
  stroke(255);
  if (ax > bx && ax < bx + bwidth) {
    stroke(255,0,0);
  }
  
  line(bx, 60, bx+bwidth, 60);
  
  if (keyPressed) {
    if (keyCode == LEFT) {
      bx -= 2;
    } else if (keyCode == RIGHT) {
      bx += 2;
    }
  }
}
