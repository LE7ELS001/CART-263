const CollisionMixin = {
    addCollider(otherGameObject, callback) {
        this.scene.physics.add.collider(this, otherGameObject, callback, null, this);
    }
};

window.CollisionMixin = CollisionMixin;