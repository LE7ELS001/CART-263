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

        //get playerZones
        const playerZones = this.getPlayerZones(layers.playerZones);

        // create player 
        const player = this.createPlayer(playerZones.start);

        // create an end zone 
        this.createEndOfLevel(playerZones.end, player);

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
        const playerZones = map.getObjectLayer('Player_zones');

        platformCollider.setCollisionByExclusion(-1, true);


        return { tree, platforms, platforms2, environment, platformCollider, playerZones };
    }

    createPlayer(start) {

        const player = new Player(this, start.x, start.y);

        return player;
    }

    setupFollowupCameraOn(player) {
        const gameConfig = this.registry.get("gameConfig");
        const { height, width, mapOffset, ZoomFactor } = gameConfig;
        this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
        this.cameras.main.setBounds(0, 0, width + mapOffset, height + 200).setZoom(ZoomFactor);
        this.cameras.main.startFollow(player);
    }

    getPlayerZones(playerZonesLayer) {
        const playerZones = playerZonesLayer.objects;
        return {
            start: playerZones.find(zone => zone.name === "Spawn_point"),
            end: playerZones.find(zone => zone.name === "End_point")
        }
    }

    createEndOfLevel(end, player) {
        const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end').setAlpha(0).setSize(5, 300).setOrigin(0.5, 1);

        const eolOverlap = this.physics.add.overlap(player, endOfLevel, () => {
            eolOverlap.active = false;
            console.log('you touch the end zone')
        })
    }


}