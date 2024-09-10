import { AfterEvents } from "../Events/AfterEvents"

import { DynamicPropertyManager } from "../Managers/DynamicPropertyManager"

export function
    registerPlayers() {
        AfterEvents.PlayerSpawned(({ player, playerJoined }) => {
            if (!playerJoined)
                return
        
            new DynamicPropertyManager(player.name).get(player.identifier)
            new DynamicPropertyManager(player.identifier).get(player.name)
        })
    }