void draw() {
  background(0);
  fill(255,255,0);
  float percent = (frameCount % 120)/120.0;
  float x = 50 - sin(percent * 2*PI) *30;
  float y = 50 + cos(percent * 2*PI) *30;
  ellipse(x, y, 10, 10);
}
