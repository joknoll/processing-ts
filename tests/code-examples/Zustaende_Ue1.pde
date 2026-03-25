int x = 0;
int y = 50;
int xspeed = 2;
int yspeed = 0;
int state = 0;

void draw() {
  background(0);

  x += xspeed;
  y += yspeed;
  ellipse(x, y, 15, 15);

  if (x > width)
    x = 0;
  if (x < 0)
    x = width;
  if (y > height)
    y = 0;
  if (y < 0)
    y = width;
}

void keyPressed() {
  switch (state) {
  case 0: 
    xspeed = -xspeed;
    break;
  case 1: 
    xspeed = 0;
    yspeed = 2;
    break;
  case 2: 
    yspeed = -yspeed;
    break;
  case 3: 
    yspeed = 0;
    xspeed = 2;
    break;
  }
  state++;
  if (state > 3) 
    state = 0;
}

