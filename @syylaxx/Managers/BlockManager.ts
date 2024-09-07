import { Block, Dimension } from "@minecraft/server"

export class BlockManager {
    private block: Block
    private dimension: Dimension

    constructor(block: Block) {
        this.block = block
        this.dimension = this.block.dimension

        const
            { x, y , z } = block.location

        if (!this.block.dimension.getBlock(this.block.location))
            throw new Error(`Block ${x} ${y} ${z} could not be found!`)
    }
}