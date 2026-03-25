String s = "Wanze";
int cut = 0;

void draw() {
  background(0);
  textAlign(CENTER);
  textSize(20);
  text(s.substring(cut), width/2, height/2+8);
}

void mousePressed() {
  cut++;
  if (cut > s.length()) {
    cut = 0;
  }
}