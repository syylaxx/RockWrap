import { Block, Container, Dimension, Vector3 } from "@minecraft/server";

class BlockManager {
    public readonly location: Vector3;
    public readonly instance: Block;
    public readonly dimension: Dimension;

    public constructor(block: Block) {
        this.instance = block;

        const { x, y ,z } = block.location;

        if (!this.instance.dimension.getBlock(this.instance.location))
            throw new Error(`Block ${x} ${y} ${z} could not be found!`);

        
        this.dimension = this.instance.dimension;
        this.location = this.instance.location;
    };

    public get container(): Container {
        return this.instance.getComponent("inventory").container;
    };

    /**
     * Destroy the instance using the setblock command.
     */

    public destroy(): void {
        const { x, y ,z } = this.location;

        this.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air destroy`);
    };
};

export { BlockManager };