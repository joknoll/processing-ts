int start = 0;

void draw() {
  background(0);
  textAlign(CENTER);
  textSize(24);
  text((int)((frameCount - start) / frameRate), width/2,height/2);
}

void mousePressed() {
  start = frameCount;
}