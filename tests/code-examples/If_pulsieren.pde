int dia = 50;
int speed = 1;

void draw() {
  background(255);
  ellipse(50,50,dia, dia);
  dia += speed;
  if (dia < 50 || dia > 100) {
    speed = -speed;
  }
}
