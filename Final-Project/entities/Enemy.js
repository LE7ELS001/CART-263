


class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        Object.assign(this, CollisionMixin);
        this.init();
        this.initEvents();



    }



    init() {
        this.gravity = 500;
        this.Speed = 150;
        this.health = 100;
        this.attack = 20;

        this.body.setGravityY(this.gravity);
        this.setScale(1.5);
        this.setSize(27, 27);
        this.setOffset(7, 6);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.setOrigin(0.5, 1);

        BoarAnims(this.scene.anims);

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update(time, delta) {

    }

}





