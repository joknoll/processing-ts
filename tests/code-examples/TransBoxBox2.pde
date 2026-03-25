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
  

  translate(-20,-20);
  translate(x, 0);
  //rotate(10*a);
  fill(255,0,0);
  rect(0,0,10,10);

  
  x += s;
  if (x > 40 || x < 0) {
    s = -s;
  }
  

  a += .01;
}