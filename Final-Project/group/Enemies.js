
class Enemies extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene);
    }

    getTypes() {
        return getEnemyTypes();
    }
}