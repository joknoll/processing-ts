float a = -PI/2;

void draw() {
  background(0);
  noStroke();
  fill(255);
  arc(50,50,70,70,-PI/2, a);
  fill(0);
  stroke(255);
  noFill();
  ellipse(50,50,70,70);
  a += .1;
  if (a > 1.6 * PI) {
    a = - PI/2;
  }
}