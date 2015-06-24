'use strict';

(function() {
  Polymer({
    is: 'game-instance',

    properties: {
      greeting: {
        type: String,
        value: 'Game on!',
        notify: true
      }
    }
  });

  var canvasId = 'phaser-example-canvas';
  var cursors;
  var game;
  var logo1;
  var logo2;
  var state;

  function preload() {
    game.stage.backgroundColor = '#007236';
    game.load.image('mushroom', 'elements/game-istance/assets/sprites/mushroom2.png');
    game.load.image('sonic', 'elements/game-istance/assets/sprites/sonic_havok_sanity.png');
    game.load.image('phaser', 'elements/game-istance/assets/sprites/phaser1.png');
  }

  function create() {
    //  Modify the world and camera bounds
    game.world.resize(6000, 600);

    for (var i = 0; i < 200; i++) {
      game.add.sprite(game.world.randomX, game.world.randomY, 'mushroom');
    }

    game.add.text(32, 32, 'this text is on the background\nuse arrows to scroll', {
      font: '32px Arial',
      fill: '#f26c4f',
      align: 'left'
    });

    logo1 = game.add.sprite(100, 300, 'phaser');
    logo1.fixedToCamera = true;

    logo2 = game.add.sprite(500, 100, 'phaser');
    logo2.fixedToCamera = true;

    var t = game.add.text(200, 500, 'this text is fixed to the camera', {
      font: '32px Arial',
      fill: '#ffffff',
      align: 'center'
    });

    t.fixedToCamera = true;
    t.cameraOffset.setTo(200, 500);

    game.add.tween(logo2.cameraOffset).to({
      y: 400
    }, 2000, Phaser.Easing.Back.InOut, true, 0, 2000, true);

    cursors = game.input.keyboard.createCursorKeys();
  }

  function update() {
    if (cursors.left.isDown) {
      game.camera.x -= 4;
    } else if (cursors.right.isDown) {
      game.camera.x += 4;
    }
  }

  function render() {
    // game.debug.cameraInfo(game.camera, 32, 32);
  }

  console.log('gerroutofit!');

  state = {
    preload: preload,
    create: create,
    update: update,
    render: render
  };

  game = new Phaser.Game(800, 600, Phaser.AUTO, canvasId, state);
})();
