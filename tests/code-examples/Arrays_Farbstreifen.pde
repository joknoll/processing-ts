int n = 30;
float[] xa = new float[n];
float[] ya = new float[n];
float[] xs = new float[n];
float[] ys = new float[n];
color[] col = new color[n];

void setup() {
  size(200, 200);
  background(0);
  noStroke();
  for (int i = 0; i < n; i++) {
    xa[i] = random(width);
    ya[i] = random(height);
    xs[i] = random(-1, 1);
    ys[i] = random(-1, 1);
    col[i] = color(random(255), random(255), random(255));
  }
}

void draw() {
  for (int i = 0; i < n; i++) {
    fill(col[i]);
    ellipse(xa[i], ya[i], 3, 3); 
    xa[i] += xs[i];
    ya[i] += ys[i];
    if (xa[i] < 0 || xa[i] > width) {
      xs[i] = -xs[i];
    }
    if (ya[i] < 0 || ya[i] > height) {
      ys[i] = -ys[i];
    }
  }
}

void mousePressed() {
  background(0);
  for (int i = 0; i < n; i++) {
    xa[i] = random(width);
    ya[i] = random(height);
    xs[i] = random(-1, 1);
    ys[i] = random(-1, 1);
    col[i] = color(random(255), random(255), random(255));
  }
}
