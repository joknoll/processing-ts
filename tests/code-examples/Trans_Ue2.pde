float s = 1;
float speed = .03;

void draw() {
  background(0);
  noStroke();
  translate(50, 50);
  scale(s);
  ellipse(0,0,50,50);
  s += speed;
  if (s < .5 || s > 2) {
    speed = -speed;
  }
}

