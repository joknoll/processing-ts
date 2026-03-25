int depth = 1;
int DEPTH_MIN = 1;
int DEPTH_MAX = 8;

void setup() {
  size(400,300);  
}

void draw() {
  background(255);
  sierpinski(depth, width/2, 0, width, height, 0, height);
  fill(0);
  textSize(14);
  text("cursor up/down", 20, 30);
  text("depth = " + depth + (depth == DEPTH_MIN ? 
  " (min)" : (depth == DEPTH_MAX) ? " (max)" : "")
  , 20, 55);
}

void sierpinski(int d, float x1, float y1, float x2, float y2,
float x3, float y3) {
  fill(0);
  triangle(x1, y1, x2, y2, x3, y3);
  float x1b = (x1 + x2) / 2;
  float x2b = (x2 + x3) / 2;
  float x3b = (x3 + x1) / 2;
  float y1b = (y1 + y2) / 2;
  float y2b = (y2 + y3) / 2;
  float y3b = (y3 + y1) / 2;
  fill(255);
  triangle(x1b, y1b, x2b, y2b, x3b, y3b);
  if (d > 1) {
    sierpinski(d - 1, x3b, y3b, x2b, y2b, x3, y3);
    sierpinski(d - 1, x1, y1, x1b, y1b, x3b, y3b);
    sierpinski(d - 1, x1b, y1b, x2, y2, x2b, y2b);
  }
}

void keyPressed() {
  if (keyCode == UP && depth < DEPTH_MAX) {
    depth++;
  } else if (keyCode == DOWN && depth > DEPTH_MIN) {
    depth--;
  }
}