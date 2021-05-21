const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var ninjaRun,ninjaJump,ninjaDead,ninjaIdle;
var zombie, zombieIdle;

var ninja;

var bgImg,bg;

var tile1, tile2, tile3, tile4, tile5; 

var edges, ground, tilesGroup;

var welcome,welcomeImg;

var greet;

var knife, knifeImg;

const START = 0;
const PLAY = 1;
const END = 2;
var gameState = 0;

function preload()
{
	ninjaRun = loadAnimation("ninja/Run__000.png",  "ninja/Run__002.png", "ninja/Run__003.png",
 	 "ninja/Run__004.png", "ninja/Run__006.png", "ninja/Run__008.png", "ninja/Run__009.png");

	 ninjaDead = loadAnimation("ninja/Dead__000.png",  "ninja/Dead__002.png", "ninja/Dead__003.png",
	 "ninja/Dead__004.png", "ninja/Dead__006.png", "ninja/Dead__008.png", "ninja/Dead__009.png");

	 ninjaJump = loadAnimation("ninja/Jump__000.png", "ninja/Jump__001.png", "ninja/Jump__002.png", 
	 "ninja/Jump__003.png","ninja/Jump__004.png", "ninja/Jump__005.png", "ninja/Jump__006.png",
	 "ninja/Jump__007.png", "ninja/Jump__008.png","ninja/Jump__009.png");

	  ninjaIdle = loadAnimation("ninja/Idle__000.png", "ninja/Idle__001.png", "ninja/Idle__002.png",
	 "ninja/Idle__003.png", "ninja/Idle__005.png", "ninja/Idle__004.png", "ninja/Idle__006.png",
	 "ninja/Idle__007.png", "ninja/Idle__008.png", "ninja/Idle__009.png");

	 tile1 = loadImage("tiles/tile1.png");
	 tile2 = loadImage("tiles/tile2.png");
	 tile3 = loadImage("tiles/tile3.png");
	 tile4 = loadImage("tiles/tile4.png");
	 tile5 = loadImage("tiles/tile5.png");

 	 bgImg = loadImage("graveYard.jpg");

	 knifeImg = loadImage("Kunai.png");

	 welcomeImg = loadImage("welcome.png");

	 zombieImg = loadImage("zombie/Idle (1).png");

}

function setup() {
	createCanvas(displayWidth - 50, displayHeight - 50);

	engine = Engine.create();
	world = engine.world;

//	bg = createSprite(displayWidth/2,displayHeight/2,0,0);
//	bg.addImage(bgImg);
//	bg.scale = 2.6;
//	bg.velocityX = -3;
	
	ninja = createSprite(150,displayHeight/2,20,20);
	ninja.addAnimation("n_idle",ninjaIdle);
	ninja.addAnimation("n_run",ninjaRun);
	ninja.scale = 0.25;

 	ground = createSprite(150,displayHeight/2 + 10,100,10);
	ground.shapeColor = "black";
	edges = createEdgeSprites();

	welcome = createSprite(displayWidth/2,displayHeight/4);
	welcome.scale = 1.75;
	welcome.addImage(welcomeImg);
	
	tilesGroup = new Group();

	ninja.debug = true;
	ninja.setCollider("rectangle",0,0,200,400);

	Engine.run(engine);
  
}


function draw() {
 
 background("white");

 if(gameState === START){
 
	// bg.visible = false;
	 ninja.visible = false;
	 ground.visible = false;
	 welcome.visible = true;

	 textSize(50);
	 text("hi",displayWidth/2,displayHeight/2);
 
 	 if(keyDown("r")){
	     gameState = 1;
 	    }
 }

 if(gameState === PLAY){
  
 ninja.collide(edges);
 ninja.collide(ground);
 ninja.collide(tilesGroup);

 //bg.visible = true;
 ninja.visible = true;
 ground.visible = true;
 welcome.visible = false;

  //if(bg.x < 0){
//		bg.x = bg.width/2;		
 //}

 if(keyWentDown("space") && ninja.y >= displayHeight/2 ){
	ninja.velocityY = -10;
 }
 
// if(ninja.velocityY < -10){
//	ninja.velocityY = 0;
 //}
 ninja.velocityY = ninja.velocityY + 0.5;
 if(keyDown("s")){
	
	ground.destroy();
	ninja.changeAnimation("n_run");
 }

 spawnTiles();

 
  }
  drawSprites();
 
}


 function spawnTiles(){
	if (frameCount % 100 === 0) {
		var tile = createSprite(displayWidth + 10,200);
		tile.y = Math.round(random(displayHeight - 100,200));
		var pointer = createSprite(displayWidth + 10,tile.y - 80);
		var r = Math.round(random(1,2));
		switch(r){
			case 1:pointer.addImage(knifeImg);
				   pointer.scale = 0.5
			break;
			case 2:pointer.addImage(zombieImg);
				   pointer.scale = 0.25;
			break;
			default: break;
		}
	
		
		var rand = Math.round(random(1,5));
     switch(rand) {
      case 1: tile.addImage(tile1);
              break;
      case 2: tile.addImage(tile2);
              break;
      case 3: tile.addImage(tile3);
              break;
      case 4: tile.addImage(tile4);
              break;
      case 5: tile.addImage(tile5);
              break;		  
      default: break;
     }
	 tile.scale = 0.5;
	
	 tile.velocityX = -3;
	 pointer.velocityX = -3;
	 tilesGroup.add(tile);
	 tile.lifetime = 500;
	 pointer.lifetime = 500;


	  }
	}