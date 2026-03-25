int cy = 50;
// 2021 Michael Kipp
// www.michaelkipp.de

int ay = 90;
int by = 130;
int x1 = 50;
int x2;

void setup() {
  size(300, 250);
  textSize(20);
  x2 = width-20;
}

void draw() {
  background(0);
  strokeWeight(5);
  stroke(255);
  fill(255);
  text("Finde den Goldenen Schnitt", 10, 25);
  text("c", 10, cy+5);
  text("a", 10, ay+5);
  text("b", 10, by+5);
  line(x1, cy, x2, cy); // c

  if (mouseX > x1 && mouseX < x2) {
    int aLength = mouseX - x1;
    int bLength = (x2 - x1) - aLength;
    float c2a = float(x2-x1) / aLength;
    float a2b = float(aLength) / bLength;
    boolean eq = abs(c2a - a2b) < 0.01;

    stroke(0, 255, 0);
    line(x1, cy, mouseX, cy); // a auf c
    stroke(0);
    line(mouseX, cy-2, mouseX, cy+2); // Trennung

    if (eq) {
      stroke(255, 255, 0);
    } else {
      stroke(0, 255, 0);
    }
    line(x1, ay, x1 + aLength, ay); // a
    if (eq) {
      stroke(255, 255, 0);
    } else {
      stroke(255);
    }
    line(x1, by, x1 + bLength, by); // b

    if (eq) {
      fill(255, 255, 0);
    } else {
      fill(255);
    }
    text("c:a = " + c2a, 10, 175);
    text("a:b = " + a2b, 10, 205);
    
    if (eq) {
      text("Goldener Schnitt", 10, 235);
    }
  }
}
