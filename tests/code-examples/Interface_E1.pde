int bx = 50;
int b1y = 30;
int b2y = 80;
int b3y = 130;

int bWidth = 100;
int bHeight = 30;
int red = 100;
int green = 100;
int blue = 100;

void setup() {
  size(200,200);
}

void draw() {
  background(red, green, blue);
  
  if (mouseX >= bx && mouseX <= bx + bWidth
  && mouseY >= b1y && mouseY <= b1y + bHeight) {
    fill(200);
  } else {
    fill(255);
  }
  rect(bx, b1y, bWidth, bHeight);
  if (mouseX >= bx && mouseX <= bx + bWidth
  && mouseY >= b2y && mouseY <= b2y + bHeight) {
    fill(200);
  } else {
    fill(255);
  }
  rect(bx, b2y, bWidth, bHeight);
  if (mouseX >= bx && mouseX <= bx + bWidth
  && mouseY >= b3y && mouseY <= b3y + bHeight) {
    fill(200);
  } else {
    fill(255);
  }
  rect(bx, b3y, bWidth, bHeight);
  
  textAlign(CENTER);
  fill(0);
  text("Rot", bx + bWidth/2, b1y + bHeight/2 + 5);
  text("Grün", bx + bWidth/2, b2y + bHeight/2 + 5);
  text("Blau", bx + bWidth/2, b3y + bHeight/2 + 5);
}

void mousePressed() {
  if (mouseX >= bx && mouseX <= bx + bWidth
  && mouseY >= b1y && mouseY <= b1y + bHeight) {
    red = 255;
    green = 0;
    blue = 0;
  } 
  
  else if (mouseX >= bx && mouseX <= bx + bWidth
  && mouseY >= b2y && mouseY <= b2y + bHeight) {
    red = 0;
    green = 255;
    blue = 0;
  } 
  
  else if (mouseX >= bx && mouseX <= bx + bWidth
  && mouseY >= b3y && mouseY <= b3y + bHeight) {
    red = 0;
    green = 0;
    blue = 255;
  } else {
    red = 100;
    green = 100;
    blue = 100;
  }
}

