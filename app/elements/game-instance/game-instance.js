'use strict';

// import car from './entities/car.js';
// console.log('car', car);

class Component {

  constructor(attributes, game, cursors) {
    this.attributes = attributes;
    this.game = game;
    this.cursors = cursors;
  }

}

class Sprite extends Component {

  constructor(attributes, game, cursors) {
    if (!attributes.image) {
      attributes.image = 'sprite';
    }

    if (!attributes.position) {
      attributes.position = {
        x: game.world.randomX,
        y: game.world.randomY
      };
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

  attachBehaviours() {

  }

  update() {

  }

}

class Mushroom extends Sprite {

  constructor(attributes, game, cursors) {
    if (!attributes.image) {
      attributes.image = 'mushroom';
    }

    super(attributes, game, cursors);
  }

  attachBehaviours() {
    super.attachBehaviours();
  }

  update() {
    super.update();
  }

}

class Pedestrian extends Sprite {

  constructor(attributes, game, cursors) {
    if (!attributes.image) {
      attributes.image = 'pedestrian';
    }

    super(attributes, game, cursors);
  }

  attachBehaviours() {
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    super.attachBehaviours();
  }

  update() {
    super.update();
  }

  yell() {
    console.log(this.name + ' yells.');
  }

}

class Vehicle extends Sprite {

  constructor(attributes, game, cursors) {
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
      attributes.body.maxVelocity = 10;
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

    super(attributes, game, cursors);
  }

  attachBehaviours() {
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.sprite.anchor.setTo(0.2, 0.5);

    this.sprite.body.drag.set(100);
    this.sprite.body.maxVelocity.set(this.attributes.body.maxVelocity);

    this.sprite.body.mass = this.attributes.body.mass;
    this.sprite.body.maxAngular = this.attributes.body.maxAngular;

    super.attachBehaviours();
  }

  update() {
    super.update();
  }

  honk() {
    console.log(this.name + ' honks.');
  }

}

class Car extends Vehicle {

  constructor(attributes, game, cursors) {
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
      attributes.body.mass = 10;
    }

    if (!attributes.body.maxAngular) {
      attributes.body.maxAngular = 150;
    }

    if (!attributes.body.maxVelocity) {
      attributes.body.maxVelocity = 10000;
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

    super(attributes, game, cursors);
  }

  attachBehaviours() {
    super.attachBehaviours();
  }

  update() {
    super.update();
  }

  honk() {
    super.honk();
    console.log(this.name + ' honks normally.');
  }

}

class Truck extends Vehicle {

  constructor(attributes, game, cursors) {
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

    super(attributes, game, cursors);
  }

  attachBehaviours() {
    super.attachBehaviours();
  }

  update() {
    super.update();
  }

  honk() {
    super.honk();
    console.log(this.name + ' honks loudly.');
  }

}

class Motorcycle extends Vehicle {

  constructor(attributes, game, cursors) {
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

    super(attributes, game, cursors);
  }

  attachBehaviours() {
    super.attachBehaviours();
  }

  update() {
    super.update();
  }

  honk() {
    super.honk();
    console.log(this.name + ' honks pathetically.');
  }

}

class Player extends Car {

  constructor(attributes, game, cursors) {
    super(attributes, game, cursors);
  }

  attachBehaviours() {
    super.attachBehaviours();
    this.sprite.fixedToCamera = true;
    this.sprite.enable = false;
  }

  update() {
    super.update();

    // this.attributes.camera = {
    //   x: 4
    // };

    // this.sprite.body.velocity.x = 0;
    // this.sprite.body.velocity.y = 0;
    // this.sprite.body.angularVelocity = 0;

    if (this.cursors.left.isDown) {
    // if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      console.log('this.attributes.body', this.attributes.body);
      this.sprite.body.angularVelocity -= this.attributes.body.turningAccelerationSpeed;
    } else if (this.cursors.right.isDown) {
    // else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.sprite.body.angularVelocity += this.attributes.body.turningAccelerationSpeed;
    } else {
      if (this.sprite.body.angularVelocity > 0) {
        this.sprite.body.angularVelocity -= this.attributes.body.turningDecelerationSpeed;
      } else if (this.sprite.body.angularVelocity < 0) {
        this.sprite.body.angularVelocity += this.attributes.body.turningDecelerationSpeed;
      }
    }

    if (this.cursors.up.isDown) {
    // if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      console.log('up', 'this.sprite.body.velocity', this.sprite.body.velocity, 'this.sprite.angle', this.sprite.angle);
      this.game.physics.arcade.velocityFromAngle(this.sprite.angle, 3000, this.sprite.body.velocity);
    } else if (this.cursors.down.isDown) {
    // if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      // if (this.sprite.body.velocity > 0) {
      //   this.sprite.body.velocity -= ((this.sprite.body.velocity -= this.attributes.body.movementDecelerationSpeed) >= 0) ? this.attributes.body.movementDecelerationSpeed : this.sprite.body.velocity;
      // }
    }

    // if (this.cursors.SPACEBAR.isDown) {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      console.log('SCREEEECH!');
    }

    // if (this.cursors.left.isDown) {
    //   this.sprite.body.angularAcceleration -= this.attributes.body.angularAcceleration;
    // } else if (this.cursors.right.isDown) {
    //   this.sprite.body.angularAcceleration += this.attributes.body.angularAcceleration;
    // }

    // if (this.cursors.left.isDown) {
    //   this.game.camera.x -= this.attributes.camera.x;
    // } else if (this.cursors.right.isDown) {
    //   this.game.camera.x += this.attributes.camera.x;
    // }

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
      this.controls = [];
      this.controls.push(this.game.input.keyboard.createCursorKeys());
      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

      this.game.load.image('space', 'elements/game-instance/assets/sprites/deep-space.jpg');

      this.components = {};

      this.components['Player 1'] = new Player({
          name: 'Player 1',
          color: '#ff0000',
          decals: 'stripes',
          position: {
            x: 150,
            y: 50
          }
        },
        this.game,
        this.controls[0]
      );

      // for (var i = 0; i < 200; i++) {
      //   this.components[`Mushroom ${i}`] = new Mushroom({
      //       name: `Mushroom ${i}`,
      //       color: '#00ff00',
      //       decals: 'dots',
      //       position: {
      //         x: this.game.world.randomX,
      //         y: this.game.world.randomY
      //       }
      //     },
      //     this.game
      //   );
      // }

      Object.keys(this.components).forEach(function(key) {
        this.components[key].loadImage();
      }, this);
    },

    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      // this.game.physics.startSystem(Phaser.Physics.P2JS);
      //this.game.physics.p2.restitution = 0.9;
      // this.game.physics.p2.friction = 0.1;
      //this.game.physics.p2.setImpactEvents(true);

      // this.game.stage.backgroundColor = '#ddd';
      this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

      // this.game.world.resize(6000, 6000);

      this.mushrooms = this.game.add.group();

      Object.keys(this.components).forEach(function(key) {
        this.components[key].addSprite();
        this.components[key].attachBehaviours();

        // if (key.startsWith('Mushroom')) {
        //   this.mushrooms.add(this.components[key].sprite);
        // }
      }, this);

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
      this.game.debug.text('deltaZ: ' + this.components['Player 1'].sprite.body.deltaZ(), 32, 296);
    }

  });

})();
