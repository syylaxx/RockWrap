import { Block, Container, Dimension, Vector3 } from "@minecraft/server";

class BlockManager {
    public readonly location: Vector3;
    public readonly block: Block;
    public readonly dimension: Dimension;

    public constructor(block: Block) {
        this.block = block;

        const { x, y ,z } = block.location;

        if (!this.block.dimension.getBlock(this.block.location))
            throw new Error(`Block ${x} ${y} ${z} could not be found!`);

        
        this.dimension = this.block.dimension;
        this.location = this.block.location;
    };

    public get container(): Container {
        return this.block.getComponent("inventory").container;
    };

    /**
     * Destroy the block using the setblock command.
     */

    public destroy(): void {
        const { x, y ,z } = this.location;

        this.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air destroy`);
    };
};

export { BlockManager };