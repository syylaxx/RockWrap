import { BlockManager } from "../../../Managers/BlockManager";
import { PlayerManager } from "../../../Managers/PlayerManager";
import { BeforeEventArgs } from "./BeforeEventArgs";

interface InteractedWithBlockArgs extends BeforeEventArgs {
    readonly block: BlockManager, 
    readonly player: PlayerManager,
};

export { InteractedWithBlockArgs };