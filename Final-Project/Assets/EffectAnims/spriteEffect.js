
class spriteEffect extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, effectName) {
        super(scene, x, y, effectName);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.target = null;
        this.effectName = effectName;

    }

    placeEffect(offsetX = 0, offsetY = 0) {
        if (!this.target) { return; }
        const center = this.target.getCenter();
        this.body.reset(center.x + offsetX, center.y + offsetY);
    }

    playOn(target) {
        this.target = target;
        this.play(this.effectName, true);
        this.placeEffect();
    }
}

window.spriteEffect = spriteEffect;