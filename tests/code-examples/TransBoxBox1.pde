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
  
  a += .01;
}