import { rockWrapConfiguration } from "./@config/RockWrapConfig";
import { registerPlayers } from "./@minecraft/tasks/sync/PlayerRegister";

class RockWrap {
    /**
     * Config of RockWrap wrapper.
     * @readonly This property is in read-only mode. You can change values in config in `@rockwrap/@config/RockWrapConfig.ts`.
     */
    public static readonly config = rockWrapConfiguration;

    private constructor() {};

    /**
     * This method is needed for some features, we recommend to execute it!
     */
    public static startup(): void {
        registerPlayers();
    };
};

export { RockWrap };