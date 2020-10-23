var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 400);
  monkey = createSprite(60, 335);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(300, 370, 1200, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
}


function draw() {
  background("white");
  text("Survival Time:" + survivalTime, 360, 40);
  stroke("black")
  textSize(20);
  fill("black");
  survivalTime = Math.round(frameCount / frameRate())

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  if (keyDown("space") && monkey.y >= 261) {
    monkey.velocityY = -12;

  }
  if (FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
    survivalTime = survivalTime + 5;
  }
  if (obstacleGroup.isTouching(monkey)) {
    monkey.velocityY=0;
    ground.velocityX=0;
    FoodGroup.setVelocityX(0);
  obstacleGroup.setVelocityX(0);
    text("game over,you lose",200,200);
  }

  monkey.velocityY = monkey.velocityY + 0.6
  monkey.collide(ground);



  drawSprites();
  
  spawnObstacles();
  spawnFood();
}

function spawnObstacles() {
  if (frameCount % 200 === 0) {
    obstacle = createSprite(600, 350);
    obstacle.velocityX = -3;
    obstacle.addImage(obstacleImage);
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.1;

  }
}

function spawnFood() {

  if (frameCount % 170 === 0) {
    banana = createSprite(600, 150);
    banana.y = Math.round(random(200, 300));
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.lifetime = 300;
    FoodGroup.add(banana);
    banana.scale = 0.1;
    FoodGroup.collide(monkey);
  }
}