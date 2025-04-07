
class Enemy_projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.speed = 400;
        this.maxDistance = 550;
        this.traveledDistance = 0;
        this.key = key;
        this.damage = 50;
        this.coolDown = 1000;
        this.projectileWdith = 60;
        this.projectileHeight = 35;

        this.setScale(1.5);
        this.setSize(this.projectileWidth, this.projectileHeight); // 设置碰撞盒大小
        //this.setOffset(-this.projectileWidth / 2, -this.projectileHeight / 2);


        this.effectManager = new effectManager(this.scene);


    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.traveledDistance += this.body.deltaAbsX();

        if (this.isOutOfRange()) {
            this.body.reset(0, 0)
            this.activeProjectile(false);
            this.traveledDistance = 0;
        }
    }

    fire(x, y) {
        //this.setDisplaySize(this.projectileWdith, this.projectileHeight);
        this.activeProjectile(true);
        this.body.reset(x, y);
        //this.play("playerProjectile", true);
        this.play(this.key, true);
        this.setVelocityX(this.speed);
    }

    deliverHit(target) {
        this.activeProjectile(false);
        this.traveledDistance = 0;
        this.body.reset(0, 0);
        //this.effectManager.playEffectOn("enemyDead", target);



    }

    activeProjectile(isActive) {
        this.setActive(isActive);
        this.setVisible(isActive);

    }

    isOutOfRange() {
        return this.traveledDistance &&
            this.traveledDistance >= this.maxDistance;
    }
}

window.Enemy_projectile = Enemy_projectile;
