


class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'avatar-idle');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        Object.assign(this, CollisionMixin);
        this.init();
        this.initEvents();


    }



    init() {
        this.gravity = 500;
        this.playerSpeed = 150;

        //jump
        //Maxjump = 0 jump once 
        //Maxjump = 1 double jump
        this.jumpCount = 0;
        this.maxJump = 0;
        this.previousVelocityY = 0;
        this.isJumpRequested = false;

        this.body.setGravityY(this.gravity);
        this.setScale(1.5);
        this.setSize(20, 38);
        this.setOffset(45, 42);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);

        PlayerAnimation(this.scene.anims);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update(time, delta) {
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.space);

        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.playerSpeed);
            this.setOffset(55, 42);
            this.flipX = true;
        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(this.playerSpeed);
            this.setOffset(45, 42);
            this.flipX = false;
        }
        else {
            this.setVelocityX(0);
        }

        if (isSpaceJustDown && (this.body.onFloor() || this.jumpCount < this.maxJump)) {

            this.setVelocityY(-this.playerSpeed * 1.8);
            this.isJumpRequested = true;
            this.jumpCount++;
            //console.log(this.jumpCount);

        }



        if (this.body.onFloor()) {
            this.jumpCount = 0;
            if (this.body.velocity.x !== 0) {
                this.play("run", true);

            }
            else {
                this.play("idle", true);
            }
        }
        else {
            if (this.isJumpRequested) {
                this.play("jump", true);
                this.isJumpRequested = false;
            }
            else if (this.previousVelocityY <= 0 && this.body.velocity.y > 0) {

                this.play("jumpfall", true);
            }
            else if (this.body.velocity.y > 0) {

                this.play("fall", true);
            }
        }

        this.previousVelocityY = this.body.velocity.y;

    }


}





