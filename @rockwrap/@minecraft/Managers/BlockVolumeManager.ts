import { BlockVolume, Vector3 } from "@minecraft/server";

class BlockVolumeManager {
    private blockVolume: BlockVolume;

    public constructor(volume: BlockVolume) {
        this.blockVolume = volume;
    };

    public isInRange(location: Vector3): boolean {
        const { from, to } = this.blockVolume;

        return (
            location.x >= Math.min(from.x, to.x) &&
            location.x <= Math.max(from.x, to.x) &&
            location.y >= Math.min(from.y, to.y) &&
            location.y <= Math.max(from.y, to.y) &&
            location.z >= Math.min(from.z, to.z) &&
            location.z <= Math.max(from.z, to.z)
        );
    };
};

export { BlockVolumeManager };