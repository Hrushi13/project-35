//Create variables here
var lastFed
function preload()
{
 //load images here
 happyDog=loadImage("images/dogImg.png");
 sadDog=loadImage("images/dogImg1.png");
 
}

function setup() {
	createCanvas(1000, 500);
  database=firebase.database()
  dog=createSprite(250,300,150,150);
  dog.addImage(sadDog);
  foodStock=database.ref("food");
  foodStock.on("value",readStock);
  dog.scale=0.2

  foodObject=new Food()
  feed=createButton("feed")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addFood=createButton("add")
  addFood.position(800,95)
  addFood.mousePressed(addf)
}
function feedDog(){
  dog.addImage(happyDog);
  if(foodObject.getfoodStock()<=0){
    foodObject.updatefoodStock(0);
  }
  else {
    foodObject.updatefoodStock(foodObject.getfoodStock()-1)
  }
  database.ref("/").update({
    food:foodObject.getfoodStock(),
    feedTime:hour()
  })
}
function readStock(data){
foodStock1=data.val();
foodObject.updatefoodStock(foodStock1)
}

function addf(){
  foodStock1++
  database.ref("/").update({
    food:foodStock1
      })

  
}

function draw() {  
background(46,139,87);
/*if (keyDown (UP_ARROW)){
writeStock(foodStock1);
dog.addImage(happyDog);

}*/
database.ref("feedTime").on("value",function(data){
  lastFed=data.val()
})
if(lastFed>=12){
  text("lastFed:"+lastFed%12+"pm",350,50);
}
else if(lastFed==0){
  text("lastFed:12 am",350,50);
}
else{
  text("lastFed:"+lastFed+"am",350,50);
}
  drawSprites();
  //add styles here
  fill(255,255,254);
   stroke("black"); 
  text("Food remaining : "+foodS,170,200);
   textSize(13);
    text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}
/*function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref("/").update({
    food:x
  })
}*/

