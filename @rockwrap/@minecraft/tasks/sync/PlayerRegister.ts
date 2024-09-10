import { AfterEvents } from "../../Events/AfterEvents"
import { DynamicPropertyManager } from "../../Managers/DynamicPropertyManager"

const registerPlayers = (): void => {
    AfterEvents.PlayerSpawned(({ player, playerJoined }) => {
        if (!playerJoined)
            return
    
        new DynamicPropertyManager(player.name).get(player.identifier)
        new DynamicPropertyManager(player.identifier).get(player.name)
    })
}

export { registerPlayers }