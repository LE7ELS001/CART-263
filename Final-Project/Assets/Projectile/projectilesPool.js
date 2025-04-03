
class ProjectilesPool extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 5,
            active: false,
            visible: false,
            key: 'test-projectile',
            classType: Player_projectile
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
            centerX = center.x + 75;
        }
        else {
            projectile.speed = -Math.abs(projectile.speed);
            projectile.setFlipX(true);
            centerX = center.x - 75;

        }

        // projectile.fire(initiator.x, initiator.y);
        projectile.fire(centerX, centerY);
        this.timeFromLastShoot = getTimeStamp();

    }




}

window.ProjectilesPool = ProjectilesPool;

