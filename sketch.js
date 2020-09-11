var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacle1,clouds,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");                      
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  groundImage = loadImage("ground2.png");
  clouds = loadImage("cloud.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  
  cloudGroup = new Group();
  obstaclesGroup = new Group();
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background(255);
    
  if(keyDown("space") && trex.isTouching(ground)) {
    trex.velocityY = -12;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if (frameCount%100 == 0) {
  SpawnObstacles();
  SpawnClouds();
  }
  
  trex.collide(invisibleGround);
  drawSprites();
}

function SpawnObstacles(){
  var Obstacles = createSprite(600,165,20,20);       
  var R =(Math.round(random(1,6)));
  switch(R){
    case 1:Obstacles.addImage(obstacle1);
      break ;
    case 2:Obstacles.addImage(obstacle2);
      break ;
    case 3:Obstacles.addImage(obstacle3);
      break ;
    case 4:Obstacles.addImage(obstacle4);
      break ;
    case 5:Obstacles.addImage(obstacle5);
      break ;
    case 6:Obstacles.addImage(obstacle6);
      break ;  
    default:
      break;
  }
  Obstacles.velocityX = -6;
  Obstacles.scale = 0.65;
  Obstacles.lifetime = 110;
  obstaclesGroup.add(Obstacles);
}

function SpawnClouds(){
  var cloud = createSprite(600,random(50,100),20,20);
  cloud.addImage(clouds);
  cloud.velocityX = random(-7,-4);
  cloud.scale = 0.8;
  trex.depth  = cloud.depth + 1;
  cloud.lifetime = 110;
  cloudGroup.add(cloud);
}