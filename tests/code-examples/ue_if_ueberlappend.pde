int x1 = 30;
int y1 = 10;
int x2 = 10;
int y2 = 40;

void draw() {
  background(255);
  noFill();
  rect(x1, y1, 50, 50);
  rect(x2, y2, 50, 50);
  
  if (mouseX > x1 && mouseX < x1+50 &&
  mouseY > y1 && mouseY < y1+50) {
    fill(255,0,0);
  }
  if (mouseX > x2 && mouseX < x2+50 &&
  mouseY > y2 && mouseY < y2+50) {
    fill(0,255,0);
  }
  if (mouseX > max(x1,x2) && mouseX < min(x1,x2)+50 &&
  mouseY > max(y1,y2) && mouseY < min(y1,y2)+50) {
    fill(0,0,255);
  }
  ellipse(mouseX, mouseY, 20, 20);
}