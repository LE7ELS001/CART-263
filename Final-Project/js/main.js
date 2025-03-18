"use strict"

const MAP_WIDTH = 1920;
// const WIDTH = document.body.offsetWidth;
const WIDTH = 800;
const HEIGHT = 600;

let config = {
    type: Phaser.AUTO,
    mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
    ZoomFactor: 1.5,
    width: 800,
    height: HEIGHT,
    parent: 'game-container',
    physics: {
        debug: true,
        default: 'arcade',
    },





    scene: [Boot, Scene1]
}

let game = new Phaser.Game(config);
game.registry.set("gameConfig", {
    mapOffset: config.mapOffset,
    width: config.width,
    height: config.height,
    ZoomFactor: config.ZoomFactor
});

