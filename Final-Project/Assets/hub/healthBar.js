class HealthBar {
    constructor(scene, x, y, health) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.bar.setScrollFactor(0);

        this.x = x;
        this.y = y;
        this.value = health;

        this.size = {
            width: 90,
            height: 10,
        }

        this.pixelperhealth = this.size.width / this.value;

        scene.add.existing(this.bar);
        this.draw(x, y);
    }

    draw(x, y) {
        this.bar.clear();
        const { width, height } = this.size;

        this.bar.lineStyle(3, 0x000000, 1);
        this.bar.strokeRect(x, y, width, height);

        this.bar.fillStyle(0x08f90f);
        this.bar.fillRect(x, y, width, height);
    }

}

window.HealthBar = HealthBar;
