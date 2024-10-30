import { BlockManager } from "../../../managers/BlockManager";
import { PlayerManager } from "../../../managers/PlayerManager";
import { BeforeEventArgs } from "./BeforeEventArgs";

interface BlockPlacedArgs extends BeforeEventArgs {
    /**
     * Block, that was placed.
     */
    readonly block: BlockManager,
    
    /**
     * Player, that tried to place this block.
     */
    readonly player: PlayerManager, 
};

export { BlockPlacedArgs };