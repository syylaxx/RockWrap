import { PlayerManager } from "../../../Managers/PlayerManager";
import { BeforeEventArgs } from "./BeforeEventArgs";

interface MessageSentArgs extends BeforeEventArgs {
    /**
     * Message, that was sent.
     */
    readonly message: string, 

    /**
     * Sender of a message.
     */
    readonly player: PlayerManager, 
};

export { MessageSentArgs };