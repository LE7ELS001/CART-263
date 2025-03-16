


class Boar extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'Boar-idle');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        Object.assign(this, CollisionMixin);
        this.init();



    }



    init() {
        this.gravity = 500;
        this.Speed = 150;

        this.body.setGravityY(this.gravity);
        this.setScale(1.2);
        // this.setSize(20, 38);
        // this.setOffset(45, 42);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);
    }
}





