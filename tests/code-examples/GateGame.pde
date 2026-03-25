float y = 50;
float d = 40;
float bx = 0;
float by = 50;
float speed = 2;
int score = 0;
boolean crash = false;

void draw() {
  background(255);
  noStroke();
  text("" + score, 20, 20);
  fill(0);
  rect(bx, by, 10, 10);
  bx += speed;
  if (bx > width) {
    bx = 0;
    by = int(random(height-10));
    score += crash ? -1 : 1;
    crash = false;
  }
  if (bx > width-10 && (by < y || by+10 > y+d)) {
    stroke(255, 0, 0);
    crash = true;
  } else {
    stroke(0);
  }

  strokeWeight(5);
  line(width-10, 0, width-10, y);
  line(width-10, y + d, width-10, height);
  if (keyPressed) {
    if (keyCode == DOWN && y < height-13) {
      y += 3;
    }
    if (keyCode == UP && y > 3) {
      y -= 3;
    }
  }
}

void keyPressed() {
  if (key == ' ') {
    score = 0;
  }
}
