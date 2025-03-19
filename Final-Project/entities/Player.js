


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

        //player properties
        this.gravity = 500;
        this.playerSpeed = 150;

        //jump
        //Maxjump = 0 jump once 
        //Maxjump = 1 double jump
        this.jumpCount = 0;
        this.maxJump = 0;
        this.previousVelocityY = 0;
        this.isJumpRequested = false;

        // attack key
        this.attackKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.isAttacking = false;
        this.comboStep = 0;  // follow current attack level
        this.comboTimer = null;

        //roll key
        this.rollKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.isRolling = false;


        //hit 
        this.hasBeenHit = false;
        this.bounceVelocity = 120;



        //player physics
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
        if (this.hasBeenHit) { return; }

        if (this.isAttacking || this.isRolling) {
            return;
        }





        this.handleNormalMovement();
        this.handleAnimation();
        this.handleJump();





        // if (Phaser.Input.Keyboard.JustDown(this.attackKey) && !this.isAttacking) {
        //     this.attack();
        // }

        if (Phaser.Input.Keyboard.JustDown(this.attackKey) && !this.isAttacking) {
            if (this.body.onFloor()) {
                console.log("attack");
                this.attack();
            }
            else if (!this.body.onFloor()) {
                console.log("attack on air");
                this.attackOnAir();
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.rollKey)) {
            this.roll();
        }



        this.previousVelocityY = this.body.velocity.y;

    }



    handleJump() {
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.space);

        if (isSpaceJustDown && (this.body.onFloor() || this.jumpCount < this.maxJump)) {

            this.setVelocityY(-this.playerSpeed * 2);
            this.isJumpRequested = true;
            this.jumpCount++;
            //console.log(this.jumpCount);

        }
    }

    handleAnimation() {
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
    }

    handleNormalMovement() {
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
    }


    attack() {
        if (this.isAttacking) return;
        this.isAttacking = true;

        this.setVelocityX(0);  // stop moving
        let attackAnim = "";

        // select attack animation
        if (this.comboStep === 0) {
            attackAnim = "attack1";
        } else if (this.comboStep === 1) {
            attackAnim = "attack2";
        }

        this.play(attackAnim, true);

        // End of the animation and allow the next combo
        this.once("animationcomplete", () => {
            this.isAttacking = false;
            this.comboStep++;

            // If the player does not press the attack button within 0.2 seconds, the combo is reset
            if (this.comboTimer) {
                this.comboTimer.remove();
            }
            this.comboTimer = this.scene.time.delayedCall(200, () => {
                this.comboStep = 0;
            });
        });
    }

    attackOnAir() {
        if (this.isAttacking) return;
        this.isAttacking = true;
        this.play("attack2", true);
        this.once("animationcomplete", () => {
            this.isAttacking = false;
        });
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.playerSpeed * 0.8);
            this.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.playerSpeed * 0.8);
            this.flipX = false;
        }

    }

    roll() {

        if (this.isRolling || this.isAttacking || this.rollCooldown) return;
        this.isRolling = true;
        this.rollCooldown = true;

        this.setVelocityX(this.flipX ? -200 : 200);
        this.anims.play("roll", true);


        this.body.checkCollision.left = false;
        this.body.checkCollision.right = false;
        this.body.checkCollision.up = false;

        this.setAlpha(0.7);

        this.once("animationcomplete", () => {
            this.isRolling = false;


            this.body.checkCollision.left = true;
            this.body.checkCollision.right = true;
            this.body.checkCollision.up = true;

            this.setAlpha(1);

            if (this.body.velocity.x !== 0) {
                this.anims.play("run", true);
            } else {
                this.anims.play("idle", true);
            }

            this.scene.time.delayedCall(3000, () => {
                this.rollCooldown = false; // cd 3 sec
            });
        });
    }

    playDamageTween() {
        return this.scene.tweens.add({
            targets: this,
            duration: 150,
            repeat: -1,
            // yoyo: true,
            alpha: 0,
            onComplete: () => {
                this.alpha = 1;
            }
        });
    }


    bounceOff() {
        this.body.touching.right ?
            this.setVelocityX(-this.bounceVelocity * 0.6) :
            this.setVelocityX(this.bounceVelocity * 0.6);
        setTimeout(() => this.setVelocityY(-this.bounceVelocity), 0);

    }
    //player takes hit 
    takesHit(initiator) {

        if (this.hasBeenHit) { return; }
        this.hasBeenHit = true;
        this.bounceOff();
        this.play("takesHit", true);
        const damgeAnimation = this.playDamageTween();

        this.scene.time.delayedCall(1000, () => {
            this.hasBeenHit = false;
            damgeAnimation.stop();
            this.alpha = 1
        });


    }


}





