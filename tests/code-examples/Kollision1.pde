float ax = 60;
float awidth = 30;

float bx = 5;
float bwidth = 40;

void setup() {
  size(150, 100);
}

void draw() {
  background(0);
  strokeWeight(4);
  
  stroke(0,255,0);
  line(ax, 50, ax+awidth, 50);
  
  stroke(255);
  if (ax > bx && ax < bx + bwidth ||
  ax+awidth > bx && ax+awidth < bx + bwidth) {
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
