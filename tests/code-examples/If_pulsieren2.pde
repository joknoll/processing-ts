int grau = 0;
int speed = 2;

void draw() {
  background(255);
  fill(grau);
  noStroke();
  ellipse(50,50,80,80);
  grau += speed;
  if (grau <= 0 || grau >= 255) {
    speed = -speed;
  }
}
