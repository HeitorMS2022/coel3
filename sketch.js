const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, rope2, rope3,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3

var bg_img;
var food;
var rabbit;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
function preload(){
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png"); 
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}
function setup() {
  createCanvas(500,700);
  frameRate(80);
  bk_song.play();
  bk_song.setVolume(0.5);
  engine = Engine.create();
  world = engine.world;
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  button = createImg('cut_btn.png');
  button.position(75,45);
  button.size(50,50);
  button.mouseClicked(drop2);
  button = createImg('cut_btn.png');
  button.position(335,20);
  button.size(50,50);
  button.mouseClicked(drop3);
  rope = new Rope(6,{x:245,y:30});
  rope2 = new Rope(5,{x:100,y:45});
  rope3 = new Rope(5,{x:350,y:20})
  ground = new Ground(200,690,600,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  blower = createImg('balloon.png');
  blower.position(10,250);
  blower.size(150,100);
  blower.mouseClicked(airblow);

  mute_btn = createImg('mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  bunny = createSprite(350,620,100,100);
  bunny.scale = 0.2;
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);
  Matter.Composite.add(rope2.body,fruit);
  Matter.Composite.add(rope3.body,fruit);
  fruit_con = new Link(rope,fruit);
  fruit2_con = new Link(rope2,fruit);
  fruit3_con = new Link(rope3,fruit);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}
function draw() {
  background(51);
  image(bg_img,0,0,490,690);
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();
  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();
  drawSprites();
  if(collide(fruit,bunny)==true)
  {
    eating_sound.play();
    bunny.changeAnimation('eating');
  }
  if(fruit!=null && fruit.position.y>=650)
  {
    sad_sound.play();
    bunny.changeAnimation('crying');
    fruit=null; 
   }  
}
function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}
function drop2(){
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
}
function drop3(){
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;
}
function keyPressed(){
  if(keyCode == LEFT_ARROW){
    airblow();
  }
}
function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}
function airblow()
{
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  air.play();
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}