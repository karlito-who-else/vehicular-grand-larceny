'use strict';

// import car from './entities/car.js';
// console.log('car', car);

class Component {

  constructor(attributes, game) {
    this.attributes = attributes;
    this.game = game;
  }

}

class Sprite extends Component {

  constructor(attributes, game) {
    if (!attributes.image) {
      attributes.image = 'sprite';
    }

    if (!attributes.position) {
      attributes.position = {
        x: game.world.randomX,
        y: game.world.randomY
      };
    }

    if (!attributes.body) {
      attributes.body = {};
    }

    if (!attributes.body.data) {
      attributes.body.data = {};
    }

    if (!attributes.body.data.damping) {
      attributes.body.data.damping = 0.9;
    }

    super(attributes, game, cursors);
  }

  loadImage() { //make static to allow preloading without first initialising game and cursors?
    let image = this.attributes.image;
    this.game.load.image(image, `elements/game-instance/assets/sprites/${image}.png`);
  }

  addSprite() {
    this.sprite = this.game.add.sprite(this.attributes.position.x, this.attributes.position.y, this.attributes.image);
    this.sprite.anchor.setTo(0.5, 0.5);
    // this.sprite.fixedToCamera = true;
  }

  applyPhysics() {
    // this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.game.physics.p2.enable(this.sprite);
    this.sprite.body.data.damping = this.attributes.body.data;
    // this.sprite.body.drag.set(this.attributes.body.maxVelocity);
    // this.sprite.body.maxVelocity.set(this.attributes.body.maxVelocity);
    // this.sprite.body.mass = this.attributes.body.mass;
    // this.sprite.body.maxAngular = this.attributes.body.maxAngular;
  }

  attachBehaviours() {

  }

  attachControls(controls) {
    this.controls = controls;
  }

  update() {

  }

  render() {

  }

}

class Mushroom extends Sprite {

  constructor(attributes, game) {
    if (!attributes.image) {
      attributes.image = 'mushroom';
    }

    super(attributes, game);
  }

  attachBehaviours() {
    super.attachBehaviours();
  }

  update() {
    super.update();
  }

  render() {
    super.render();
  }

}

class Pedestrian extends Sprite {

  constructor(attributes, game) {
    if (!attributes.image) {
      attributes.image = 'pedestrian';
    }

    if (!attributes.body) {
      attributes.body = {};
    }

    if (!attributes.body.data) {
      attributes.body.data = {};
    }

    if (!attributes.body.data.damping) {
      attributes.body.data.damping = 0.95;
    }

    super(attributes, game, cursors);
  }

  attachBehaviours() {
    super.attachBehaviours();
    this.applyPhysics();
  }

  update() {
    super.update();
  }

  render() {
    super.render();
  }

  yell() {
    console.log(this.name + ' yells.');
  }

}

class Vehicle extends Sprite {

  constructor(attributes, game) {
    if (!attributes.engine) {
      attributes.engine = '1.0';
    }

    if (!attributes.horn) {
      attributes.horn = 'arooga';
    }

    if (!attributes.image) {
      attributes.image = 'vehicle';
    }

    if (!attributes.body) {
      attributes.body = {};
    }

    if (!attributes.body.data) {
      attributes.body.data = {};
    }

    if (!attributes.body.data.damping) {
      attributes.body.data.damping = 0.9;
    }

    if (!attributes.body.drag) {
      attributes.body.drag = 10;
    }

    if (!attributes.body.mass) {
      attributes.body.mass = 1;
    }

    if (!attributes.body.maxAngular) {
      attributes.body.maxAngular = 10000;
    }

    if (!attributes.body.maxVelocity) {
      attributes.body.maxVelocity = 5;
    }

    if (!attributes.body.movementAccelerationSpeed) {
      attributes.body.movementAccelerationSpeed = 10;
    }

    if (!attributes.body.movementDecelerationSpeed) {
      attributes.body.movementDecelerationSpeed = 10;
    }

    if (!attributes.body.turningAccelerationSpeed) {
      attributes.body.turningAccelerationSpeed = 10;
    }

    if (!attributes.body.turningDecelerationSpeed) {
      attributes.body.turningDecelerationSpeed = 10;
    }

    super(attributes, game);
  }

  attachBehaviours() {
    super.attachBehaviours();
    this.applyPhysics();

    this.sprite.anchor.setTo(0.5, 0.8);
  }

  update() {
    super.update();
  }

  render() {
    super.render();
  }

  honk() {
    console.log(this.name + ' honks.');
  }

