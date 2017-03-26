var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var jumperColor = '#660033';;
var jumperXSpeed = 3;
var gravity = 9.8;

var brickList = [];
var isGameOver = false;
var jumper =
{
  width: 30,
  height: 30,
  x: 100,
  y: 400,
  mass: 100,

  speedX: 0,
  speedY: 0
}

var brick = createBrick(100, 500, 100, 20);
brickList.push(brick);
brick = createBrick(500, 400, 100, 20);
brickList.push(brick);
brick = createBrick(200, 300, 100, 20);
brickList.push(brick);
brick = createBrick(800, 200, 100, 20);
brickList.push(brick);
brick = createBrick(100, 100, 100, 20);
brickList.push(brick);
brick = createBrick(400, 50, 100, 20);
brickList.push(brick);
brick = createBrick(700, 0, 100, 20);
brickList.push(brick);
brick = createBrick(100, -100, 100, 20);
brickList.push(brick);
brick = createBrick(600, -200, 100, 20);
brickList.push(brick);
brick = createBrick(800, -300, 100, 20);
brickList.push(brick);
brick = createBrick(100, -400, 100, 20);
brickList.push(brick);
brick = createBrick(600, -500, 100, 20);
brickList.push(brick);
brick = createBrick(800, -600, 100, 20);
brickList.push(brick);
brick = createBrick(200, -700, 100, 20);
brickList.push(brick);
brick = createBrick(500, -800, 100, 20);
brickList.push(brick);
brick = createBrick(200, -900, 100, 20);
brickList.push(brick);


registerKeyboard();

requestAnimationFrame(gameController);

function gameController()
{
  move();
  checkCollisions();
  draw();
  if (!isGameOver) {
    requestAnimationFrame(gameController);
  }
}

function move ()
{
  moveJumper();
  moveBricks();
}

GotoMidGuys();

function draw () 
{
  clearCanvas();
  drawJumper();
  drawBricks();
  
}


function drawBricks() {
  for (var i = 0; i < brickList.length; i++) {
    var brick = brickList[i];
    context.fillStyle = "#3E983A";
    context.fillRect(brick.x, brick.y, brick.width, brick.height);
  }
}


function moveJumper() 
{
  var oldX = jumper.x;
  var oldY = jumper.y;

  jumper.x += jumper.speedX;
  jumper.y += jumper.speedY;

  var isOnCollision = false;
  // Check coordinates
  for (var i = 0; i < brickList.length; i++) {
    var brick = brickList[i];
    
    var isInX = jumper.x + jumper.width >= brick.x && jumper.x <= brick.x + brick.width;
    var isOnTop = jumper.y + jumper.height >= brick.y;
    var isOnBottom = jumper.y <= brick.y + brick.height;

    if (isOnTop && isInX && isOnBottom) {
      jumper.y = oldY;
      jumper.speedY = 0;
      isOnCollision = true;
      jumper.isJumped = false;
    } 
   
  }

  jumper.isCollision = isOnCollision;

  jumper.speedY += 0.2;
  if (jumper.speedY >= 10) {
    jumper.speedY = 10;
  }
}

function getRandomCoordinate() 
{
  return Math.floor(Math.random() * squareCount + 1);
}

function clearCanvas() 
{
  context.clearRect(0, 0, 600, 600);
}

function drawJumper () 
{
  context.fillStyle = jumperColor;
  context.fillRect(jumper.x, jumper.y, jumper.width, jumper.height);  
}

function GotoMidGuys()
{
  document.getElementById("canvas").style.marginLeft = "auto";
  document.getElementById("canvas").style.marginRight = "auto";
  canvas.style.display = 'block';
}

function registerKeyboard() {
  document.addEventListener('keydown', function (event) { 
    /*
    key codes
    W = 119
    S = 115
    A = 65
    D = 68
    */

    if(event.keyCode == 87)
    {
      if(!jumper.isJumped) {
        jumper.isJumped = true;
        jumper.speedY = -10;
      }
    }
    if(event.keyCode == 65)
    {
      jumper.speedX = -jumperXSpeed;
    }
    else if(event.keyCode == 68)
    {
      jumper.speedX = jumperXSpeed;
    }
  }); 

  document.addEventListener('keyup', function() {
    console.log('key up')
    if(event.keyCode == 119)
    {
    }
    if(event.keyCode == 65 || event.keyCode == 68)
    {
      jumper.speedX = 0;
    }
  });
}

function createBrick(x, y, width, height) 
{
  return {
    width: width, 
    height: height,
    x: x,
    y: y
  }
}

function checkCollisions () 
{
  // checkBrickCollisions();
  jumperCollisions();
}

function moveBricks ()
{
  for (var i = 0; i < brickList.length; i++) {
    var brick = brickList[i];

    if (brick.y > canvas.height)
    {
      brick.y = -100;
    }
    brick.y = brick.y + 1;
  }
}

function jumperCollisions ()
{
  if (jumper.y > canvas.height)
  {
       gameOver();
  }

  if (jumper.y < 0)
  {
    levelComplete();
  }

  if (jumper.y > canvas.width)
  {
    jumper.x = 1;
  }

  if (jumper.x < 0)
  {
    jumper.x = canvas.width - 1;
  }
}

function levelComplete ()
{
  isGameOver = true;
  alert("Nice job level complete");
}

function gameOver ()
{
  isGameOver = true;
  alert("Game Over , pay to play");
}

function checkBrickCollision(obj, col)
{
  if (obj.x + obj.width > col.x && obj.x < col.x + col.width &&
      obj.y + obj.height >= col.y && obj.y <= col.y + col.height) {
    return col;
  }
  else return null;
}

function checkBrickCollisions ()
{
  // for (var i = 0; i < brickList.length; i++) {
  //   var brick = brickList[i];
  //   var jumperTotalX = jumper.x + jumper.width;

  //   if (jumperTotalX >= brick.x && jumper.x <= brick.x + brick.width) {
  //     if (jumper.y + jumper.height >= brick.y && jumper.y <= brick.y + brick.height) {
  //       // Collision 
  //       jumper.speedY = 0;
  //       jumper.speedX = 0;
  //       jumper.isCollision = true;
  //     }
  //   }
  // }
}