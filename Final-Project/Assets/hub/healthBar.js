class HealthBar {
    constructor(scene, x, y, scale = 1, health) {
        this.bar = new Phaser.GameObjects.Graphics(scene);


        this.x = x / scale;
        this.y = y / scale;
        this.scale = scale;
        this.value = health;

        this.size = {
            width: 90,
            height: 10,
        }

        this.pixelperhealth = this.size.width / this.value;

        scene.add.existing(this.bar);
        this.draw(this.x, this.y, this.scale);
    }

    decrease(amount) {
        if (amount <= 0) {
            this.value = 0;
        }
        else {
            this.value = amount;
        }

        this.value = amount;
        this.draw(this.x, this.y, this.scale);
    }

    draw(x, y, scale) {
        this.bar.clear();
        const { width, height } = this.size;

        const margin = 1;

        //this.bar.fillStyle(0x08f90f);
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(x, y, width + margin, height + margin);

        this.bar.fillStyle(0xFFFFFF)
        this.bar.fillRect(x + margin, y + margin, width - margin, height - margin);

        const healthWidth = Math.floor(this.value * this.pixelperhealth);

        if (healthWidth <= this.size.width / 3) {
            this.bar.fillStyle(0xFF0000);
        }
        else {
            this.bar.fillStyle(0x00CC00);
        }

        if (healthWidth > 0) {
            this.bar.fillRect(x + margin, y + margin, healthWidth - margin, height - margin);
        }

        return this.bar
            .setScrollFactor(0, 0)
            .setScale(scale);
    }

}

window.HealthBar = HealthBar;