  accelerate() {
    // console.log('accelerate', 'velocity', this.sprite.body.velocity, 'angle', this.sprite.angle);
    // this.game.physics.arcade.velocityFromAngle(this.sprite.angle, 3000, this.sprite.body.velocity);
    // this.sprite.body.moveUp(100);
    this.sprite.body.thrust(this.attributes.body.movementAccelerationSpeed);
  }

  decelerate() {
    // console.log('accelerate', 'velocity', this.sprite.body.velocity, 'angle', this.sprite.angle);
    // if (this.sprite.body.velocity > 0) {
    //   this.sprite.body.velocity -= ((this.sprite.body.velocity -= this.attributes.body.movementDecelerationSpeed) >= 0) ? this.attributes.body.movementDecelerationSpeed : this.sprite.body.velocity;
    // }
    // this.sprite.body.moveDown(100);

    if (this.sprite.body.angularVelocity > 1) {
      this.sprite.body.angularVelocity -= this.attributes.body.turningDecelerationSpeed;
    } else if (this.sprite.body.angularVelocity < -1) {
      this.sprite.body.angularVelocity += this.attributes.body.turningDecelerationSpeed;
    } else {
      this.sprite.body.setZeroRotation();
    }
  }

  turnLeft() {
    console.log('this.attributes.body', this.attributes.body);
    this.sprite.body.angularForce -= this.attributes.body.turningAccelerationSpeed;
    // this.sprite.body.moveLeft(100);
    // this.sprite.body.rotateLeft(this.attributes.body.turningAccelerationSpeed);
  }

  turnRight() {
    console.log('this.attributes.body', this.attributes.body);
    this.sprite.body.angularForce += this.attributes.body.turningAccelerationSpeed;
    // this.sprite.body.moveRight(100);
    // this.sprite.body.rotateRight(this.attributes.body.turningAccelerationSpeed);
  }

}

class Car extends Vehicle {

  constructor(attributes, game) {
    if (!attributes.engine) {
      attributes.engine = '1.8';
    }

    if (!attributes.horn) {
      attributes.horn = 'honk';
    }

    if (!attributes.image) {
      attributes.image = 'car';
    }

    if (!attributes.body) {
      attributes.body = {};
    }

    if (!attributes.body.drag) {
      attributes.body.drag = 10;
    }

    if (!attributes.body.mass) {
      attributes.body.mass = 100;
    }

    if (!attributes.body.maxAngular) {
      attributes.body.maxAngular = 150;
    }

    if (!attributes.body.maxVelocity) {
      attributes.body.maxVelocity = 10000;
    }

    if (!attributes.body.movementAccelerationSpeed) {
      attributes.body.movementAccelerationSpeed = 1600;
    }

    if (!attributes.body.movementDecelerationSpeed) {
      attributes.body.movementDecelerationSpeed = 800;
    }

    if (!attributes.body.turningAccelerationSpeed) {
      attributes.body.turningAccelerationSpeed = 5;
    }

    if (!attributes.body.turningDecelerationSpeed) {
      attributes.body.turningDecelerationSpeed = 0.5;
    }

    super(attributes, game);
  }

  attachBehaviours() {
    super.attachBehaviours();
  }

  update() {
    super.update();
  }

  render() {
    super.render();
  }

  honk() {
    super.honk();
    console.log(this.name + ' honks normally.');
  }

}

class Truck extends Vehicle {

  constructor(attributes, game) {
    if (!attributes.engine) {
      attributes.engine = '4.5';
    }

    if (!attributes.horn) {
      attributes.horn = 'parp';
    }

    if (!attributes.image) {
      attributes.image = 'truck';
    }

    if (!attributes.body) {
      attributes.body = {};
    }

    if (!attributes.body.drag) {
      attributes.body.drag = 10;
    }

    if (!attributes.body.mass) {
      attributes.body.mass = 10;
    }

    if (!attributes.body.maxAngular) {
      attributes.body.maxAngular = 90;
    }

    if (!attributes.body.maxVelocity) {
      attributes.body.maxVelocity = 90;
    }

    if (!attributes.body.movementAccelerationSpeed) {
      attributes.body.movementAccelerationSpeed = 15;
    }

    if (!attributes.body.movementDecelerationSpeed) {
      attributes.body.movementDecelerationSpeed = 5;
    }

    if (!attributes.body.turningAccelerationSpeed) {
      attributes.body.turningAccelerationSpeed = 12.5;
    }

    if (!attributes.body.turningDecelerationSpeed) {
      attributes.body.turningDecelerationSpeed = 10;
    }

    super(attributes, game);
  }

  attachBehaviours() {
    super.attachBehaviours();
  }

