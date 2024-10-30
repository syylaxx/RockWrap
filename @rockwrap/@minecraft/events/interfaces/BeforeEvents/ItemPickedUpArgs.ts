import { ItemStackManager } from "../../../managers/ItemStackManager";
import { PlayerManager } from "../../../managers/PlayerManager";
import { BeforeEventArgs } from "./BeforeEventArgs";

interface ItemPickedUpArgs extends BeforeEventArgs {
    /**
     * Item, that was picked up.
     */
    readonly itemStack: ItemStackManager,
    
    /**
     * Player, that picked up the item.
     */
    readonly player: PlayerManager, 
};

export { ItemPickedUpArgs };