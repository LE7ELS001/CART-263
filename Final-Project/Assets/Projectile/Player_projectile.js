
class Player_projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = 300;


    }

    fire() {
        console.log('launch the projectil');
        this.setVelocityX(this.speed);
    }
}

window.Player_projectile = Player_projectile;
