int n = 10;
float[] xa = new float[n];
float[] ya = new float[n];
float[] xs = new float[n];
float[] ys = new float[n];
color[] col = new color[n];

void setup() {
  size(200, 200);
  noStroke();
  for (int i = 0; i < n; i++) {
    xa[i] = random(5,width-5);
    ya[i] = random(5,height-5);
    xs[i] = random(-1, 1);
    ys[i] = random(-1, 1);
    col[i] = color(random(255), random(255), random(255));
  }
}

void draw() {
  background(0);
  for (int i = 0; i < n; i++) {
    fill(col[i]);
    ellipse(xa[i], ya[i], 10, 10); 
    xa[i] += xs[i];
    ya[i] += ys[i];
    if (xa[i] < 5 || xa[i] > width-5) {
      xs[i] = -xs[i];
    }
    if (ya[i] < 5 || ya[i] > height-5) {
      ys[i] = -ys[i];
    }
  }
}
