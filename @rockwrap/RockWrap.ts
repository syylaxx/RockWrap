import { rockWrapConfiguration } from "./@config/RockWrapConfig"
import { registerPlayers } from "./@minecraft/tasks/sync/PlayerRegister"

export class RockWrap {
    public static readonly config = rockWrapConfiguration

    private constructor() {}

    /**
     * This method is needed for some features, we recommend to execute it!
     */

    public static startUp(): void {
        registerPlayers()
    }
}