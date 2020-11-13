//Create variables here
var database,foodStock,dog,dogImage,dogImage1,dog1;
var food;//value 20
var gameState = "end";


function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  dogImage2 = loadImage("images/dogImg1.png");  
}

function setup()
{
 database=firebase.database();
  console.log(database);

  createCanvas(800, 700);

  dog = createSprite(650,350,20,20);
  dog.addImage("hello",dogImage);
  dog.scale = 0.3;

  dog1 = createSprite(650,350,20,20);
  dog1.addImage("he4llo",dogImage2);
  dog1.scale = 0.3;

  


  foodStock=database.ref('Food'); // == food in database which is 20.
  foodStock.on("value",readStock); // updating value wheneever it is changed in foodStock  by observing and tellng readStock to update.
  
}


function draw() 
{  
  background(46, 139, 87);
  if (keyDown(UP_ARROW)&&gameState ==="end") {
   
    dog.visible = false;
    dog1.visible = true;
 

    writeStock(food);
  } else{
    
    dog1.visible = false;
    dog.visible = true;
    gameState=== "false";
  }


push();
  textSize(30);
  fill(0);
  text (" score : " + food,50,50);
pop();

  drawSprites();
  //add styles here

}
function readStock(data)
{
  //the value from the database.
    food=data.val();
    console.log(food);
   
}
function writeStock(x) 
{
    //Writing things into the database.
    if (x <= 0) {
      x = 20;
    } else {
      x = x-1;
    }
    database.ref('/').update({
    Food : x,});
}




