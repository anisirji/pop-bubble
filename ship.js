function Ship(x, y) {
  this.x = x;
  this.y = y;

  this.width = 50;
  this.height = 100;

  this.display = function () {
    fill(color(25, 243, 102, 50));
    stroke(0);
    strokeWeight(1);
    triangle(
      this.x - this.width,
      this.y,
      this.x,
      this.y - this.height,
      this.x + this.width,
      this.y
    );
  };

  this.updatePosition = function () {
    this.x = mouseX;
    this.y = height - 10;
  };

  this.shoot = function () {
    projectile = new Bubble(this.x, this.y - 50, 20, -10, "red", 0);
    return projectile;
  };
}
