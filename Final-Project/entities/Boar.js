


class Boar extends Enemy {
    constructor(scene, x, y) {
        super(scene, x, y, 'Boar-idle');

        BoarAnims(scene.anims);
    }

    update(time, delta) {
        super.update(time, delta);
        this.play("boarIdle", true);
    }
}



