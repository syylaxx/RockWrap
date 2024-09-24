import { ItemStackManager } from "../../../Managers/ItemStackManager";
import { PlayerManager } from "../../../Managers/PlayerManager";
import { BeforeEventArgs } from "./BeforeEventArgs";

interface ItemUsedArgs extends BeforeEventArgs {
    readonly itemStack: ItemStackManager, 
    readonly player: PlayerManager, 
};

export { ItemUsedArgs };