import { ItemStackManager } from "../../../Managers/ItemStackManager";
import { PlayerManager } from "../../../Managers/PlayerManager";
import { BeforeEventArgs } from "./BeforeEventArgs";

interface ItemPickedUpArgs extends BeforeEventArgs {
    readonly itemStack: ItemStackManager, 
    readonly player: PlayerManager, 
};

export { ItemPickedUpArgs };