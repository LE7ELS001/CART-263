
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
}


window.PlayerAnimation = PlayerAnimation;