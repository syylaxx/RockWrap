import { BlockManager } from "../../../managers/BlockManager";
import { PlayerManager } from "../../../managers/PlayerManager";
import { BeforeEventArgs } from "./BeforeEventArgs";

interface InteractedWithBlockArgs extends BeforeEventArgs {
    /**
     * Block, that was interacted.
     */
    readonly block: BlockManager, 
    
    /**
     * Player, who interacted with this block.
     */
    readonly player: PlayerManager,
};

export { InteractedWithBlockArgs };