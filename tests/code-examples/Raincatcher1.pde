int eimerX;

void setup() {
  size(200,200);
  noStroke();
  fill(255);
  eimerX = width/2;
}

void draw() {
  background(#00DE31);
  rect(eimerX, height-25,40,15);
  if (keyPressed) {
    if (keyCode == LEFT) {
      eimerX--;
    } else if (keyCode == RIGHT) {
      eimerX++;
    }
  }
  
  if (eimerX < 0) {
    eimerX = 0;
  }
  if (eimerX > width - 40) {
    eimerX = width - 40;
  }
}
