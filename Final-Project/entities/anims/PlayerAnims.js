
function PlayerAnimation(anims) {
    anims.create({
        key: "idle",
        frames: anims.generateFrameNumbers("avatar-idle", {
            start: 0,
            end: 9
        }),
        frameRate: 8,
        repeat: -1
    });

    anims.create({
        key: "run",
        frames: anims.generateFrameNumbers("avatar-run", {
            start: 0,
            end: 9
        }),
        frameRate: 15,
        repeat: -1
    });

    anims.create({
        key: "attack1",
        frames: anims.generateFrameNumbers("attack1", { start: 0, end: 3 }),
        frameRate: 12,
        repeat: 0
    });

    anims.create({
        key: "attack2",
        frames: anims.generateFrameNumbers("attack2", { start: 0, end: 5 }),
        frameRate: 12,
        repeat: 0
    });

    anims.create({
        key: "roll",
        frames: anims.generateFrameNumbers("roll", { start: 0, end: 11 }),
        frameRate: 12,
        repeat: 0
    });


    anims.create({
        key: "jump",
        frames: anims.generateFrameNumbers("avatar-jump", {
            start: 0,
            end: 2
        }),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "fall",
        frames: anims.generateFrameNumbers("avatar-fall", {
            start: 0,
            end: 2
        }),
        frameRate: 12,
        repeat: -1,


    });

    anims.create({
        key: "jumpfall",
        frames: anims.generateFrameNumbers("avatar-Jumpfall", {
            start: 0,
            end: 1
        }),
        frameRate: 10,
        repeat: 0,
        //stopOnLastFrame: true

    });

    anims.create({
        key: "wallslide",
        frames: anims.generateFrameNumbers("avatar-wallslide", {
            start: 0,
            end: 2
        }),
        frameRate: 10,
        repeat: -1
    })
}


window.PlayerAnimation = PlayerAnimation;