


class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        Object.assign(this, CollisionMixin);
        this.init();
        this.initEvents();



    }



    init() {
        this.gravity = 500;
        this.Speed = 150;
        this.health = 100;
        this.attack = 20;
        this.platformColliders = null;

        this.rayGraphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0xaa00aa } });

        this.body.setGravityY(this.gravity);
        this.setScale(1.5);
        this.setSize(27, 27);
        this.setOffset(7, 6);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.setOrigin(0.5, 1);

        BoarAnims(this.scene.anims);

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update(time, delta) {
        const { ray, hitTheLayer } = this.raycast(this.body, this.platformColliders);

        if (hitTheLayer) {
            console.log('hit the platform')
        }

        this.rayGraphics.clear();
        this.rayGraphics.strokeLineShape(ray);
    }

    setPlatformColliders(platformColliders) {
        this.platformColliders = platformColliders;
    }
    raycast(body, layer, rayLength = 30) {
        const { x, y, width, halfHeight } = body;
        const line = new Phaser.Geom.Line();
        const isFacingLeft = !(this.flipX)
        let hitTheLayer = false;

        line.x1 = isFacingLeft ? x : x + width;
        line.y1 = y + halfHeight;
        line.x2 = isFacingLeft ? line.x1 - rayLength : line.x1 + rayLength;
        line.y2 = line.y1 + rayLength;

        const hits = layer.getTilesWithinShape(line);
        if (hits.length > 0) {
            // hit at least one colliable platform 
            hitTheLayer = hits.some(hit => hit.index !== -1);
        }

        return { ray: line, hitTheLayer };


    }


}





