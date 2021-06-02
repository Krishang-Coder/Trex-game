var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudImage;
var Score;
var cloudgroup, obstaclegroup;
var gameState = 1;
var GameOver, restart, Gameoverimg, restartimg
var GameOverSound, JumpSound, CheckpointSound
var y = 0

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  cloudImage = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  Ob1 = loadImage("obstacle1.png");
  Ob2 = loadImage("obstacle2.png");
  Ob3 = loadImage("obstacle3.png");
  Ob4 = loadImage("obstacle4.png");
  Ob5 = loadImage("obstacle5.png");
  Ob6 = loadImage("obstacle6.png");
  Gameoverimg = loadImage("gameOver.png")
  Restartimg = loadImage("restart.png")
  GameOverSound = loadSound("die.mp3")
  JumpSound = loadSound("jump.mp3")
  CheckpointSound = loadSound("checkPoint.mp3")
    
}

function setup() {
  createCanvas(600, 200);
  // Score
  Score = 0;
  //create a trex sprite
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colliding", trex_collided);
  
  trex.scale = 0.5;

  //create a ground sprite
  ground = createSprite(200, 180, 600, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  

  //Creating and Invisible Ground
  invisground = createSprite(200, 190, 1200, 20);
  invisground.visible = false;

  cloudgroup = createGroup();
  obstaclegroup = createGroup();
 // trex.setCollider("circle", 0, 0, 50)
  
  restart = createSprite(300,140)
  restart.addImage(Restartimg)
  restart.scale = 0.5
  GameOver = createSprite(300,100)
  GameOver.addImage(Gameoverimg)
  GameOver.scale = 0.7
  
  
}

function draw() {
  background(180);

  text("Score:" + Score, 500, 20);
  

  if (gameState === 1) {
    restart.visible = false
    GameOver.visible = false
    //ground.velocityX = -4;
    ground.velocityX = -(3.75 +  Score / 100)
    Score = Score + Math.round(getFrameRate() / 60)
    
    if(Score > 0 && Score % 500 === 0){
      CheckpointSound.play()
     // if(Score > 0 && Score % 100 === 0){
       // obstaclegroup.setVelocityXEach(Score + y)
       // y = y + 1
     // }
    }
    if (keyDown("space") && trex.y > 156) {
      trex.velocityY = -13;
      JumpSound.play()
    }
    trex.velocityY = trex.velocityY + 0.8;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    spawnclouds();
    spawnObstacles();
    if (obstaclegroup.isTouching(trex)){
      GameOverSound.play()
      gameState = 2
      
    }
  }
  
  else if(gameState === 2){
    
    restart.visible = true
    GameOver.visible = true
    ground.velocityX = 0
    cloudgroup.setVelocityXEach(0)
    obstaclegroup.setVelocityXEach(0)
    trex.velocityY = 0
    cloudgroup.setLifetimeEach(-1)
    obstaclegroup.setLifetimeEach(-1)
    trex.changeAnimation("colliding", trex_collided)
    
    if(mousePressedOver(restart)){
      gameState = 1
      cloudgroup.destroyEach()
      obstaclegroup.destroyEach()
      trex.changeAnimation("running", trex_running)
      Score = 0
    }
  }

  trex.collide(invisground);
  

  drawSprites();
}

function spawnclouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 30, 10);
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.y = Math.round(random(20, 100));
  //  cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
  //  console.log(cloud.depth);
  //  console.log(trex.depth);
    cloud.lifetime = 200;
    cloudgroup.add(cloud);
    cloud.depth = GameOver.depth = trex.depth
    GameOver.depth = cloud.depth + 1
    trex.depth = cloud.depth + 1
  }
}

function spawnObstacles() {
  if (frameCount % 120 === 0) {
    ob = createSprite(600, 160, 10, 30);
    
    ob.velocityX = -(4 +  Score / 100);
    Obstacle = Math.round(random(1, 6));
    switch (Obstacle) {
      case 1:
        ob.addImage(Ob1);
        break;
      case 2:
        ob.addImage(Ob2);
        break;
      case 3:
        ob.addImage(Ob3);
        break;
      case 4:
        ob.addImage(Ob4);
        break;
      case 5:
        ob.addImage(Ob5);
        break;
      case 6:
        ob.addImage(Ob6);
        break;
    }
    ob.scale = 0.5;
    ob.lifetime = 150;
    obstaclegroup.add(ob);
  }
}
