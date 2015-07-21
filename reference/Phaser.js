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


//
data: Body
_wakeUpAfterNarrowphase: false
aabb: AABB
aabbNeedsUpdate: true
allowSleep: true
angle: 0
angularDamping: 0.1
angularForce: 0
angularVelocity: 0
boundingRadius: 1.9300259065618783
ccdIterations: 10
ccdSpeedThreshold: -1
collisionResponse: true
concavePath: null
damping: 0.1
fixedRotation: false
force: Float32Array[2]
gravityScale: 1
id: 5
idleTime: 0
inertia: 1.241666666666667
interpolatedAngle: 0
interpolatedPosition: Float32Array[2]
invInertia: 0.8053691275167784
invInertiaSolve: 0
invMass: 1
invMassSolve: 0
mass: 1
parent: Phaser.Physics.P2.Body
position: Float32Array[2]
previousAngle: 0
previousPosition: Float32Array[2]
shapeAngles: Array[1]
shapeOffsets: Array[1]
shapes: Array[1]
sleepSpeedLimit: 0.2
sleepState: 0
sleepTimeLimit: 1
timeLastSleepy: 0
type: 1
velocity: Float32Array[2]
vlambda: Float32Array[2]
wantsToSleep: false
wlambda: 0
world: World
__proto__: Body
debug: (...)
debugBody: null
dirty: false
dynamic: (...)
fixedRotation: (...)