  update() {
    super.update();
  }

  render() {
    super.render();
  }

  honk() {
    super.honk();
    console.log(this.name + ' honks loudly.');
  }

}

class Motorcycle extends Vehicle {

  constructor(attributes, game) {
    if (!attributes.engine) {
      attributes.engine = '0.6';
    }

    if (!attributes.horn) {
      attributes.horn = 'toot';
    }

    if (!attributes.image) {
      attributes.image = 'motorcycle';
    }

    if (!attributes.body) {
      attributes.body = {};
    }

    if (!attributes.body.drag) {
      attributes.body.drag = 10;
    }

    if (!attributes.body.mass) {
      attributes.body.mass = 10;
    }

    if (!attributes.body.maxAngular) {
      attributes.body.maxAngular = 90;
    }

    if (!attributes.body.maxVelocity) {
      attributes.body.maxVelocity = 90;
    }

    if (!attributes.body.movementAccelerationSpeed) {
      attributes.body.movementAccelerationSpeed = 15;
    }

    if (!attributes.body.movementDecelerationSpeed) {
      attributes.body.movementDecelerationSpeed = 5;
    }

    if (!attributes.body.turningAccelerationSpeed) {
      attributes.body.turningAccelerationSpeed = 12.5;
    }

    if (!attributes.body.turningDecelerationSpeed) {
      attributes.body.turningDecelerationSpeed = 10;
    }

    super(attributes, game);
  }

  attachBehaviours() {
    super.attachBehaviours();
  }

  update() {
    super.update();
  }

  render() {
    super.render();
  }

  honk() {
    super.honk();
    console.log(this.name + ' honks pathetically.');
  }

}

class Jetpack extends Vehicle {

  constructor(attributes, game, cursors) {
    if (!attributes.engine) {
      attributes.engine = '10';
    }

    if (!attributes.horn) {
      attributes.horn = 'honk';
    }

    if (!attributes.image) {
      attributes.image = 'jetpack';
    }

    if (!attributes.body) {
      attributes.body = {};
    }

    if (!attributes.body.drag) {
      attributes.body.drag = 10;
    }

    if (!attributes.body.mass) {
      attributes.body.mass = 100;
    }

    if (!attributes.body.maxAngular) {
      attributes.body.maxAngular = 150;
    }

    if (!attributes.body.maxVelocity) {
      attributes.body.maxVelocity = 10000;
    }

    if (!attributes.body.movementAccelerationSpeed) {
      attributes.body.movementAccelerationSpeed = 400;
    }

    if (!attributes.body.movementDecelerationSpeed) {
      attributes.body.movementDecelerationSpeed = 800;
    }

    if (!attributes.body.turningAccelerationSpeed) {
      attributes.body.turningAccelerationSpeed = 50;
    }

    if (!attributes.body.turningDecelerationSpeed) {
      attributes.body.turningDecelerationSpeed = 25;
    }

    super(attributes, game, cursors);
  }

  attachBehaviours() {
    super.attachBehaviours();
  }

  update() {
    super.update();
  }

  render() {
    super.render();
  }

  honk() {
    super.honk();
    console.log(this.name + ' honks normally.');
  }

}

class Player extends Car {

  constructor(attributes, game) {
    super(attributes, game);

    if (!attributes.position) {
      attributes.position = {
        x: game.world.centerX,
        y: game.world.centerY
      };
    }

  }

  attachBehaviours() {
    super.attachBehaviours();
    this.game.camera.follow(this.sprite);
    this.game.camera.deadzone = new Phaser.Rectangle(100, 100, 100, 100);
    // this.sprite.fixedToCamera = true;
    // this.sprite.enable = false;
  }

  update() {
    super.update();

    // this.attributes.camera = {
    //   x: 4
    // };

    // this.sprite.body.velocity.x = 0;
    // this.sprite.body.velocity.y = 0;
    // this.sprite.body.angularVelocity = 0;

    if (this.controls.left.isDown) {
      this.turnLeft();
    } else if (this.controls.right.isDown) {
      this.turnRight();
    } else {
      this.decelerate();
    }

    if (this.controls.up.isDown) {
      this.accelerate();
    } else if (this.controls.down.isDown) {
      this.decelerate();
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      console.log('SCREEEECH!');
    }

  }

  render() {
    super.render();

    // let zone = this.game.camera.deadzone;
    // this.game.context.fillStyle = 'rgba(255,0,0,0.6)';
    // this.game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
  }

  yell() {
    console.log(this.name + ' yells uproariously.');
  }

}

