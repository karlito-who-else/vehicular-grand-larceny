'use strict';

// import Controls from './entities/Controls.js';
// console.log('Controls', Controls);

if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}

class Controls {

  constructor(attributes, game) {
    this.attributes = attributes;
    this.game = game;
  }

}

class KeyboardControls extends Controls {

  constructor(attributes, game) {
    super(attributes, game);

    this.type = game.input.keyboard;

    this.defineLayout();
  }

  defineLayout(layout) {
    this.input = {};

    switch (this.attributes.layout) {
      case 'layout-1':
        this.game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.TAB]);

        this.input.up = Phaser.Keyboard.UP;
        this.input.down = Phaser.Keyboard.DOWN;
        this.input.left = Phaser.Keyboard.LEFT;
        this.input.right = Phaser.Keyboard.RIGHT;

        this.input.thrust = Phaser.Keyboard.W;
        this.input.handbrake = Phaser.Keyboard.SPACEBAR;
        this.input.honk = Phaser.Keyboard.TAB;
        this.input.reverse = Phaser.Keyboard.S;
        this.input.shoot = Phaser.Keyboard.CONTROL;
      break;
      case 'layout-2':
        this.input.up = Phaser.Keyboard.W;
        this.input.down = Phaser.Keyboard.S;
        this.input.left = Phaser.Keyboard.A;
        this.input.right = Phaser.Keyboard.D;
      break;
    }
  }

}

class GamepadControls extends Controls {

  constructor(attributes, game) {
    super(attributes, game);

    this.type = game.input.gamepad;

    this.defineLayout();
  }

  defineLayout(layout) {
    switch (this.attributes.layout) {
      case 'layout-1':
        this.input.up = Phaser.Gamepad.XBOX360_DPAD_UP;
        this.input.down = Phaser.Gamepad.XBOX360_DPAD_DOWN;
        this.input.left = Phaser.Gamepad.XBOX360_DPAD_LEFT;
        this.input.right = Phaser.Gamepad.XBOX360_DPAD_RIGHT;

        this.input.thrust = Phaser.Gamepad.XBOX360_A;
        this.input.reverse = Phaser.Gamepad.XBOX360_B;
        this.input.handbrake = Phaser.Gamepad.XBOX360_X;
        this.input.shoot = Phaser.Gamepad.XBOX360_Y;

        // this.input.weaponNext = Phaser.Gamepad.XBOX360_A;
        // this.input.weaponPrevious = Phaser.Gamepad.XBOX360_A;
      break;
      case 'layout-2':

      break;
    }
  }

}

class Component {

  constructor(attributes, game) {
    this.attributes = attributes;
    this.game = game;
  }

}

class Sprite extends Component {

  constructor(attributes, game) {
    attributes = Object.assign({
      image: 'sprite'
    }, attributes);

    if (!attributes.position) {
      attributes.position = {
        x: game.world.randomX,
        y: game.world.randomY
      };
    }

    super(attributes, game);
  }

  loadImage() { //make static to allow preloading without first initialising game and cursors?
    let image = this.attributes.image;

    this.game.load.image(image, `elements/game-instance/assets/sprites/${image}.png`);
  }

  addSprite() {
    this.sprite = this.game.add.sprite(this.attributes.position.x, this.attributes.position.y, this.attributes.image);

    this.sprite.anchor.setTo(0.5, 0.5);
  }

  applyPhysics() {
    // this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.game.physics.p2.enable(this.sprite);

    this.sprite.body = Object.assign(this.sprite.body, this.attributes.body);
  }

  attachBehaviours() {

  }

  attachControls(controls) {
    this.controls = controls;
  }

  constrainVelocity() {
    if (!this.sprite.body) {
      return;
    }

    // console.log('constrainVelocity', this.sprite.body);

    let vx = this.sprite.body.data.velocity[0];
    let vy = this.sprite.body.data.velocity[1];

    let currVelocitySqr = vx * vx + vy * vy;

    if (currVelocitySqr > this.attributes.properties.maximumVelocity * this.attributes.properties.maximumVelocity) {
      let angle = Math.atan2(vy, vx);

      vx = Math.cos(angle) * this.attributes.properties.maximumVelocity;
      vy = Math.sin(angle) * this.attributes.properties.maximumVelocity;

      this.sprite.body.data.velocity[0] = vx;
      this.sprite.body.data.velocity[1] = vy;
    }

  }

