import { PlayerManager } from "../../../Managers/PlayerManager";

interface PlayerLeftArgs {
    /**
     * Player, who left the server.
     */
    readonly player: PlayerManager
};

export { PlayerLeftArgs };