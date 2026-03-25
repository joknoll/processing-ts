int x = 10;
int y = 10;
int speed = 1;
int state = 0;

void draw() {
  background(0);
  ellipse(x, y, 15, 15);

  switch (state) {
  case 0:
    x += speed;
    if (x > width-15)
      state++;
    break;
  case 1:
    y += speed;
    if (y > height-15)
      state++;
    break;
  case 2:
    x -= speed;
    if (x < 15)
      state++;
    break;
  case 3:
    y -= speed;
    if (y < 15)
      state = 0;
    break;
  }
  background(0);
  ellipse(x, y, 20,20);
}

