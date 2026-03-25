int endTime;
boolean anim = false;
float x = 0;
float xspeed = 2;

void setup() {
}

void draw() {
  background(0);
  noFill();
  stroke(255);
  
  // frame
  rect(-100 + x, 20, 120, 60, 10);
  
  if (anim) {
    x += xspeed;
    if (frameCount > endTime) {
      anim = false;
      xspeed = -xspeed;
    }
  }
}

void mousePressed() {
  anim = true;
  endTime = frameCount + 30;
}
