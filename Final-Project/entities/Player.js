


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
        this.damage = 10;

        //jump
        //Maxjump = 0 jump once 
        //Maxjump = 1 double jump
        this.jumpCount = 0;
        this.maxJump = 1;
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

        //invincible key 
        this.invincible = false;
        this.invincibleTime = 2500;

        //enemy collider 
        this.enemyColliders = [];

        //projectile pool 
        this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
        this.ProjectilesPool = new ProjectilesPool(this.scene, 'playerProjectile');
        this.isLaunchAnimationPlaying = false;

        this.lastLaunchTime = 0;
        this.launchCoolDown = 1100;

        //create attack box 
        this.attackBox = new AttackBox(this.scene, 0, 0, "attack-box", this.damage);

        //player health 
        this.maxHealth = 100;
        this.health = this.maxHealth;

        //player mana
        this.maxMana = 100;
        this.currentMana = this.maxMana;
        this.manaCost = 25;


        //create health bar 
        const gameConfig = this.scene.registry.get("gameConfig");
        this.hp = new HealthBar(this.scene, gameConfig.leftTopCorner.x + 25, gameConfig.leftTopCorner.y + 10, 1.32, this.health);


        //create mana bar 
        this.mana = new manaBar(this.scene, gameConfig.leftTopCorner.x + 25, gameConfig.leftTopCorner.y + 27, 1.32, this.currentMana)


        //player physics
        this.body.setGravityY(this.gravity);
        this.setScale(1.5);
        this.setSize(20, 38);
        this.setOffset(45, 42);
        this.setCollideWorldBounds(true);
        this.setOrigin(0.5, 1);


        PlayerAnimation(this.scene.anims);

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        projectilesAnimation(this.scene.anims);

        //launch projectile
        this.scene.input.keyboard.on('keydown-C', () => {

            if (
                this.isInLaunchCoolDown() ||
                this.hasBeenHit ||
                this.isRolling ||
                this.isAttacking ||
                this.currentMana <= 0
            ) {
                console.log("Cannot launch: busy or in cooldown");
                return;
            }
            this.isLaunchAnimationPlaying = true;

            this.play("launch", true);
            //console.log(this.scene.anims.exists('launch'));
            this.currentMana -= this.manaCost;
            this.mana.decrease(this.currentMana);


            this.once("animationcomplete", () => {
                this.isLaunchAnimationPlaying = false;
                this.handleAnimation();
            });

            this.ProjectilesPool.fireProjectile(this, 0, 30);

            this.lastLaunchTime = this.scene.time.now;
        });
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }


    update(time, delta) {
        if (this.hasBeenHit) { return; }

        if (this.isAttacking || this.isRolling) {
            return;
        }

        if (this.isLaunchAnimationPlaying) {
            return;
        }





        this.handleNormalMovement();
        this.handleAnimation();
        this.handleJump();



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

    increaseMaxHealth(amount) {
        this.maxHealth += amount;
        this.health = this.maxHealth;
        this.hp.increaseMaxHealth(amount);
    }

    increaseMaxMana(amount) {
        this.maxMana += amount;
        this.mana = this.maxMana;
        this.mana.increaseMaxMana(amount);
    }

    isInLaunchCoolDown() {
        const currentTime = this.scene.time.now;
        return (currentTime - this.lastLaunchTime) < this.launchCoolDown;
    }



    handleJump() {
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(this.cursors.space);


        this.onGroundBuffer = this.body.onFloor() ? 5 : Math.max(this.onGroundBuffer - 1, 0);
        if (this.onGroundBuffer > 0) {
            this.jumpCount = 0;
        }

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
        if (this.isLaunchAnimationPlaying) { return };
        if (this.cursors.left.isDown) {
            this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
            this.setVelocityX(-this.playerSpeed);
            this.setOffset(55, 42);
            this.flipX = true;
        }
        else if (this.cursors.right.isDown) {
            this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
            this.setVelocityX(this.playerSpeed);
            this.setOffset(45, 42);
            this.flipX = false;
        }
        else {
            this.setVelocityX(0);
        }
    }


    attack() {
        if (this.isAttacking || this.hasBeenHit) return;
        this.isAttacking = true;

        this.attackBox.swing(this);
        this.setVelocityX(0);
        let attackAnim = (this.comboStep === 0) ? "attack1" : "attack2";
        this.play(attackAnim, true);

        this.once("animationcomplete", () => {

            this.attackBox.activeAttackBox(false);

            this.isAttacking = false;
            this.comboStep++;



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


        this.attackBox.swing(this);

        this.isAttacking = true;
        this.play("attack2", true);
        this.once("animationcomplete", () => {
            this.attackBox.activeAttackBox(false);
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

            // this.scene.time.delayedCall(3000, () => {
            //     this.rollCooldown = false; // cd 3 sec
            // });

            this.scene.time.delayedCall(300, () => {
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
        // this.body.touching.right ?
        // this.setVelocityX(-this.bounceVelocity * 0.6) :
        // this.setVelocityX(this.bounceVelocity * 0.6);
        //setTimeout(() => this.setVelocityY(-this.bounceVelocity ), 0);
        this.setVelocityY(-this.bounceVelocity * 2.5);

    }
    //player takes hit 
    takesHit(source) {

        if (this.hasBeenHit || this.isRolling) { return; }
        this.hasBeenHit = true;
        this.isAttacking = false;
        this.isLaunchAnimationPlaying = false;


        this.anims.stop();
        this.bounceOff();
        this.play("takesHit", true);
        //const damgeAnimation = this.playDamageTween();

        this.health -= source.damage;
        this.hp.decrease(this.health);
        source.deliverHit(this);

        this.setInvincible(this.invincibleTime);
        //reset animation
        this.once("animationcomplete", () => {
            this.resetState();
        });

        this.scene.time.delayedCall(300, () => {
            this.hasBeenHit = false;
        });


        // this.scene.time.delayedCall(1000, () => {
        //     this.hasBeenHit = false;
        //     damgeAnimation.stop();
        //     this.alpha = 1
        // });


    }

    //updateHealth bar 
    updateHealthBar(amount) {
        this.hp.decrease(amount);
    }

    //reset any animation in case error
    resetState() {
        this.isAttacking = false;
        this.isRolling = false;
        this.hasBeenHit = false;
        this.rollCooldown = false;
        this.setAlpha(1);
    }

    emergencyReset() {
        this.resetState();
        this.anims.stop();
        this.play("idle");
        this.setVelocityX(0);
    }

    //set invincible 
    setInvincible(duration = 2000) {
        this.invincible = true;

        const flashTween = this.scene.tweens.add({
            targets: this,
            alpha: 0.3,
            ease: 'Linear',
            duration: 100,
            repeat: 4,
            yoyo: true,
        });

        this.scene.time.delayedCall(500, () => {
            flashTween.stop();
            this.setAlpha(0.5);
        });

        this.scene.time.delayedCall(duration, () => {
            this.invincible = false;
            this.setAlpha(1);
        });
    }



}