  update() {
    this.constrainVelocity();
  }

  render() {

  }

  get averageMagnitude() {
    return ((this.sprite.body.data.velocity[0] + this.sprite.body.data.velocity[1]) * 0.5);
  }

  get rotationSpeed() {
    let increase = (Math.PI / 100);
    // let increase = (Math.PI / this.attributes.properties.turnSpeed);

    let currentSpeedOfMaximum = ((this.averageMagnitude / this.attributes.properties.maximumVelocity) * 100); //percentage

    let rotationSpeed = Math.sin(increase * currentSpeedOfMaximum);

    console.groupCollapsed('rotationSpeed');
    console.log('this.averageMagnitude', this.averageMagnitude);
    console.log('increase', increase);
    console.log('currentSpeedOfMaximum', currentSpeedOfMaximum);
    console.log('rotationSpeed', rotationSpeed);
    console.log('this.attributes.body.turnSpeed', this.attributes.properties.turnSpeed);
    console.groupEnd();

    rotationSpeed = (rotationSpeed * this.attributes.properties.turnSpeed);

    return rotationSpeed;
  }

}

class Mushroom extends Sprite {

  constructor(attributes, game) {
    attributes = Object.assign({
      image: 'mushroom'
    }, attributes);

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
    attributes = Object.assign({
      image: 'pedestrian'
    }, attributes);

    super(attributes, game);
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
    attributes = Object.assign({
      engine: '1.0',
      horn: 'arooga',
      image: 'vehicle',
      body: {
        angularDamping: 0.75,
        // angularVelocity: 1000,
        damping: 0.85,
        drag: 100,
        mass: 0.5
      },
      properties: {
        accelerateForwardSpeed: 300,
        accelerateReverseSpeed: 125,
        brakeSpeed: 80,
        handbrakeSpeed: 60,
        maximumVelocity: 10,
        turnResetSpeed: 20,
        turnSpeed: 50
      }
    }, attributes);

    super(attributes, game);
  }

  attachBehaviours() {
    super.attachBehaviours();
    this.applyPhysics();

    this.sprite.anchor.setTo(0.5, 0.8);
    // this.sprite.adjustCenterOfMass();
  }

  update() {
    super.update();
  }

  render() {
    super.render();
  }

  handbrake(speed) {
    console.log('SCREEEECH!');

    speed = (parseInt(speed) === speed) ? speed : this.attributes.properties.handbrakeSpeed;

    if (this.sprite.body.angularVelocity > 0.1) {
      this.sprite.body.angularVelocity -= speed;
    } else if (this.sprite.body.angularVelocity < -0.1) {
      this.sprite.body.angularVelocity += speed;
    }
  }

  honk() {
    console.log(this.name + ' honks.');
  }

  shoot() {
    console.log(this.name + ' shoots.');
  }

  drive(ordinate) {
    // console.log('drive', 'ordinate', ordinate, 'body', this.attributes.body);
    if (ordinate > 0.1) {
      this.thrust(ordinate);
    } else if (ordinate < -0.1) {
      this.reverse(ordinate);
    }
  }

  thrust(speed) {
    speed = (parseInt(speed) === speed) ? speed : this.attributes.properties.accelerateForwardSpeed;
    // console.log('speed', speed);
    this.sprite.body.thrust(speed);
  }

  reverse(speed) {
    speed = (parseInt(speed) === speed) ? speed : this.attributes.properties.accelerateReverseSpeed;
    // console.log('speed', speed);
    this.sprite.body.reverse(speed);
  }

  brake(speed) {
    speed = (parseInt(speed) === speed) ? speed : this.attributes.properties.brakeSpeed;
    // console.log('speed', speed);

    // this.averageMagnitude with direction?
    //
    // if (this.sprite.body.angularVelocity > 0.1) {
    //   this.sprite.body.angularVelocity -= speed;
    // } else if (this.sprite.body.angularVelocity < -0.1) {
    //   this.sprite.body.angularVelocity += speed;
    // }
  }

