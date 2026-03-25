ArrayList<Thing> things = new ArrayList<Thing>();

void setup() {
  size(200, 200);
  things.add(new Ball());
  things.add(new Ball());
  things.add(new Quad());
  things.add(new Ball());
  things.add(new Quad());
}

void draw() {
  background(0);
  fill(255);
  noStroke();

  for (Thing m : things) {
    m.update();
    m.render();
  }
}

abstract class Thing {
  PVector location;
  
  Thing() {
    location = new PVector(random(0, width), random(0, height));
  }

  abstract void update();
  abstract void render();
}

abstract class Mover extends Thing {

  PVector speed;

  Mover() {
    speed = new PVector(random(-3, 3), random(-3, 3));
  }

  void update() {
    location.add(speed);
    if (location.x > width || location.x < 0) {
      speed.x = -speed.x;
    }

    if (location.y > height || location.y < 0) {
      speed.y = -speed.y;
    }
  }
}

abstract class Rotator extends Thing {
  float angle;
  float angularSpeed;

  Rotator() {
    angularSpeed = random(-0.1, 0.1);
  }

  void update() {
    angle += angularSpeed;
  }
}

class Ball extends Mover {
  void render() {
    ellipse(location.x, location.y, 20, 20);
  }
}

class Quad extends Rotator {
  void render() {
    pushMatrix();
    rectMode(CENTER);
    translate(location.x, location.y);
    rotate(angle);
    rect(0, 0, 20, 20);
    popMatrix();
  }
}

