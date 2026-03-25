int x = 0;

void draw() {
  background(0);
  
  // nur zum Markieren
  stroke(255);
  line(25, 0, 25, height);
  line(75, 0, 75, height);
  
  
  if (x < 25 || x > 75) {
    fill(255,0,0);
  } else {
    fill(255);
  }
  ellipse(x, 50, 20, 20);
  x++;
  if (x > width) {
    x = 0;
  }
}