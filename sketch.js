var ball;
var position,database;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ballPosition = database.ref("car/position");
    ballPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");

    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
    }
    drawSprites();
}

function changePosition(x,y){
   database.ref("car/position").set({
       'x': position.x + x,
       'y' : position.y + y
   })
}

function readPosition(pos){
    position = pos.val();
    ball.x = position.x;
    ball.y = position.y;
}
function showError(){
    console.log("Cannot Get Data From Database");
}
