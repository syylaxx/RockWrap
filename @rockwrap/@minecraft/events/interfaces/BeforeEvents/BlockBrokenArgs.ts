import { BlockManager } from "../../../managers/BlockManager";
import { ItemStackManager } from "../../../managers/ItemStackManager";
import { PlayerManager } from "../../../managers/PlayerManager";
import { BeforeEventArgs } from "./BeforeEventArgs";

interface BlockBrokenArgs extends BeforeEventArgs {
    /**
     * Block that was broken.
     */
    readonly block: BlockManager, 

    /**
     * Item, which was used to break a block.
     */
    readonly itemStack: ItemStackManager, 

    /**
     * Player, which mined out this block.
     */
    readonly player: PlayerManager, 
};

export { BlockBrokenArgs };