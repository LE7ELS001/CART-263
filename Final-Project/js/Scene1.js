class Scene1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'scene1'
        });
    }

    create() {

        this.physics.world.gravity.y = 400;
        //test floor 
        const map = this.createMap();
        const layers = this.createLayers(map);





        //player 
        this.player = this.createPlayer();
        this.player.setBounceY(0.2);


        //scale
        this.player.setScale(1.5);

        //create animation 
        this.createAnimations();

        //play animation
        this.player.play("idle");



        //set collision 
        this.physics.add.collider(this.player, layers.platforms2);
        this.physics.add.collider(this.player, layers.platforms);

        this.physics.world.createDebugGraphic();

        //keyboard input 
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        //keybaord input 
        this.handleInput();
    }

    createMap() {
        const map = this.make.tilemap({ key: "testMap" });
        map.addTilesetImage("ForestTiles", "tiles-1");
        return map;
    }

    createLayers(map) {

        const tileset = map.getTileset('ForestTiles');
        const tree = map.createLayer('Tree', tileset);
        const platforms = map.createLayer('Platforms', tileset);
        const platforms2 = map.createLayer('Platforms2', tileset);
        const environment = map.createLayer('Environment', tileset);

        platforms.setCollisionByExclusion(-1, true);
        platforms2.setCollisionByExclusion(-1, true);

        return { tree, platforms, platforms2, environment };
    }

    createPlayer() {
        const player = this.physics.add.sprite(50, 480, "avatar-idle");
        player.body.setGravityY(500);
        //player.setCollideWorldBounds(true);
        return player;
    }

    createAnimations() {
        let idleAnimationConfig = {
            key: "idle",
            frames: this.anims.generateFrameNumbers("avatar-idle", {
                start: 0,
                end: 9
            }),
            frameRate: 15,
            repeat: -1
        }
        this.anims.create(idleAnimationConfig);


        let runAnimationConfig = {
            key: "run",
            frames: this.anims.generateFrameNumbers("avatar-run", {
                start: 0,
                end: 9
            }),
            frameRate: 15,
            repeat: -1
        }
        this.anims.create(runAnimationConfig);
    }

    handleInput() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-190);
            this.player.flipX = true;

        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(190);
            this.player.flipX = false;
        }
        else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-430);
        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(100);
        }
        else {
            this.player.setVelocityY(0);
        }

        if (this.player.body.velocity.x !== 0) {

            this.player.play("run", true);
        }
        // Otherwise it's not moving
        else {
            this.player.play("idle", true);
        }
    }
}