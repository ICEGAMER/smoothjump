var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Composites = Matter.Composites,
Common = Matter.Common,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
World = Matter.World,
Bodies = Matter.Bodies,
Events = Matter.Events,
Body  = Matter.Body;

var img = new Image ();
img.src = 'styles/nature.jpg'


var world;
var engine;
var player;

function Initiate() {
  // create engine
  engine = Engine.create();

  world = engine.world;
  // create renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: Math.min(document.documentElement.clientWidth, 800),
      height: Math.min(document.documentElement.clientHeight, 600),
      background: img,
      showAngleIndicator: false,
      wireframes: false
    }
  });
  
  Render.run(render);
  
  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
  });
  
  player = createPlayer();
  registerKeyboard(player);

  // Create first level
  loadFirstLevel();

  Events.on(engine, 'beforeTick', function(event) {
    moveCamera(render, -1);

  });
  // context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function() {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    }
  };
};

function loadFirstLevel() {
  addPlatform(500, 550, 100, 10);
  addPlatform(700, 400, 100, 10);
  addPlatform(300, 400, 100, 10);
  addPlatform(500, 350, 100, 10);
  addPlatform(700, 200, 100, 10);
  addPlatform(300, 200, 100, 10);
  addPlatform(500, 50, 100, 10);
  addPlatform(700, -100, 100, 10);
  addPlatform(500, -300, 100, 10);
  addPlatform(300, -250, 100, 10);
  addPlatform(500, -400, 100, 10);
  addPlatform(700, -550, 100, 10);
  addPlatform(300, -700, 100, 10);
}

function addPlatform(x, y, width, height) {
  var platform = Bodies.rectangle(x, y, width, height);
  platform.label = 'platform';
  Body.setStatic(platform, true);
  World.add(world, platform);
}

function moveCamera(render, distance) {
  var positionMinY = render.bounds.min.y;
  var positionMaxY = render.bounds.max.y;
  
  positionMinY += distance;
  positionMaxY += distance;

  render.bounds.min.y = positionMinY;
  render.bounds.max.y = positionMaxY;
}

Initiate();

function createPlayer() {
  var player = Bodies.rectangle(500, 400, 64, 64, {
    render: {
      sprite: {
        texture: './img/characters/cactus.png'
      }
    }
  });

  player.label = 'player';
  player.isOnFloor = false;

  registerPlayerCollision(player);
  World.add(world, player);
  return player;
}

function registerKeyboard(player) {
  // Moving player
  document.addEventListener('keydown',function (e) {
    if (e.code == 'KeyD') {
      var vector = Matter.Vector.create(5, player.velocity.y);
      Matter.Body.setVelocity(player, vector);
    }
    else if (e.code == 'KeyA') {
      var vector = Matter.Vector.create(-5, player.velocity.y);
      Matter.Body.setVelocity(player, vector);
    }
    else if (e.code == 'Space') {
      if (player.isOnFloor) {
        var vector = Matter.Vector.create(player.velocity.x, -10);
        Matter.Body.setVelocity(player, vector);
        player.isOnFloor = false;
      }
    }

  });
}

function registerPlayerCollision(player) {
  Events.on(engine, 'collisionStart', function(events) {
    var pairs = events.pairs;

    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];

      if (pair.bodyA == player) {
        onPlayerCollision(pair, pair.bodyB);
      } 
      else if (pair.bodyB == player) {
        onPlayerCollision(pair, pair.bodyA);
      }
    }
  }); 
}

function onPlayerCollision(pair, obj) {
  console.log('Player collision with: ', obj)
  switch(obj.label) {
    case 'platform':
      player.isOnFloor = true;
      break;
  }
}
