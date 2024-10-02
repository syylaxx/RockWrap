import { Block, BlockPermutation, Container, Dimension, Vector3 } from "@minecraft/server";

class BlockManager {
    /**
     * Location of a block.
     * @readonly
     */
    public readonly location: Vector3;

    /**
     * Default instance of a block.
     * @readonly
     */
    public readonly instance: Block;

    /**
     * Dimension of a block.
     * @readonly
     */
    public readonly dimension: Dimension;

    /**
     * ID of a block.
     * @readonly
     */
    public readonly typeId: string;

    /**
     * Constructor of a custom block class.
     * @param block Default block (instance of a class `Block`).
     */
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

    /**
     * Gets the container from block.
     */
    public get container(): Container {
        return this.instance.getComponent("inventory")?.container;
    };

    /**
     * Gets the permutation from block.
     */
    public get permutation(): BlockPermutation {
        return this.instance.permutation;
    };

    /**
     * Destroy the instance using the `setblock` command.
     */
    public destroy(): void {
        const { x, y ,z } = this.location;

        this.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air destroy`);
    };
};

export { BlockManager };