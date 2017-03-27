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
var img3 = new Image();
img3.src = 'terrain2.png';

function drawTerrain ()
{
  var ctx3 = document.getElementById('canvas').getContext('2d');
  ctx3.drawImage(img3, 0, 0, 600, 600);  
}
