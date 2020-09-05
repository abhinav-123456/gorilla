var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey_running, monkey, monkey_collide;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivaltime;
var ground;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  monkey_collide = loadAnimation("sprite_collide.png")
}



function setup() {
  createCanvas(600, 300);

  monkey = createSprite(50, 255, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collide);
  monkey.scale = 0.1

  ground = createSprite(5, 287, 1600, 25);
  ground.x = ground.width / 2;

  FoodGroup = new Group();
  obstacleGroup = new Group();

  monkey.setCollider("rectangle", 0, 0, 250, monkey.width);
  //monkey.debug=true

  score = 0
  survivaltime = 0
}


function draw() {
  background("lightgreen")

  text("Score: " + score, 300, 20);

  text("survivalTime:" + survivaltime, 100, 20);

  if (gameState === PLAY) {
    if (keyDown("space") && monkey.y >= 240) {
      monkey.velocityY = -15;
    }
    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      // knifesound.play();
      score = score + 1
    }
    survivaltime = survivaltime + Math.round(getFrameRate() / 60)
    if (obstacleGroup.isTouching(monkey)) {
      gameState = END
      // knifesound.play();
      //  score=score+1
    }
    monkey.velocityY = monkey.velocityY + 0.8
    bananas();
    obstacles();

    monkey.collide(ground);
  }

  if (gameState === END) {
    score = 0
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);

    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    monkey.velocityY = 0

    monkey.changeAnimation("collided", monkey_collide);

    monkey.collide(ground);
  }

  drawSprites();
}

function bananas() {
  if (frameCount % 90 === 0) {
    banana = createSprite(600, 10, 10, 10);
    banana.y =
      Math.round(random(120, 200));
    banana.addImage("b", bananaImage);
    banana.scale = 0.1 / 2;
    banana.velocityX = -5;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 160 === 0) {
    obstacle = createSprite(600, 265, 10, 10);
    obstacle.x = Math.round(random(600, 250));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -5;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}