import { ItemStackManager } from "../../../Managers/ItemStackManager";
import { PlayerManager } from "../../../Managers/PlayerManager";
import { BeforeEventArgs } from "./BeforeEventArgs";

interface ItemUsedArgs extends BeforeEventArgs {
    /**
     * Item, which was used.
     */
    readonly itemStack: ItemStackManager, 

    /**
     * Player, who used this item.
     */
    readonly player: PlayerManager, 
};

export { ItemUsedArgs };