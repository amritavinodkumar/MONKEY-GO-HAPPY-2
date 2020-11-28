var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey, monkeyRunning;
var ground,movingGround;
var banana,obstacle,obstaclesGroup,bananaGroup,spawnBanana,spawnObstacles;
var score, survivalTime;
var gameOver;

function preload(){
  
  monkeyImage = loadImage("sprite_2.png")
  monkeyRunning = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")  
  
  obstaclesImage = loadImage("obstacle.png")
  bananaImage = loadImage("banana.png")
  gameOverImage = loadImage("gameover-1.png");
  restartImage = loadImage("restart_2.png")
  
  collectingBananaSound = loadSound("collectingSound.mp3");
  crashingSound = loadSound("Crash Sound.mp3");
  forestBackground = loadImage("forestBackground2.png");
 
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  invisibleGround = createSprite(20,435,990,12);
   
  background = createSprite(width/2,height-420,width,120);
  background.addImage(forestBackground);
  background.scale = 2.2;
  background.velocityX = -(4 + 5*score/100) ;
  background.x = width/2;
  
  monkey = createSprite(100,height-223,20,20);
  monkey.addAnimation("moving", monkeyRunning)
  monkey.scale = 0.14;
  
  gameOver = createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1.7;
  restart = createSprite(width/2,height/2+40)
  restart.addImage(restartImage);
  restart.scale = 0.28;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
 
  monkey.setCollider("rectangle", 0,3,240,370)
  monkey.debug = false;
  
}    

score = 0;
var survivalTime = 0;

function draw(){
           
  if (gameState === PLAY){
    switch(score){
      case 5 : monkey.scale = 0.16;
              break;
      case 10 : monkey.scale = 0.18;         
              break;
      case 15 : monkey.scale = 0.20;        
              break;
      case 20 : monkey.scale = 0.22; 
              break;
      case 25 : monkey.scale = 0.24; 
              break;        
  }
    
      gameOver.visible = false;
      restart.visible = false;
      monkey.visible = true;
                 
      background.velocityX = -4;
      if(background.x<0){
    background.x=background.width/2
  }
    
      if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      collectingBananaSound.play();
      score = score + 1;
   }
  
   if((touches.length > 0 || keyDown("space")) 
    && monkey.y>= 380){
    monkey.velocityY = -16;
    touches = [];
    
  }    
      
   monkey.velocityY = monkey.velocityY + 0.9;
            
}

  invisibleGround.visible = false;
  monkey.collide(invisibleGround);
    
  if(monkey.isTouching(obstacleGroup)){ 
     
   gameState = END;
   crashingSound.play();
    
}
  
  if (gameState === END){
    
    gameOver.visible = true;
    restart.visible = true;
    monkey.visible = false;
    
    monkey.scale = 0.14;
          
    if(touches.length>0 || mousePressedOver(restart)){
      reset();
      touches = [];
    }
    
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0); 
    background.velocityX = 0;
               
  }
  
  
  
  drawSprites();
  
  stroke("yellow")
  textSize(30);
  fill("yellow")
  text("Score: "+score,width-410,50)
  
  spawnObstacles();
  spawnBanana();
   
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  var survivalTime = 0;
  score = 0;
  
}

function spawnObstacles(){
  
  if(frameCount % 120 === 0){
    
    var obstacle = createSprite(750,height-95,20,20);
    obstacle.addImage(obstaclesImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -(8+5*score/100);
    obstacle.lifetime = 150;
    obstacle.depth=monkey.depth;
    monkey.depth+= 1;
    
   obstacleGroup.add(obstacle);
    
  }
}

function spawnBanana(){
  
   if(frameCount % 70 === 0){
    
    var banana = createSprite(720,height-285,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.13;
    banana.velocityX = -(8+5*score/100);
    banana.lifetime = 150;
     
    bananaGroup.add(banana)
     
  }
}
