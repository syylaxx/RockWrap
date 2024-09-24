import { BlockManager } from "../../../Managers/BlockManager";
import { PlayerManager } from "../../../Managers/PlayerManager";
import { BeforeEventArgs } from "./BeforeEventArgs";

interface BlockPlacedArgs extends BeforeEventArgs {
    readonly block: BlockManager, 
    readonly player: PlayerManager, 
};

export { BlockPlacedArgs };