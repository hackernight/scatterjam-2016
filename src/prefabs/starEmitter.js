//Documentation for Phaser's (2.6.2) emitter:: phaser.io/docs/2.6.2/Phaser.Particles.Arcade.Emitter.html
class StarEmitter extends Phaser.Particles.Arcade.Emitter {

  //initialization code in the constructor
  constructor(game, x, y, maxParticles) {
    super(game, x, y, maxParticles);
    this.makeParticles('particle-star');
    this.minParticleSpeed.setTo(-300, -300);
    this.maxParticleSpeed.setTo(300, 300);
    this.setAlpha(1, 0, 4000, Phaser.Easing.Exponential.Out);
  }

}

export default StarEmitter;
