
class ProjectilesPool extends Phaser.Physics.Arcade.Group {
    constructor(scene, key = 'playerProjectile') {
        super(scene.physics.world, scene);


        this.key = key;
        let projcetileClass;

        switch (key) {
            case 'playerProjectile':
                projcetileClass = Player_projectile;
                break;
        }

        this.createMultiple({
            frameQuantity: 5,
            active: false,
            visible: false,
            key: this.key,
            classType: projcetileClass
        });

        this.timeFromLastShoot = null;
    }


    fireProjectile(initiator) {
        const projectile = this.getFirstDead(false);

        const center = initiator.getCenter();
        let centerX;
        let centerY = center.y + 30;

        if (!projectile) {
            return;
        }

        if (this.timeFromLastShoot &&
            this.timeFromLastShoot + projectile.coolDown > getTimeStamp()
        ) {
            return;
        }

        if (initiator.lastDirection === Phaser.Physics.Arcade.FACING_RIGHT) {
            projectile.speed = Math.abs(projectile.speed);
            projectile.setFlipX(false);
            centerX = center.x + 15;
        }
        else {
            projectile.speed = -Math.abs(projectile.speed);
            projectile.setFlipX(true);
            centerX = center.x - 15;

        }

        // projectile.fire(initiator.x, initiator.y);
        projectile.fire(centerX, centerY);
        this.timeFromLastShoot = getTimeStamp();

    }




}

window.ProjectilesPool = ProjectilesPool;

