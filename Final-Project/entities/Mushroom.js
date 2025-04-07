


class Mushroom extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'MushroomRun');

        MushRoomAnims(scene.anims);

        this.projectileWidth = 60;
        this.projectileHeight = 35;
        this.setSize(this.projectileWidth, this.projectileHeight); // 设置碰撞盒大小
        this.setOffset(-this.projectileWidth / 2, -this.projectileHeight / 2);

    }

    init() {
        super.init();
        this.Speed = 55;
        this.maxMoveDistance = 200;

        this.projectilePool = new ProjectilesPool(this.scene, "mushroomProjectile");
        this.timeFromLastShot = 0;
        this.attackDelay = this.getAttackDelay();
    }

    update(time, delta) {
        this.adjustSizeOnFlip();
        super.update(time, delta);

        if (this.timeFromLastShot + this.attackDelay <= time) {
            this.projectilePool.fireProjectile(this);

            this.timeFromLastShot = time;
            this.attackDelay = this.getAttackDelay();
        }

        if (!this.active) { return; }
        if (this.Speed === 0) {

            this.play("MushroomIdle", true);
        }
        else {
            this.play("MushroomRun", true);
        }

        this.flipX = this.Speed < 0;

    }


    adjustSizeOnFlip() {

        if (this.flipX) {
            this.setSize(15, 36);
            this.setOffset(67, 2);

        } else {
            this.setSize(15, 36);
            this.setOffset(69, 2);

        }
    }

    getAttackDelay() {
        return Phaser.Math.Between(1000, 4000);
    }

}





