


class Mushroom extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'MushroomRun');

        MushRoomAnims(scene.anims);

    }

    init() {
        super.init();
        this.Speed = 55;
        this.maxMoveDistance = 200;
    }

    update(time, delta) {
        this.adjustSizeOnFlip();
        super.update(time, delta);

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

}





