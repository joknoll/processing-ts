// (c) 2022 Michael Kipp

int high = 0;
int TIMEOUT = 5;
int timer = TIMEOUT;

void setup() {
  size(200, 200);
}

void draw() {
  background(0);
  for (int i = 0; i < 10; i++) {
    int y = 50 + i * 10;
    if (high == i) {
      stroke(255);
      strokeWeight(2);
    } else {
      stroke(100);
      strokeWeight(1);
    }
    line(80, y, width-80, y);
  }
  timer--;
  if (timer < 0) {
    timer = TIMEOUT;
    high++;
    if (high == 10) {
      high = 0;
    }
  }
}
