var ground;
var bananaImage;
var obstacleImage;
var FoodGroup;
var obstacleGroup;
var jungle;
var backImage;
var player;
var player_running;
var invisibleGround;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var life = 0;

function preload(){
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup(){
  createCanvas(500, 400);
  //Reset the background
  //start from center of image to reset it.
  jungle = createSprite(200,200,400,400);
  jungle.addImage(backImage);
  jungle.velocityX = -2;
  jungle.x = jungle.width/2;
  
  ground = createSprite(400,400,600,10);
  ground.velocityX = -2;
  ground.x = ground.width/2;
  ground.visible= true;
  
  player = createSprite(80,400,20,20);
  player.addAnimation("running",player_running);
  player.scale = 0.09;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}
function draw(){
   background("white")
  textSize(20);
fill("brown");

  
  if(gameState === PLAY){
    
    if(keyDown("space")){
      player.velocityY = -10;
    }
    //ground.velocityX = -2;
    player.velocityY = player.velocityY + 0.8;
    
   if(jungle.x < 0){
     //jungle.x = 290;
     jungle.x = jungle.width/2;
   }
    if(ground.x < 0){
   ground.x = ground.width/2; 
  }
  player.collide(ground);
  
    
  switch(score){
    case 10: player.scale = 0.12;
     break;
      
      case 20: player.scale = 0.14;
      break;
      
      case 30: player.scale = 0.16;
      break;
              
      case 40: player.scale = 0.18;
      break;
      
      default: break;   
      
  }
 if(FoodGroup.isTouching(player)){
    score = score + 2;
    FoodGroup.destroyEach();
 }
         
  if(obstacleGroup.isTouching(player)){
    player.scale = 0.07;
    life = life + 1;
    //obstacleGroup.destroyEach();
    //gameState = END;
  }
  
  if(obstacleGroup.isTouching(player) && life > 21)
      {
        console.log(life);
        gameState = END;
      }
    food();
  Obstacle(); 
   
  }

 else if(gameState === END){
    player.velocityY = 0;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    //obstacleGroup.setLifetimeEach(-1);
   // FoodGroup.setLifetimeEach(-1);
    FoodGroup.destroyEach();
    jungle.velocityX = 0;
  }
  drawSprites(); 
  
  text("Score : "+score,50,50);

}


function food()
{
  if(World.frameCount % 80 === 0){
    var banana = createSprite(200,200,20,20);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 80;
    FoodGroup.add(banana);
  }
}

function Obstacle(){
  if(World.frameCount % 300 === 0){
    var obstacle = createSprite(400,370,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}



