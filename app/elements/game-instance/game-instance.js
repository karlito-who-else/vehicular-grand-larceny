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
    super(attributes, game, cursors);
    if (!this.attributes.image) {
      this.attributes.image = 'sprite';
    }
  }
  attachBehaviours() {
    // super.attachBehaviours();
    this.sprite.anchor.setTo(0.5, 0.75);
  }
  update() {

  }
  loadImage() {
    let image = this.attributes.image;
    this.game.load.image(image, `elements/game-instance/assets/sprites/${image}.png`);
  }
  addSprite() {
    console.log('this.game', this.game);
    console.log('this.attributes', this.attributes);
    this.sprite = this.game.add.sprite(50, 50, this.attributes.image);
  }
}

class Mushroom extends Sprite {
  constructor(attributes, game, cursors) {
    super(attributes, game, cursors);
    if (!this.attributes.image) {
      this.attributes.image = 'mushroom';
    }
  }
  attachBehaviours() {
    super.attachBehaviours();
  }
  update() {
    super.update();
  }
}

class Sonic extends Sprite {
  constructor(attributes, game, cursors) {
    super(attributes, game, cursors);
    if (!this.attributes.image) {
      this.attributes.image = 'sonic';
    }
  }
  attachBehaviours() {
    super.attachBehaviours();super.attachBehaviours();
  }
  update() {
    super.update();
  }
}

class Logo extends Sprite {
  constructor(attributes, game, cursors) {
    super(attributes, game, cursors);
    if (!this.attributes.image) {
      this.attributes.image = 'logo';
    }
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
    super(attributes, game, cursors);
    if (!this.attributes.image) {
      this.attributes.image = 'pedestrian';
    }
  }
  attachBehaviours() {
    super.attachBehaviours();
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
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
    super(attributes, game, cursors);
    if (!this.attributes.image) {
      this.attributes.image = 'vehicle';
    }
  }
  attachBehaviours() {
    super.attachBehaviours();
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
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
    super(attributes, game, cursors);
    if (!this.attributes.image) {
      this.attributes.image = 'car';
    }
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
    super(attributes, game, cursors);
    if (!this.attributes.image) {
      this.attributes.image = 'truck';
    }
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
    super(attributes, game, cursors);
    if (!this.attributes.image) {
      this.attributes.image = 'motorcycle';
    }
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
  }
  update() {
    this.attributes.camera = {
      x: 4
    };
    this.attributes.turningSpeed = 5;
    super.update();
    if (this.cursors.up.isDown) {
        this.game.physics.arcade.accelerationFromRotation(this.sprite.rotation, 200, this.sprite.body.acceleration);
    } else {
        this.sprite.body.acceleration.set(0);
    }

    if (this.cursors.left.isDown) {
      // this.game.camera.x -= this.attributes.camera.x;
      // this.sprite.body.angularAcceleration -= this.attributes.body.angularAcceleration;
      this.sprite.body.angularVelocity -= this.attributes.turningSpeed;
    } else if (this.cursors.right.isDown) {
      // this.game.camera.x += this.attributes.camera.x;
      // this.sprite.body.angularAcceleration += this.attributes.body.angularAcceleration;
      this.sprite.body.angularVelocity += this.attributes.turningSpeed;
    } else {
      this.sprite.body.angularVelocity = 0;
    }
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

      this.state = {
        preload: this.preload,
        create: this.create,
        update: this.update,
        render: this.render
      };

      this.game = new Phaser.Game(this.canvasWidth, this.canvasHeight, Phaser.AUTO, this.$.canvas.id, this.state);
    },

    preload: function() {
      this.game.stage.backgroundColor = '#ddd';

      this.components = {};

      this.components['Player 1'] = new Player({
          name: 'Player 1',
          color: '#ff0000',
          decals: 'stripes'
        },
        this.game,
        this.game.input.keyboard.createCursorKeys()
      );

      // this.components['Toad'] = new Mushroom({
      //   name: 'Toad',
      //   color: '#00ff00',
      //   decals: 'dots'
      // }, this.game);

      Object.keys(this.components).forEach(function(key) {
        // this.components[key].loadImage(this.game);
        this.components[key].loadImage();
      }, this);
    },

    create: function() {
      this.game.world.resize(6000, 600);

      Object.keys(this.components).forEach(function(key) {
        // this.components[key].addSprite(this.game);
        // this.components[key].attachBehaviours(this.game);
        this.components[key].addSprite();
        this.components[key].attachBehaviours();
      }, this);
    },

    update: function() {
      Object.keys(this.components).forEach(function(key) {
        // this.components[key].update(this.game, this.cursors);
        this.components[key].update();
      }, this);
    },

    resize: function() {
    },

    render: function() {
      this.game.debug.cameraInfo(this.game.camera, 32, 32);
    }

  });

})();
