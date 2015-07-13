'use strict';

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
      greeting: {
        type: String,
        value: 'Game on!',
        notify: true
      }
    },

    // attached: function() {
    //   this.async(this.notifyResize, 1);
    // },

    // get parent() {
    //   if (this.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
    //     return this.parentNode.host;
    //   }
    //   return this.parentNode;
    // },

    _onIronResize: function() {
      console.log('_onIronResize');
      this.resize();
      // var x = this.x = Math.floor(this.parent.offsetWidth / 3);
      // var y = this.y = Math.floor(this.parent.offsetHeight / 3);
      // console.log('x', x);
      // console.log('y', y);
      // this.translate3d(x + 'px', y + 'px', 0);
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
      this.game.stage.backgroundColor = '#007236';
      this.game.load.image('mushroom', 'elements/game-instance/assets/sprites/mushroom2.png');
      this.game.load.image('sonic', 'elements/game-instance/assets/sprites/sonic_havok_sanity.png');
      this.game.load.image('phaser', 'elements/game-instance/assets/sprites/phaser1.png');
    },

    create: function() {
      //  Modify the world and camera bounds
      this.game.world.resize(6000, 600);

      this.mushrooms = this.game.add.group();

      for (var i = 0; i < 200; i++) {
        let mushroom = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'mushroom');
        this.mushrooms.add(mushroom);
      }

      this.game.physics.enable(this.mushrooms, Phaser.Physics.ARCADE);

      this.mushrooms.forEach(function(mushroom) {
        // game.physics.arcade.collide(item, platforms);
        // game.physics.arcade.overlap(player, item, gameOver);
        // item.body.velocity.x = -120;
        mushroom.body.maxAngular = 500;
        mushroom.body.angularDrag = 50;
      }, this);

      this.game.add.text(32, 32, 'this text is on the background\nuse arrows to scroll', {
        font: '32px Arial',
        fill: '#f26c4f',
        align: 'left'
      });

      this.logo1 = this.game.add.sprite(100, 300, 'phaser');
      this.logo1.fixedToCamera = true;

      this.logo2 = this.game.add.sprite(500, 100, 'phaser');
      this.logo2.fixedToCamera = true;

      var t = this.game.add.text(200, 500, 'this text is fixed to the camera', {
        font: '32px Arial',
        fill: '#ffffff',
        align: 'center'
      });

      t.fixedToCamera = true;
      t.cameraOffset.setTo(200, 500);

      this.game.add.tween(this.logo2.cameraOffset).to({
        y: 400
      }, 2000, Phaser.Easing.Back.InOut, true, 0, 2000, true);

      this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {
      if (this.cursors.left.isDown) {
        this.game.camera.x -= 4;
        this.mushrooms.alpha -= 0.01;
      } else if (this.cursors.right.isDown) {
        this.game.camera.x += 4;
        this.mushrooms.alpha += 0.01;
      }

      // if (this.game.camera.x > 100) {
      //   this.mushrooms.alpha = 0.2;
      // } else {
      //   this.mushrooms.alpha = 1.0;
      // }

      //  Reset the acceleration
      this.mushrooms.forEach(function(mushroom) {
        mushroom.body.angularAcceleration = 0;
      }, this);

      //  Apply acceleration if the left/right arrow keys are held down
      if (this.cursors.left.isDown) {
        this.mushrooms.forEach(function(mushroom) {
          mushroom.body.angularAcceleration -= 200;
        }, this);
      } else if (this.cursors.right.isDown) {
        this.mushrooms.forEach(function(mushroom) {
          mushroom.body.angularAcceleration += 200;
        }, this);
      }

    },

    resize: function() {
      if (!this.game) {
        return;
      }

      // this.game.height = this.canvasHeight;
      // this.game.width = this.canvasWidth;

      // if (this.game.renderType === Phaser.WEBGL) {
      // this.game.renderer.resize(this.canvasWidth, this.canvasHeight);
      // }
    },

    render: function() {
      this.game.debug.cameraInfo(this.game.camera, 32, 32);
    }

  });

})();
