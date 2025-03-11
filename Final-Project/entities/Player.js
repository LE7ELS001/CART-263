


class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'avatar-idle');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        this.gravity = 500;
        this.playerSpeed = 190;
        this.body.setGravityY(500);
        this.setScale(1.5);
        this.setCollideWorldBounds(true);

        PlayerAnimation(this.scene.anims);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update(time, delta) {

        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.playerSpeed);
            this.flipX = true;

        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(this.playerSpeed);
            this.flipX = false;
        }
        else {
            this.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.body.touching.down) {
            this.setVelocityY(-430);
        }
        else if (this.cursors.down.isDown) {
            this.setVelocityY(100);
        }
        else {
            this.setVelocityY(0);
        }

        if (this.body.velocity.x !== 0) {

            this.play("run", true);
        }
        // Otherwise it's not moving
        else {
            this.play("idle", true);
        }

    }

    handleInput() {

    }
}