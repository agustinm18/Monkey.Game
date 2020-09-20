var START;
var PLAY;
var gameState = START;
var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function setup() {
  createCanvas(400,400);
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -8;
  ground.x = ground.width/2;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
}


function draw() {
  background("white");

  if (ground.x < 0){
    ground.x = ground.width/2;
}
  
  if (keyDown("space")&& monkey.y >= 300){
    monkey.velocityY = -12;
   
}
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score=score +1;
}
  if(monkey.isTouching(obstacleGroup)){
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    score = 0;
    survivalTime = 0;
}
  
  stroke("yellow");
  textSize(14);
  fill("yellow");
  text("Score: " + score, 300, 50);
  
  stroke("black");
  textSize(15);
  fill("black");
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  text("Survival Time: " + survivalTime, 100, 50);
  
  food();
  
  obstacleSpawn();
  
  drawSprites();
}

function food(){
if(frameCount%80===0){  
  banana = createSprite(400,200,20,20);
  banana.addImage(bananaImage);
  banana.scale = 0.09; 
  
  banana.y = Math.round(random(150,240))
  banana.velocityX = -(5 +score/5);
  banana.lifetime = 200;
  
  bananaGroup.add(banana);
}
}

function obstacleSpawn(){
if (frameCount % 300 ===0){
  obstacle = createSprite(400,330,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.09;
  
  obstacle.velocityX = -(5 +score/3);
  obstacle.lifetime = 200;
  
  obstacleGroup.add(obstacle);
}
}