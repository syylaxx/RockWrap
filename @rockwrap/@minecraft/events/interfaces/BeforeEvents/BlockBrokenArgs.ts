import { BlockManager } from "../../../Managers/BlockManager";
import { ItemStackManager } from "../../../Managers/ItemStackManager";
import { PlayerManager } from "../../../Managers/PlayerManager";
import { BeforeEventArgs } from "./BeforeEventArgs";

interface BlockBrokenArgs extends BeforeEventArgs {
    readonly block: BlockManager, 
    readonly itemStack: ItemStackManager, 
    readonly player: PlayerManager, 
};

export { BlockBrokenArgs };