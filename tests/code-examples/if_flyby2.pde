int animDuration = 20;
int endTime1;
int endTime2;
boolean anim1 = false;
boolean anim2 = false;
float x1 = 0;
float x1speed = 4;
float x2 = 0;
float x2speed = 4;

void setup() {
  size(150, 180);
}

void draw() {
  background(0);
  noFill();
  stroke(255);

  // fly-out
  if (mouseX < 20 + x1 && mouseY > 20 && mouseY < 80) {
    strokeWeight(3);
  } else {
    strokeWeight(1);
  }
  rect(-100 + x1, 20, 120, 60, 10);
  if (mouseX < 20 + x2 && mouseY > 100 && mouseY < 160) {
    strokeWeight(3);
  } else {
    strokeWeight(1);
  }
  rect(-100 + x2, 100, 120, 60, 10);

  if (anim1) {
    x1 += x1speed;
    if (frameCount > endTime1) {
      anim1 = false;
      x1speed = -x1speed;
    }
  }
  if (anim2) {
    x2 += x2speed;
    if (frameCount > endTime2) {
      anim2 = false;
      x2speed = -x2speed;
    }
  }
}

void mousePressed() {
  if (mouseX < 20 + x1 && mouseY > 20 && mouseY < 80) {
    anim1 = true;
    endTime1 = frameCount + animDuration;
  } 
  if (mouseX < 20 + x2 && mouseY > 100 && mouseY < 160) {
    anim2 = true;
    endTime2 = frameCount + animDuration;
  }
}
