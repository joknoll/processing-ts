int eimerX;
int eimerY;
int eimerWidth = 40;
int dropDia = 25;
int drop1x = 0;
int drop2x = 0;
int drop3x = 0;
int drop1y = 0;
int drop2y = 0;
int drop3y = 0;
int drop1col = int(random(255));
int drop2col = int(random(255));
int drop3col = int(random(255));
int punkte = 0;
int leben = 3;

void setup() {
  size(200,200);
  eimerX = width/2;
  eimerY = height - 25;
  
  drop1x = dropDia/2 + int(random(width - dropDia));
  drop2x = dropDia/2 + int(random(width - dropDia));
  drop3x = dropDia/2 + int(random(width - dropDia));
  
  drop1y = int(random(height));
  drop2y = int(random(height));
  drop3y = int(random(height));
}

void draw() {
  background(#00DE31);
  
  
  
  noStroke();
  fill(255);
  rect(eimerX, eimerY,eimerWidth,15);
  
  
  
  stroke(0);
  fill(drop1col);
  ellipse(drop1x, drop1y, dropDia, dropDia);
  fill(drop2col);
  ellipse(drop2x, drop2y, dropDia, dropDia);
  fill(drop3col);
  ellipse(drop3x, drop3y, dropDia, dropDia);
  
  drop1y++;
  drop2y++;
  drop3y++;
  
  if (drop1y > height) {
    drop1x = dropDia/2 + int(random(width - dropDia));
    drop1y = 0;
    drop1col = int(random(255));
    leben--;
  }
  if (drop2y > height) {
    drop2x = dropDia/2 + int(random(width - dropDia));
    drop2y = 0;
    drop2col = int(random(255));
    leben--;
  }
  if (drop3y > height) {
    drop3x = dropDia/2 + int(random(width - dropDia));
    drop3y = 0;
    drop3col = int(random(255));
    leben--;
  }
  
  if (eimerX < 0) {
    eimerX = 0;
  }
  if (eimerX > width - 40) {
    eimerX = width - 40;
  }
  
  if (drop1y > eimerY - dropDia/2 &&
  drop1x > eimerX && drop1x < eimerX + eimerWidth) {
    punkte++;
    drop1x = dropDia/2 + int(random(width - dropDia));
    drop1y = 0;
    drop1col = int(random(255));
  }
  if (drop2y > eimerY - dropDia/2 &&
  drop2x > eimerX && drop2x < eimerX + eimerWidth) {
    punkte++;
    drop2x = dropDia/2 + int(random(width - dropDia));
    drop2y = 0;
    drop2col = int(random(255));
  }
  if (drop3y > eimerY - dropDia/2 &&
  drop3x > eimerX && drop3x < eimerX + eimerWidth) {
    punkte++;
    drop3x = dropDia/2 + int(random(width - dropDia));
    drop3y = 0;
    drop3col = int(random(255));
  }
  
  
  if (keyPressed) {
    if (keyCode == LEFT) {
      eimerX--;
    } else if (keyCode == RIGHT) {
      eimerX++;
    }
  }
  
  
  
  fill(255);
  textSize(14);
  textAlign(LEFT);
  text("Punkte: " + punkte, 10, 20);
  textAlign(RIGHT);
  text("Leben: " + leben, width - 10, 20);
}
