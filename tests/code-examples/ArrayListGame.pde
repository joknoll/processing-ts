ArrayList<Target> targets = new ArrayList<Target>();
int score = 0;

void setup() {
  size(200, 200);
  for (int i = 0; i < 20; i++) {
    targets.add(new Target());
  }
}

void draw() {
  background(0);
  for (Target ta : targets) {
    ta.render();
    ta.update();
  }
  textSize(20);
  fill(255);
  text("score: " + score, width/2, height - 20);
}

void mousePressed() {
  Target hit = null;
  for (Target ta : targets) {
    if (dist(mouseX, mouseY, ta.pos.x, ta.pos.y) < ta.size/2) {
      hit = ta;
    }
  }
  if (hit != null) {
    score += hit.points;
    targets.remove(hit);
  }
}


class Target {
  PVector pos;
  PVector speed;
  float size;
  int points;

  Target() {
    size = random(15, 30);
    pos = new PVector(random(size/2, width-size/2), 
      random(size/2, height-size/2));
    speed = new PVector(random(-3, 3), random(-3, 3));
    points = (int)random(1, 10);
  }

  void render() {
    noStroke();
    fill(255);
    ellipse(pos.x, pos.y-5, size, size);
    textAlign(CENTER);
    fill(0);
    textSize(12);
    text(""+points, pos.x, pos.y);
  }

  void update() {
    pos.add(speed);
    if (pos.x > width - size/2 || pos.x < size/2) {
      speed.x = -speed.x;
    }
    if (pos.y > height - size/2 || pos.y < size/2) {
      speed.y = -speed.y;
    }
  }
}