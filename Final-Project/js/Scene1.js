class Scene1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'scene1'
        });
    }

    create() {


        //create map
        const map = this.createMap();

        //create layers
        const layers = this.createLayers(map);


        // create player 
        const player = this.createPlayer();


        //set collider
        player.addCollider(layers.platformCollider, (player, platorm) => {
            //console.log("hit the platformCollider");
        });

        //debug
        this.physics.world.createDebugGraphic();

        //camera 
        this.setupFollowupCameraOn(player);



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

    setupFollowupCameraOn(player) {
        const gameConfig = this.registry.get("gameConfig");
        const { height, width, mapOffset, ZoomFactor } = gameConfig;
        this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
        this.cameras.main.setBounds(0, 0, width + mapOffset, height + 200).setZoom(ZoomFactor);
        this.cameras.main.startFollow(player);
    }


}