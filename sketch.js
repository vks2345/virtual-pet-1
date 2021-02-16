//Create variables here
var dog;
var happyDog;
var database
var foodS, foodStock;

function preload()
{
	//load images here
  dog= loadImage("images/dogImg.png");
  happyDog= loadImage("images/dogImg1.png");

}

function setup() {
  
  database= firebase.database();
  createCanvas(500, 500);
  dogSprite= createSprite(250,300,10,10);
  dogSprite.addImage(dog);
  dogSprite.scale= 0.2;

  foodStock= database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  text("food remaining : "+ foodS, 170,200);
  text("note: press up arrow key to feed the dog the milk", 50,20);
  
  
}

function readStock(data){
  foodS= data.val();

}

function writeStock(x){
  if(x<=0){
  x=0;
  }else{
     x=x-1;
  }
  database.ref('/').update({
    Food: x
  })

}