(function() {
  Polymer({
    is: 'game-instance',

    behaviors: [
      Polymer.IronResizableBehavior
    ],

    listeners: {
      'iron-resize': '_onIronResize'
    },

    properties: {
    },

    // attached: function() {
    //   this.async(this.notifyResize, 1);
    // },
    //
    // get parent() {
    //   if (this.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    //     return this.parentNode.host;
    //   }
    //   return this.parentNode;
    // },

    _onIronResize: function() {
      console.log('_onIronResize');
      this.resize();
    },

    ready: function() {
      this.canvasHeight = '100%';
      this.canvasWidth = '100%';
      // this.canvasHeight = 800;
      // this.canvasWidth = 600;

      this.state = {
        preload: this.preload,
        create: this.create,
        update: this.update,
        render: this.render
      };

      this.game = new Phaser.Game(this.canvasWidth, this.canvasHeight, Phaser.AUTO, this.$.canvas.id, this.state);
    },

    preload: function() {
      let _this = this;

      function preloadComponents() {
        _this.components = {};

        _this.components['Player 1'] = new Player({
            name: 'Player 1',
            color: '#ff0000',
            decals: 'stripes',
            position: {
              x: 150,
              y: 50
            }
          },
          _this.gam
        );

        // for (var i = 0; i < 200; i++) {
        //   _this.components[`Mushroom ${i}`] = new Mushroom({
        //       name: `Mushroom ${i}`,
        //       color: '#00ff00',
        //       decals: 'dots',
        //       position: {
        //         x: _this.game.world.randomX,
        //         y: _this.game.world.randomY
        //       }
        //     },
        //     _this.game
        //   );
        // }
      }

      function preloadControls() {
        _this.controls = [];

        _this.controls.push(_this.game.input.keyboard.createCursorKeys());

        _this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
      }

      function preloadImages() {
        Object.keys(_this.components).forEach(function(key) {
          _this.components[key].loadImage();
        }, _this);

        _this.game.load.image('grid', 'elements/game-instance/assets/sprites/debug-grid-1920x1920.png');
      }

      preloadControls();
      preloadComponents();
      preloadImages();
    },

    create: function() {
      let _this = this;

      function createComponents() {
        _this.mushrooms = _this.game.add.group();

        Object.keys(_this.components).forEach(function(key) {
          _this.components[key].addSprite();
          _this.components[key].attachBehaviours();

          // if (key.startsWith('Mushroom')) {
          //   _this.mushrooms.add(_this.components[key].sprite);
          // }
        }, _this);
      }

      function createPhysics() {
        // _this.game.physics.startSystem(Phaser.Physics.ARCADE);
        _this.game.physics.startSystem(Phaser.Physics.P2JS);

      this.controls = [];
      this.controls.push(this.game.input.keyboard.createCursorKeys());
      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

      Object.keys(this.components).forEach(function(key) {
        this.components[key].addSprite();
        this.components[key].attachBehaviours();
        this.components[key].attachControls(this.controls[0]);

      function createWorld() {
        // _this.game.add.tileSprite(0, 0, _this.game.width, _this.game.height, 'grid');
        _this.game.add.tileSprite(0, 0, 1920, 1920, 'grid');
        // _this.game.stage.backgroundColor = '#ddd';
        // _this.game.world.resize(6000, 6000);
        _this.game.world.setBounds(0, 0, 1920, 1920);
      }

      createWorld();
      createPhysics();
      createComponents();
    },

    update: function() {
      Object.keys(this.components).forEach(function(key) {
        this.components[key].update();
      }, this);
    },

    resize: function() {

    },

    render: function() {
      // this.game.debug.cameraInfo(this.game.camera, 32, 32);
      this.game.debug.spriteInfo(this.components['Player 1'].sprite, 32, 32);
      this.game.debug.text('angularVelocity: ' + this.components['Player 1'].sprite.body.angularVelocity, 32, 200);
      this.game.debug.text('angularAcceleration: ' + this.components['Player 1'].sprite.body.angularAcceleration, 32, 232);
      this.game.debug.text('angularDrag: ' + this.components['Player 1'].sprite.body.angularDrag, 32, 264);
      // this.game.debug.text('deltaZ: ' + this.components['Player 1'].sprite.body.deltaZ(), 32, 296);

      Object.keys(this.components).forEach(function(key) {
        this.components[key].render();
      }, this);
    },

    resize: function() {
    },

    turnLeft: function() {
      // this.components['Player 1'].sprite.turnLeft();
    },

    turnRight: function() {
      // this.components['Player 1'].sprite.turnRight();
    }

  });

})();
