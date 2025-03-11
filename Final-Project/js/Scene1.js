class Scene1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'scene1'
        });
    }

    create() {

        //this.physics.world.gravity.y = 400;
        //create player animation
        const map = this.createMap();

        //test floor
        const layers = this.createLayers(map);


        //player 
        const player = this.createPlayer();



        //play animation
        //player.play("idle");



        //set collision 
        this.physics.add.collider(player, layers.platformCollider);


        this.physics.world.createDebugGraphic();

        //create keyboard input 
        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update() {

    }

    createMap() {
        const map = this.make.tilemap({ key: "testMap" });
        map.addTilesetImage("ForestTiles", "tiles-1");
        return map;
    }

    createLayers(map) {

        const tileset = map.getTileset('ForestTiles');
        const platformCollider = map.createLayer('Platform_collider', tileset);
        const tree = map.createLayer('Tree', tileset);
        const platforms = map.createLayer('Platforms', tileset);
        const platforms2 = map.createLayer('Platforms2', tileset);
        const environment = map.createLayer('Environment', tileset);

        platformCollider.setCollisionByExclusion(-1, true);


        return { tree, platforms, platforms2, environment, platformCollider };
    }

    createPlayer() {

        const player = new Player(this, 100, 480);

        return player;
    }




}