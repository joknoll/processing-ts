PVector[] points = new PVector[100];
int num = 0;

void setup() {
  size(200,200);
}

void draw() {
  background(0);
  for (int i = 0; i < num; i++) {
    noStroke();
    fill(200);
    ellipse(points[i].x, points[i].y, 5, 5);
    if (i > 0) {
      stroke(200);
      line(points[i-1].x, points[i-1].y, 
      points[i].x, points[i].y);
    }
  }
}

void mousePressed() {
  points[num] = new PVector(mouseX, mouseY);
  num++;
}
