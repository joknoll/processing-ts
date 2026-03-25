float a = 0;
float x = 0;
float s = .8;
float x1 = 0;
float s1 = .2;

void setup() {
}

void draw() {
  background(200);
  rectMode(CENTER);
  noStroke();
  
  translate(50, 50);
  rotate(a);
  
  fill(255);
  rect(0,0,40,40);
  
  pushMatrix();
  translate(-20,-20);
  translate(x, 0);
  //rotate(10*a);
  fill(255,0,0);
  rect(0,0,10,10);
  popMatrix();
  
  translate(20,-20);
  translate(0,x1);
  //rotate(3*a);
  fill(0,0,255);
  rect(0,0,10,10);
  
  x += s;
  if (x > 40 || x < 0) {
    s = -s;
  }
  
  x1 += s1;
  if (x1 > 40 || x1 < 0) {
    s1 = -s1;
  }
  a += .01;
}