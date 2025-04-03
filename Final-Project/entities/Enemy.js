


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
        this.Speed = 75;
        this.health = 100;
        this.damage = 20;
        this.scale = 1.5;
        this.resetTimeAfterTurn = 0;
        this.maxMoveDistance = 100;
        this.currentDistance = 0;
        this.platformColliders = null;
        this.rayGraphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } });

        this.body.setGravityY(this.gravity);
        this.setScale(this.scale);
        // this.setSize(27, 27);
        // this.setOffset(7, 6);
        this.setSize(27, 27);
        this.setOffset(13, 6);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.setOrigin(0.5, 1);
        this.setVelocityX(-this.Speed);
        BoarAnims(this.scene.anims);

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update(time) {
        this.patrol(time);


    }

    patrol(time) {
        if (!this.body || !this.body.onFloor()) {
            return;
        }

        this.currentDistance += Math.abs(this.body.deltaX());
        const { ray, hitTheLayer } = this.raycast(this.body, this.platformColliders, { rayLength: 30, precision: 1, steepnes: 0.5 });

        if ((!hitTheLayer || this.currentDistance >= this.maxMoveDistance) &&
            this.resetTimeAfterTurn + 100 < time) {
            this.setFlipX(this.Speed < 0);
            console.log
            this.setVelocityX(this.Speed = -this.Speed);
            this.resetTimeAfterTurn = time;
            this.currentDistance = 0;
        }

        this.rayGraphics.clear();
        this.rayGraphics.lineStyle(2, 0xff0000);
        this.rayGraphics.strokeLineShape(ray.edgeLine);
        this.rayGraphics.lineStyle(2, 0x0000ff);
        this.rayGraphics.strokeLineShape(ray.wallLine);
    }

    setPlatformColliders(platformColliders) {
        this.platformColliders = platformColliders;
    }



}





