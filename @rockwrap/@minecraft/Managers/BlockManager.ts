import { Block, Container, Dimension, Vector3 } from "@minecraft/server";

class BlockManager {
    public readonly location: Vector3;
    public readonly instance: Block;
    public readonly dimension: Dimension;
    public readonly typeId: string;

    public constructor(block: Block) {
        const { x, y ,z } = block.location;

        if (!(block instanceof Block))
            throw new Error(`Block was not defined correctly!`);

        if (!block.dimension.getBlock(block.location))
            throw new Error(`Block ${x} ${y} ${z} could not be found!`);

        this.instance = block;
        this.dimension = block.dimension;
        this.location = block.location;
        this.typeId = block.typeId;
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