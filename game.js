function Game(ship, scoreboard) {
  this.debug = false;

  this.ship = ship;
  this.scoreBoard = scoreboard;

  this.reset = function () {
    this.gameActive = false;
    this.scoreBoard.reset();
    this.meteors = [];
    this.projectiles = [];

    this.meteorsDensity = 0.985;
    this.meteorsDensityInc = 0.0001;

    this.meteorsMinSpeed = 0.25;
    this.meteorsMinSpeedInc = 0.0001;

    this.meteorsMaxSpeed = 2;
    this.meteorsMaxSpeedInc = 0.0001;

    this.meteorsMinSize = 25;
    this.meteorsMaxSize = 125;
  };

  this.isActive = function () {
    return this.gameActive;
  };

  this.start = function () {
    this.gameActive = true;
  };

  this.showWelcomeScreen = function () {
    background(255);
    textFont("Courier New");
    fill(0);
    noStroke();
    textAlign(CENTER);
    welcome_msg = "";
    textSize(random(65, 68));
    text(welcome_msg, width / 2, height / 3);
    action_msg = "Click to start, click to play.";
    textSize(25);
    text(action_msg, width / 2, height / 2);
    score_msg = "Your previous score was " + scoreBoard.score + ".";
    textSize(35);
    text(score_msg, width / 2, (height / 4) * 3);
  };

  this.createNewMeteor = function () {
    if (random() > this.meteorsDensity) {
      // pick random color, speed, size and horizontal position
      col = color(random(255), random(255), random(255), 50);
      speed = random(this.meteorsMinSpeed, this.meteorsMaxSpeed);
      size = random(this.meteorsMinSize, this.meteorsMaxSize);
      x = random(0 + size / 2, width - size / 2);
      // vertical position is fixed
      y = -size / 2;
      // crzyness is just a visual FX
      crazyness = random(0.5, 1.5);
      //create a new "meteor" (a Bubble)
      this.meteors.push(new Bubble(x, y, size, speed, col, crazyness));
    }
  };

  this.updateAndDisplayMeteors = function () {
    for (var i = this.meteors.length - 1; i >= 0; i--) {
      this.meteors[i].move();
      this.meteors[i].display();
    }
  };

  this.updateAndDisplayProjectiles = function () {
    for (var i = this.projectiles.length - 1; i >= 0; i--) {
      this.projectiles[i].move();
      this.projectiles[i].display();
    }
  };

  this.updateAndDisplayShip = function () {
    this.ship.updatePosition();
    this.ship.display();
  };

  this.displayScoreboard = function () {
    this.scoreBoard.display();
  };

  this.shoot = function () {
    this.projectiles.push(this.ship.shoot());
  };

  this.stopIfMeteorHitGround = function () {
    // iterate through all the meteors
    for (var i = this.meteors.length - 1; i >= 0; i--) {
      // when a meteor hits the ground, it's game over
      if (this.meteors[i].y > height) {
        this.gameActive = false;
      }
    }
  };

  this.removeLostProjectiles = function () {
    for (var i = this.projectiles.length - 1; i >= 0; i--) {
      if (this.projectiles[i].y < 0) this.projectiles.splice(i, 1);
    }
  };

  this.detectSuccessfullShots = function () {
    for (var i = this.meteors.length - 1; i >= 0; i--) {
      for (var j = this.projectiles.length - 1; j >= 0; j--) {
        if (this.meteors[i].intersects(this.projectiles[j])) {
          this.meteors[i].destroy();
          this.projectiles[j].destroy();
          this.scoreBoard.incrementScore();
          // increment game difficulty! :)
          this.meteorsMinSpeed += this.meteorsMinSpeedInc;
          this.meteorsMaxSpeed += this.meteorsMaxSpeedInc;
          this.meteorsDensity -= this.meteorsDensityInc;
        }
      }
    }
  };

  this.removeKilledMeteors = function () {
    // remove meteors scheduled for removal
    for (var i = this.meteors.length - 1; i >= 0; i--) {
      if (!this.meteors[i].alive) this.meteors.splice(i, 1);
    }
  };

  this.removeUsedProjectiles = function () {
    for (var i = this.projectiles.length - 1; i >= 0; i--) {
      if (!this.projectiles[i].alive) this.projectiles.splice(i, 1);
    }
  };

  this.setDebug = function (v) {
    this.debug = v;
  };

  this.showDebugInfo = function () {
    if (this.debug == true) {
      print("# meteors: " + this.meteors.length);
      print("# projectiles: " + this.projectiles.length);
    }
  };
}
