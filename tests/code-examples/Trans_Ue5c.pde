float a = 0;
float a2 = 0;
boolean play = true;

void setup() {
  size(200,200);
}

void draw() {
  background(0);
  noStroke();
  rectMode(CENTER);
  translate(width/2, height/2);
  rotate(a);
  rect(0,0,60,5); // main bar
  pushMatrix();
  translate(30,0);
  rotate(a2);
  rectMode(CORNER);
  rect(0,0,40,5); // first wing
  translate(40,0);
  rotate(a2);
  rect(0,0,20, 3); // subwing
  popMatrix();
  
  translate(-30,0);
  rotate(-a2);
  rect(0,0,40,5); // second wing
  translate(40,0);
  rotate(a2);
  rect(0,0,20, 3); // subwing
  
  if (play) {
  a += .01;
  a2 += .02;
  }
}

void mousePressed() {
  play = !play;
}