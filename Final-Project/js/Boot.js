class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: 'boot'
        });
    }

    preload() {

        //load Player Assets
        this.load.spritesheet("avatar-idle", "Assets/Character/Player/_Idle.png", {
            frameWidth: 65,
            frameHeight: 80,
            spacing: 55,
            endFrame: 9
        });

        this.load.spritesheet("avatar-run", "Assets/Character/Player/_Run.png", {
            frameWidth: 65,
            frameHeight: 80,
            spacing: 55,
            endFrame: 9
        });

        this.load.spritesheet("avatar-jump", "Assets/Character/Player/_Jump.png", {
            frameWidth: 65,
            frameHeight: 80,
            spacing: 55,
            endFrame: 2
        })

        this.load.spritesheet("avatar-fall", "Assets/Character/Player/_Fall.png", {
            frameWidth: 65,
            frameHeight: 80,
            spacing: 55,
            endFrame: 1
        })

        //load map tile
        this.load.tilemapTiledJSON('testMap', "Assets/Map/TestMap.json");
        this.load.image('tiles-1', 'Assets/Tiles/ForestTiles.png');


        this.load.image("Test-tile", "Assets/Tiles/Forest/Tiles.png");


        this.load.on('complete', () => {
            this.scene.start('scene1');
        });
    }

    create() {

    }

    update() {

    }
}