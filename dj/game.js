var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Composites = Matter.Composites,
Common = Matter.Common,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
World = Matter.World,
Bodies = Matter.Bodies;

function Initiate() {
  
  
  // create engine
  var engine = Engine.create(),
  world = engine.world;
  
  // create renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: Math.min(document.documentElement.clientWidth, 800),
      height: Math.min(document.documentElement.clientHeight, 600),
      background: '#fff',
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
  
  //Load first level
  var player = createPlayer();
  World.add(world, player);
  
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
      var vector = Matter.Vector.create(player.velocity.x, -10);
      Matter.Body.setVelocity(player, vector);
    }

  });
  
  // Create platform
  var platform = Bodies.rectangle(500, 600, 400, 30, {
    isStatic: true
  });
  var platform1 = Bodies.rectangle(500, 400, 100, 20, {
    isStatic: true
  });
  var platform2 = Bodies.rectangle(500, 400, 100, 20, {
    isStatic: true
  });
  var platform3 = Bodies.rectangle(800, 200, 100, 20, {
    isStatic: true
  });
  var platform4 = Bodies.rectangle(100, 100, 100, 20, {
    isStatic: true
  });
  var platform5 = Bodies.rectangle(400, 50, 100, 20, {
    isStatic: true
  });
  
  World.add(world, platform);
  World.add(world, platform1);
  World.add(world, platform2);
  World.add(world, platform3);
  World.add(world, platform4);
  World.add(world, platform5);
  
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

Initiate();

function createPlayer() {
  var player = Bodies.rectangle(400, 400, 64, 64, {
    render: {
      sprite: {
        texture: './img/cactus.png'
      }
    }
  });
  
  return player;
}

