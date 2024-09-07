import { Block } from "@minecraft/server"

export class BlockManager {
    private block
    private dimension

    constructor(block: Block) {
        this.block = block
        this.dimension = this.block.dimension

        const
            { x, y , z } = block.location

        if (!this.block.dimension.getBlock(this.block.location))
            throw new Error(`Block ${x} ${y} ${z} could not be found!`)
    }

    public destroy() {
        const
            { x, y , z } = block.location

        if (!this.block.dimension.getBlock(this.block.location))
            throw new Error(`Block ${x} ${y} ${z} could not be found!`)

        this.dimension.runCommandAsync(`setblock ${x} ${y} ${z} air destroy`)
    }
}

const
    block = undefined as Block