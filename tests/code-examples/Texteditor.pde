String[] lines = new String[7];
int line = 0;
int charWidth = 15;

void setup() {
  size(300, 150);
  for (int i = 0; i < lines.length; i++) {
    lines[i] = "";
  }
  fill(0);
}

void draw() {
  background(255);
  for (int i = 0; i < lines.length; i++) {
    String l = lines[i];
    if (i == line) 
      l+= "#";
    text(i + ": " + l, 10, 15 + i * 20);
  }
}

void keyPressed() {
  if (key >= 'a' && key <= 'z' || key == ' ') {
    // necessary for online!
    String newline = lines[line] + new Character(key).toString();
    lines[line] = newline;
  }
  if ((keyCode == DOWN || keyCode == ENTER) && line < lines.length-1) {
    line++;
  }
  if (keyCode == UP && line > 0) {
    line--;
  }
  if (keyCode == BACKSPACE) {
    if (lines[line].length() > 0) {
      lines[line] = lines[line].substring(0, lines[line].length()-1);
    }
  }
}