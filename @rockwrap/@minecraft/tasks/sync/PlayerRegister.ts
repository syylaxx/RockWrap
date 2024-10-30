import { AfterEvents } from "../../events/AfterEvents";
import { DynamicPropertyManager } from "../../managers/DynamicPropertyManager";

/**
 * Registers player's database for `@rockwrap` modules.
 */
const registerPlayers = (): void => {
    AfterEvents.PlayerSpawned(({ player, playerJoined }) => {
        if (!playerJoined) return;
    
        new DynamicPropertyManager(player.name).get(player.identifier);
        new DynamicPropertyManager(player.identifier).get(player.name);
    });
};

export { registerPlayers };