  turn(abscissa) {
    console.log('turn', 'abscissa', abscissa);
    if (abscissa > 0.1) {
      this.turnLeft(abscissa);
    } else if (abscissa < -0.1) {
      this.turnRight(abscissa);
    }
  }

  turnLeft(speed) {
    // console.log('turnLeft', 'properties', this.attributes.properties, this.rotationSpeed);
    this.sprite.body.angularVelocity -= this.attributes.properties.turnSpeed;
    this.sprite.body.rotateLeft(this.attributes.properties.turnSpeed);
    // this.sprite.body.rotateLeft(this.rotationSpeed);
  }

  turnRight(speed) {
    // console.log('turnRight', 'properties', this.attributes.properties, this.rotationSpeed);
    this.sprite.body.angularVelocity += this.attributes.properties.turnSpeed;
    this.sprite.body.rotateRight(this.attributes.properties.turnSpeed);
    // this.sprite.body.rotateRight(this.rotationSpeed);
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

  constructor(attributes, game) {
    if (!attributes.engine) {
      attributes.engine = '10';
    }

    if (!attributes.horn) {
      attributes.horn = 'honk';
    }

    if (!attributes.image) {
      attributes.image = 'jetpack';
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

class Player extends Car {

  constructor(attributes, game) {
    if (!attributes.position) {
      attributes.position = {
        x: game.world.centerX,
        y: game.world.centerY
      };
    }

    super(attributes, game);
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

    // if (this.controls) {
    //   console.log('this.controls', this.controls);
    // }

    // if (this.controls && this.controls.type) {
    //   console.log('this.controls.type', this.controls.type);
    // }

    if (!this.controls || !this.controls.type) {
      return;
    }

    if (this.controls.type.isDown(this.controls.input.left)) {
      // console.log('this.controls.input.left.isDown');
      this.turnLeft();
    } else if (this.controls.type.isDown(this.controls.input.right)) {
      // console.log('this.controls.input.right.isDown');
      this.turnRight();
    }
    //  else {
    //   this.turnCenter();
    // }

    if (this.controls.type.isDown(this.controls.input.up)) {
      // console.log('this.controls.input.up.isDown');
      this.thrust();
    } else if (this.controls.type.isDown(this.controls.input.down)) {
      // console.log('this.controls.input.down.isDown');
      this.reverse();
    }
    //  else {
    //   this.decelerate();
    // }

    if (this.controls.type.isDown(this.controls.input.handbrake)) {
      this.handbrake();
    }

    if (this.controls.type.isDown(this.controls.input.honk)) {
      this.honk();
    }

    if (this.controls.type.isDown(this.controls.input.shoot)) {
      this.shoot();
    }

    if (this.controls.type === 'Phaser.Gamepad') {

      if ((this.controls.type.axis(this.controls.input.XBOX360_STICK_LEFT_X) < -0.1) || (this.controls.type.axis(this.controls.input.XBOX360_STICK_LEFT_X) > -0.1)) {
        this.turn(this.controls.type.axis(this.controls.input.XBOX360_STICK_LEFT_X));
      }

      if ((this.controls.type.axis(this.controls.input.XBOX360_STICK_LEFT_Y) < -0.1) || (this.controls.type.axis(this.controls.input.XBOX360_STICK_LEFT_Y) > -0.1)) {
        this.drive(this.controls.type.axis(this.controls.input.XBOX360_STICK_LEFT_Y));
      }

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

    attached: function() {
      this.async(this.notifyResize, 1);
    },

    get parent() {
      if (this.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        return this.parentNode.host;
      }
      return this.parentNode;
    },

    _onIronResize: function() {
      console.log('_onIronResize');
      this.resize();
    },

    ready: function() {
      this.canvasHeight = '100%';
      this.canvasWidth = '100%';
      // this.canvasHeight = 800;
      // this.canvasWidth = 600;

      this.events = {
        preload: this.preload,
        create: this.create,
        update: this.update,
        render: this.render
      };

      this.game = new Phaser.Game(this.canvasWidth, this.canvasHeight, Phaser.AUTO, this.$.canvas.id, this.events);
    },

    preload: function() {
      let _this = this;

      function preloadComponents() {
        _this.components = {};

        _this.components['Player 1'] = new Player({
          name: 'Player 1',
          color: '#ff0000',
          decals: 'flames',
          position: {
            x: _this.game.world.centerX,
            y: _this.game.world.centerY
            // x: 150,
            // y: 250
          }
        }, _this.game);

        for (var i = 0; i < 10; i++) {
          _this.components[`Mushroom ${i}`] = new Mushroom({
            name: `Mushroom ${i}`,
            color: '#00ff00',
            decals: 'dots',
            image: 'sonic'
          }, _this.game);
        }

        // for (var i = 0; i < 10; i++) {
        //   _this.components[`Vehicle ${i}`] = new Vehicle({
        //     name: `Vehicle ${i}`,
        //     color: '#00ff00',
        //     decals: 'stripes'
        //   }, _this.game);
        // }
      }

      function preloadImages() {
        _this.game.load.image('grid', 'elements/game-instance/assets/sprites/debug-grid-1920x1920.png');

        Object.keys(_this.components).forEach(function(key) {
          _this.components[key].loadImage();
        }, _this);
      }

      preloadComponents();
      preloadImages();
    },

    create: function() {
      let _this = this;

      function createComponents() {
        _this.players = _this.game.add.group();
        _this.mushrooms = _this.game.add.group();
        _this.vehicles = _this.game.add.group();

        Object.keys(_this.components).forEach(function(key) {
          _this.components[key].addSprite();
          _this.components[key].attachBehaviours();

          if (_this.components[key] instanceof Player) {
            _this.players.add(_this.components[key].sprite);
          }

          if (_this.components[key] instanceof Mushroom) {
            _this.mushrooms.add(_this.components[key].sprite);
          }

          // if (_this.components[key] instanceof Vehicle) {
          //   _this.vehicles.add(_this.components[key].sprite);
          // }
        }, _this);
      }

      function createControls() {
        // How to allow players to drop in and out and decide an input method?
        _this.components['Player 1'].attachControls(new KeyboardControls({
          layout: 'layout-1'
        }, _this.game));
      }

      function createPhysics() {
        // _this.game.physics.startSystem(Phaser.Physics.ARCADE);
        _this.game.physics.startSystem(Phaser.Physics.P2JS);
      }

      function createWorld() {
        // _this.game.add.tileSprite(0, 0, _this.game.width, _this.game.height, 'grid');
        _this.game.add.tileSprite(0, 0, 1920, 1920, 'grid');
        // _this.game.stage.backgroundColor = '#ddd';
        // _this.game.world.resize(6000, 6000);
        _this.game.world.setBounds(0, 0, 1920, 1920);
      }

      createWorld();
      createPhysics();
      createControls();
      createComponents();
    },

    update: function() {
      Object.keys(this.components).forEach(function(key) {
        this.components[key].update();
      }, this);
    },

    render: function() {
      // this.game.debug.cameraInfo(this.game.camera, 32, 32);
      this.game.debug.spriteInfo(this.components['Player 1'].sprite, 32, 32);
      this.game.debug.text('angularVelocity: ' + this.components['Player 1'].sprite.body.angularVelocity, 32, 200);
      this.game.debug.text('averageMagnitude: ' + this.components['Player 1'].averageMagnitude, 32, 232);
      this.game.debug.text('rotationSpeed: ' + this.components['Player 1'].rotationSpeed, 32, 264);
      // this.game.debug.text('angularAcceleration: ' + this.components['Player 1'].sprite.body.angularAcceleration, 32, 232);
      // this.game.debug.text('angularDrag: ' + this.components['Player 1'].sprite.body.angularDrag, 32, 264);
      // this.game.debug.text('deltaZ: ' + this.components['Player 1'].sprite.body.deltaZ(), 32, 296);

      Object.keys(this.components).forEach(function(key) {
        this.components[key].render();
      }, this);
    },

    resize: function() {

    }

  });

})();
