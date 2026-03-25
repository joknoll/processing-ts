boolean sichtbar = true;

void draw() {
  background(255);
  fill(0);
  if (sichtbar) 
    ellipse(50, 50, 40, 40);
}

void mousePressed() {
  sichtbar = !sichtbar;
}

