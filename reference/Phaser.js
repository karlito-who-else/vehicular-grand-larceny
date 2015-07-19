accelerate() {
  // console.log('accelerate', 'velocity', this.sprite.body.velocity, 'angle', this.sprite.angle);
  this.game.physics.arcade.velocityFromAngle(this.sprite.angle, 3000, this.sprite.body.velocity);
  // this.sprite.body.moveUp(100);
}

decelerate() {
  // console.log('accelerate', 'velocity', this.sprite.body.velocity, 'angle', this.sprite.angle);
  if (this.sprite.body.velocity > 0) {
    this.sprite.body.velocity -= ((this.sprite.body.velocity -= this.attributes.body.movementDecelerationSpeed) >= 0) ? this.attributes.body.movementDecelerationSpeed : this.sprite.body.velocity;
  }
  // this.sprite.body.moveDown(100);
}

turnLeft() {
  this.sprite.body.angularVelocity -= this.attributes.body.turningAccelerationSpeed;
  // this.sprite.body.moveLeft(100);
}

turnRight() {
  this.sprite.body.angularVelocity += this.attributes.body.turningAccelerationSpeed;
  // this.sprite.body.moveRight(100);
}
