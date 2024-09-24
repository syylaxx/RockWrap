import { PlayerManager } from "../../../Managers/PlayerManager";
import { BeforeEventArgs } from "./BeforeEventArgs";

interface MessageSentArgs extends BeforeEventArgs {
    readonly message: string, 
    readonly player: PlayerManager, 
};

export { MessageSentArgs };