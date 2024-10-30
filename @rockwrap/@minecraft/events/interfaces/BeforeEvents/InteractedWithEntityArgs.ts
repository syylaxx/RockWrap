import { EntityManager } from "../../../managers/EntityManager";
import { PlayerManager } from "../../../managers/PlayerManager";
import { BeforeEventArgs } from "./BeforeEventArgs";

interface InteractedWithEntityArgs extends BeforeEventArgs {
    /**
     * Entity, that was interacted.
     */
    readonly entity: EntityManager,
    
    /**
     * Player, who interacted with entity.
     */
    readonly player: PlayerManager, 
};

export { InteractedWithEntityArgs };