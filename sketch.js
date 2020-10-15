var monkey , monkey_running;

var bananaGroup, obstacleGroup;

var ground;

var invisibleGround;

var score;
var survivalTime = 0;

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png",
  "sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png",
        "sprite_6.png","sprite_7.png","sprite_8.png")
  
  banana_food = loadImage("banana.png");
  obstacle_break = loadImage("obstacle.png");
 
  ground_1 = loadImage("forest ground.jpg");
  
  game_over = loadImage("GAMEOVER.jpg");
  
  jumpSound = loadSound("Mario_Jumping-Mike_Koenig-989896458.mp3");
  eatSound = loadSound("Blop-Mark_DiAngelo-79054334.mp3");
  crashSound = loadSound("Cuckoo Clock-SoundBible.com-1776874523.mp3");
}

function setup() {
  createCanvas(650,400);
  
  ground = createSprite(340,200,680,400);
  ground.addImage(ground_1);
  ground.x = ground.width /2;
  
  
  monkey = createSprite(80,320,45,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.15;
  
  invisibleGround = createSprite(300,380,600,20)
  invisibleGround.visible = false;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true;
  
  score = 0;
}

function draw() {
  background(180);
  
  ground.velocityX = -4;

  if(ground.x < 150){
    ground.x = ground.width /2;
  }
    if(keyDown("space") && monkey.y >= 100){
      monkey.velocityY = -12;
     jumpSound.play();
    }
    
    if(bananaGroup.isTouching(monkey)){
      score = score+1;
      bananaGroup.destroyEach();
      eatSound.play();
    }  
    
  if(obstacleGroup.isTouching(monkey)){
    score = score -2;
    obstacleGroup.destroyEach();
    crashSound.play();
  }
  monkey.velocityY = monkey.velocityY + 0.8
    
  spawnbanana();
  spawnobstacle();
  
  
  monkey.collide(invisibleGround);
  
  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+score,510,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,50,50);
}

function spawnbanana(){
  if(frameCount % 80 === 0){
var banana = createSprite(600,120,50,50) ; 
     banana.y = Math.round(random(120,200));
     banana.addImage(banana_food);
    
     banana.scale = 0.1;
     banana.velocityX = -8;
    
     banana.lifetime = 390;
    
     ground.depth = banana.depth;
     monkey.depth = banana.depth +1;
    
     bananaGroup.add(banana);
  }
}

function spawnobstacle(){
  if(frameCount % 300 === 0){
var obstacle = createSprite(600,320,35,40);
var rand = Math.round(random(1,6));
    obstacle.addImage(obstacle_break);
    
    obstacle.scale = 0.2;
    obstacle.velocityX = -8;
    
  obstacle.setCollider("rectangle",0,0,obstacle.width,obstacle.height);
  obstacle.debug = true;
    
    obstacle.lifetime = 500;
    
    ground.depth = obstacle.depth;
    monkey.depth = obstacle.depth +1;
    
    obstacleGroup.add(obstacle);
 }
  
}







