'use strict';

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
      attributes.body.mass = 100;
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

  render() {
    super.render();
  }

  honk() {
    super.honk();
    console.log(this.name + ' honks normally.');
  }

}

export default config;
