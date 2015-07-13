'use strict';

// import car from './entities/car.js';
// console.log('car', car);

class Component {
  constructor(phaser, color, decals) {
    this.game = phaser.game;
    this.controls = phaser.controls;
    this.name = name;
    this.color = color;
  }
}

class Sprite extends Component {
  constructor(phaser, color, decals) {
    super(phaser, color, decals);
    this.image = 'sprite';
    // this.attachBehaviours();
  }
  attachBehaviours() {

  }
  update(cursors) {

  }
  loadImage() {
    let image = this.image;
    this.game.load.image(image, `elements/game-instance/assets/sprites/${image}.png`);
  }
  addSprite() {
    this.sprite = this.game.add.sprite(50, 50, this.image);
  }
}

class Mushroom extends Sprite {
  constructor(phaser, color, decals) {
    super(phaser, color, decals);
    this.image = 'mushroom';
    // this.attachBehaviours();
  }
  attachBehaviours() {

  }
  update(cursors) {
    super.update(cursors);
  }
}

class Sonic extends Sprite {
  constructor(phaser, color, decals) {
    super(phaser, color, decals);
    this.image = 'sonic';
    // this.attachBehaviours();
  }
  attachBehaviours() {

  }
  update(cursors) {
    super.update(cursors);
  }
}

class Logo extends Sprite {
  constructor(phaser, color, decals) {
    super(phaser, color, decals);
    this.image = 'logo';
    // this.attachBehaviours();
  }
  attachBehaviours() {

  }
  update(cursors) {
    super.update(cursors);
  }
}

class Pedestrian extends Sprite {
  constructor(phaser, color, decals) {
    super(phaser, color, decals);
    this.image = 'pedestrian';
    // this.attachBehaviours();
  }
  attachBehaviours() {
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  }
  update(cursors) {
    super.update(cursors);
  }
  yell() {
    console.log(this.name + ' yells.');
  }
}

class Vehicle extends Sprite {
  constructor(phaser, color, decals) {
    super(phaser, color, decals);
    this.image = 'vehicle';
    // this.attachBehaviours();
  }
  attachBehaviours() {
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  }
  update(cursors) {
    super.update(cursors);
  }
  honk() {
    console.log(this.name + ' honks.');
  }
}

class Player extends Pedestrian {
  constructor(phaser, color, decals) {
    super(phaser, color, decals);
    this.image = 'player';
    // this.attachBehaviours();
  }
  attachBehaviours() {
    super.attachBehaviours();
    this.sprite.fixedToCamera = true;
  }
  update(cursors) {
    super.update(cursors);
  }
  yell() {
    super.yell();
    console.log(this.name + ' yells uproariously.');
  }
}

class Car extends Vehicle {
  constructor(phaser, color, decals) {
    super(phaser, color, decals);
    this.image = 'car';
    // this.attachBehaviours();
  }
  attachBehaviours() {

  }
  update(cursors) {
    console.log('update()');
    super.update(cursors);

    this.sprite.body.angularAcceleration = 0;

    if (cursors.left.isDown) {
      this.game.camera.x -= 4;
      this.sprite.body.angularAcceleration -= 200;
    } else if (cursors.right.isDown) {
      this.game.camera.x += 4;
      this.sprite.body.angularAcceleration += 200;
    }
  }
  update(cursors) {
    super.update(cursors);
  }
  honk() {
    super.honk();
    console.log(this.name + ' honks normally.');
  }
}

class Truck extends Vehicle {
  constructor(phaser, color, decals) {
    super(phaser, color, decals);
    this.image = 'truck';
    // this.attachBehaviours();
  }
  attachBehaviours() {

  }
  update(cursors) {
    super.update(cursors);
  }
  honk() {
    super.honk();
    console.log(this.name + ' honks loudly.');
  }
}

class Motorcycle extends Vehicle {
  constructor(phaser, color, decals) {
    super(phaser, color, decals);
    this.image = 'motorcycle';
    // this.attachBehaviours();
  }
  attachBehaviours() {

  }
  update(cursors) {
    super.update(cursors);
  }
  honk() {
    super.honk();
    console.log(this.name + ' honks pathetically.');
  }
}

class HondaCivic extends Car {
  constructor(phaser, color, decals) {
    super(phaser, color, decals);
    this.image = 'honda_civic';
    // this.attachBehaviours();
  }
  attachBehaviours() {

  }
  update(cursors) {
    super.update(cursors);
  }
  honk() {
    super.honk();
    console.log(this.name + ' honks majestically.');
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

      this.components['Edmund'] = new HondaCivic(this, '#ff0000');
      this.components['Toad'] = new Mushroom(this, '#00ff00');

      Object.keys(this.components).forEach(function(key) {
        this.components[key].loadImage();
      }, this);
    },

    create: function() {
      this.cursors = this.game.input.keyboard.createCursorKeys();

      this.game.world.resize(6000, 600);

      Object.keys(this.components).forEach(function(key) {
        this.components[key].addSprite();
        // this.components[key].attachBehaviours();
      }, this);
    },

    update: function() {
      // console.log('main update()');
      Object.keys(this.components).forEach(function(key) {
        // console.log('this.components[key]', this.components[key]);
        this.components[key].update(this.cursors);
      }, this);
    },

    resize: function() {
    },

    render: function() {
      this.game.debug.cameraInfo(this.game.camera, 32, 32);
    }

  });

})();
