import { AfterEvents } from "../Events/AfterEvents"

import { DynamicPropertyManager } from "../Managers/DynamicPropertyManager"

export function
    playerRegister() {
        AfterEvents.PlayerSpawned(({ player, playerJoined }) => {
            if (!playerJoined)
                return
        
            new DynamicPropertyManager(player.name).get(player.identifier)
            new DynamicPropertyManager(player.identifier).get(player.name)
        })
    }