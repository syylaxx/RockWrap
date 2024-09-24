import { EntityManager } from "../../../Managers/EntityManager";
import { PlayerManager } from "../../../Managers/PlayerManager";
import { BeforeEventArgs } from "./BeforeEventArgs";

interface InteractedWithEntityArgs extends BeforeEventArgs {
    readonly entity: EntityManager, 
    readonly player: PlayerManager, 
};

export { InteractedWithEntityArgs };