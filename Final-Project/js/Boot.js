class Boot extends Phaser.Scene {
    constructor() {
        super({
            key: 'boot'
        });
    }

    preload() {

        //load Player Assets
        this.load.spritesheet("avatar-idle", "Assets/Character/Player/_Idle.png", {
            frameWidth: 120,
            frameHeight: 80,
            spacing: 0,
            endFrame: 9
        });

        this.load.spritesheet("avatar-run", "Assets/Character/Player/_Run.png", {
            frameWidth: 120,
            frameHeight: 80,
            spacing: 0,
            endFrame: 9
        });

        this.load.spritesheet("attack1", "Assets/Character/Player/_Attack.png", {
            frameWidth: 120,
            frameHeight: 80,
            spacing: 0,
            endFrame: 3
        });

        this.load.spritesheet("attack2", "Assets/Character/Player/_Attack2.png", {
            frameWidth: 120,
            frameHeight: 80,
            spacing: 0,
            endFrame: 5
        });

        this.load.spritesheet("roll", "Assets/Character/Player/_Roll.png", {
            frameWidth: 120,
            frameHeight: 80,
            spacing: 0,
            endFrame: 11
        });

        this.load.spritesheet("avatar-jump", "Assets/Character/Player/_Jump.png", {
            frameWidth: 120,
            frameHeight: 80,
            spacing: 0,
            endFrame: 2
        });

        this.load.spritesheet("avatar-fall", "Assets/Character/Player/_Fall.png", {
            frameWidth: 120,
            frameHeight: 80,
            spacing: 0,
            endFrame: 2
        });

        this.load.spritesheet("avatar-Jumpfall", "Assets/Character/Player/_JumpFall.png", {
            frameWidth: 120,
            frameHeight: 80,
            spacing: 0,
            endFrame: 1
        });

        this.load.spritesheet("avatar-wallslide", "Assets/Character/Player/_WallSlide.png", {
            frameWidth: 120,
            frameHeight: 80,
            spacing: 0,
            endFrame: 2
        });

        this.load.image("avatar-takesHit", "Assets/Character/Player/_Hit.png");

        /**
         * Load enemy
         */

        //Boar
        this.load.spritesheet("Boar-idle", "Assets/enemy/Boar_normal/Idle-Sheet.png", {
            frameWidth: 48,
            frameHeight: 32,
            spacing: 0,
            endFrame: 3
        });

        this.load.spritesheet("Boar-walk", "Assets/enemy/Boar_normal/Walk-Base-Sheet.png", {
            frameWidth: 48,
            frameHeight: 32,
            spacing: 0,
            endFrame: 5
        });

        this.load.spritesheet("Boar-run", "Assets/enemy/Boar_normal/Run-Sheet.png", {
            frameWidth: 48,
            frameHeight: 32,
            spacing: 0,
            endFrame: 5
        });


        //load map tile
        this.load.tilemapTiledJSON('testMap', "Assets/Map/TestMap.json");
        this.load.image('tiles-1', 'Assets/Tiles/ForestTiles.png');


        this.load.image("Test-tile", "Assets/Tiles/Forest/Tiles.png");


        //load background
        this.load.image("forest-bg", "Assets/Map/background forest.png");


        this.load.on('complete', () => {
            this.scene.start('scene1');
        });


    }

    create() {


    }

    update() {

    }
}