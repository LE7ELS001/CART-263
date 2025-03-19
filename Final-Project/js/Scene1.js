class Scene1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'scene1'
        });
    }

    create() {

        //creat background
        this.background = this.add.image(0, 0, "forest-bg")
            .setOrigin(0, 0)
            .setDepth(-1)
            .setScrollFactor(0); // fix the background



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

        //create Boards
        const enemies = this.createEnemies(layers.enemySpawns, layers.platformCollider);




        //set player collider
        player.addCollider(layers.platformCollider, (player, platorm) => {
        });


        // set enemy collider
        enemies.getChildren().forEach(enemy => {
            player.addCollider(enemy, (player, enemy) => {

            })
            enemy.addCollider(layers.platformCollider, (enemy, platform) => {

            })


        })







        //debug
        this.physics.world.createDebugGraphic();


        //camera 
        this.setupFollowupCameraOn(player);



        // this.input.on('pointerup', pointer => this.finishDrawing(pointer, layers.platforms), this)


    }





    // finishDrawing(pointer, layer) {
    //     this.line.x2 = pointer.worldX;
    //     this.line.y2 = pointer.worldY;
    //     this.graphics.clear();
    //     this.graphics.strokeLineShape(this.line);

    //     this.tileHits = layer.getTilesWithinShape(this.line);
    //     if (this.tileHits.length > 0) {
    //         this.tileHits.forEach(tile => {
    //             if (tile.index !== -1) {
    //                 tile.setCollision(true);
    //             }
    //         })
    //     }

    //     this.drawDebug(layer);
    //     this.drawLineOrNo = false;


    // }



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
        const enemySpawns = map.getObjectLayer('Enemy_spawns')

        platformCollider.setCollisionByExclusion(-1, true);


        return { tree, platforms, platforms2, environment, platformCollider, playerZones, enemySpawns };
    }

    createPlayer(start) {

        const player = new Player(this, start.x, start.y);

        return player;
    }

    createEnemies(enemiesSpawnPoint, platformColliders) {
        const enemies = new Enemies();
        const enemyTypes = getEnemyTypes();
        enemiesSpawnPoint.objects.forEach(spawnPoint => {
            const enemy = new enemyTypes[spawnPoint.type](this, spawnPoint.x, spawnPoint.y);
            enemy.setPlatformColliders(platformColliders);
            enemies.add(enemy);
        });
        return enemies;
    }

    setupFollowupCameraOn(player) {
        const gameConfig = this.registry.get("gameConfig");
        const { height, width, mapOffset, ZoomFactor } = gameConfig;
        this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
        this.cameras.main.setBounds(0, 0, width + mapOffset, height + 50).setZoom(ZoomFactor);
        console.log(mapOffset);
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


