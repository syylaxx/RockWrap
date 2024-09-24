import { BlockVolume, Vector3 } from "@minecraft/server";

/**
 * Special class to work with block volumes.
 */
class BlockVolumeManager {
    private blockVolume: BlockVolume;

    /**
     * Declare a BlockVolume for our manager.
     * @param volume 
     */
    public constructor(volume: BlockVolume) {
        this.blockVolume = volume;
    };

    /**
     * Checks if location is in range of BlockVolume from constructor.
     * @param location Location to check.
     * @returns Returns a boolean whenever vector is inside a BlockVolume. Does not require privileges, like the default method.
     */
    public isInRange({ x, y, z }: Vector3): boolean {
        const { from, to } = this.blockVolume;

        return (
            x >= Math.min(from.x, to.x) &&
            x <= Math.max(from.x, to.x) &&
            y >= Math.min(from.y, to.y) &&
            y <= Math.max(from.y, to.y) &&
            z >= Math.min(from.z, to.z) &&
            z <= Math.max(from.z, to.z)
        );
    };
};

export { BlockVolumeManager };