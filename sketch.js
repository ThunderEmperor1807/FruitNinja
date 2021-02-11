var sword, swordI;

var s;
var f1I, f2I, f3I, f4I;
var a, a1, a2;
var sG, aG;
var dojo, dojoI;
var w1, w2, w3, w4;

var wh1, wh2, wh3;
//var r1,r2,r3   

var whI;
var rI;

var knifeSound;

var lifeState, gameState;

var gameOver, gameOverI, gameOverS;

var score;

function preload() {

  swordI = loadImage("sword.png");

  f1I = loadImage("fruit1.png");
  f2I = loadImage("fruit2.png");
  f3I = loadImage("fruit3.png");
  f4I = loadImage("fruit4.png");

  a1 = loadImage("alien1.png");
  a2 = loadImage("alien2.png");

  dojoI = loadImage("dojo.jpg");

  whI = loadImage("blue_cross.png");
  rI = loadImage("red_cross.png");

  gameOverI = loadImage("gameover.png")
  gameOverS = loadSound("gameover.mp3")

  knifeSound = loadSound("knifeSwooshSound.mp3");
}

function setup() {

  createCanvas(600, 400);

  score = 0;

  lifeState = 3;
  gameState = "play"

  sword = createSprite(300, 300);
  sword.addImage("sword", swordI);
  // sword.debug=true
  sword.setCollider("rectangle", 10, -15, 95, 30, -45);

  dojo = createSprite(300, 200);
  dojo.addImage(dojoI);
  dojo.scale = 2.2;
  dojo.depth = sword.depth - 1;

  w1 = createSprite(0, 200, 3, 400);
  w2 = createSprite(300, 0, 600, 3);
  w3 = createSprite(600, 200, 3, 400);
  w4 = createSprite(300, 400, 600, 3);

  sG = createGroup();
  aG = createGroup();

  wh1 = createSprite(510, 20);
  wh1.addImage(whI);

  wh2 = createSprite(540, 20);
  wh2.addImage(whI);

  wh3 = createSprite(570, 20);
  wh3.addImage(whI);


}

function draw() {

  background("black");

  if (gameState == "play") {

    sword.visible = true
    sword.x = mouseX;
    sword.y = mouseY;

    if (sG.isTouching(sword)) {
      sG.destroyEach();
      knifeSound.play();
      score += 1
    }

    if (lifeState == 3 || lifeState == 2 || lifeState == 1) {
      if (aG.isTouching(sword)) {
        aG.destroyEach();
        lifeState = 0;
        wh1.addImage(rI);
        wh1.x -= 7;
        wh2.addImage(rI);
        wh2.x -= 5;
        wh3.addImage(rI);
      }
    }
    if (lifeState == 3)
      if (sG.isTouching(w2) || sG.isTouching(w4)) {
        sG.destroyEach();
        lifeState = 2;
        wh1.addImage(rI);
        wh1.x -= 7;
      }

    if (lifeState == 2)
      if (sG.isTouching(w2) || sG.isTouching(w4)) {
        sG.destroyEach();
        lifeState = 1;
        wh2.addImage(rI);
        wh2.x -= 7;
      }

    if (lifeState == 1)
      if (sG.isTouching(w2) || sG.isTouching(w4)) {
        sG.destroyEach();
        lifeState = 0;
        wh3.addImage(rI);

      }

    if (lifeState == 0) {
      gameState = "end"
      gameOverS.play()




    }

    f();
    alien();

    sword.bounceOff(w1);
    sword.bounceOff(w2);
    sword.bounceOff(w3);
    sword.bounceOff(w4);
  }

  if (gameState == "end") {
    sG.destroyEach()
    aG.destroyEach()
    gameOver = createSprite(300, 200)
    gameOver.addImage(gameOverI)
    sword.visible = false
  }




  drawSprites();

  fill("white")
  textSize(30)
  text("Score:" + score, 60, 50)

  if (gameState == "end") {
    fill("white")
    textSize(30)
    text("Your score is " + score, 200, 250)
  }

}

function reset() {


}

function f() {

  var rand = Math.round(random(50, 550));
  var ran = Math.round(random(40, 360));
  var rando = Math.round(random(1, 4));

  if (frameCount % 45 == 0) {
    s = createSprite(rand, ran);
    s.scale = 0.3;

    if (s.y <= 200) {
      s.velocityY = (15 + (score / 4));
    }

    if (s.y > 200) {
      s.velocityY = -(15 + (score / 4));
    }

    sG.add(s);
    // s.debug=true;

    if (s.x > 300) {
      s.velocityX = -5;
    }

    if (s.x < 300) {
      s.velocityX = 5
    }

    switch (rando) {
      case 1:
        s.addImage(f1I)
        break
      case 2:
        s.addImage(f2I)
        break
      case 3:
        s.addImage(f3I)
        break
      case 4:
        s.addImage(f4I)
        break
    }
  }
}

function alien() {

  var rand = Math.round(random(50, 550))
  var rando = Math.round(random(1, 2))

  if (frameCount % 100 == 0) {
    a = createSprite(rand, 400)
    a.velocityY = -(5 + (score / 10))
    a.scale = 1.5
    aG.add(a)
    // a.debug=true
    a.setCollider("circle", 0, 0, 25)

    if (a.x > 300) {
      a.velocityX = -2
    }

    if (a.x < 300) {
      a.velocityX = 2
    }

    switch (rando) {
      case 1:
        a.addImage(a1)
        break
      case 2:
        a.addImage(a2)
        break
    }
  }
}