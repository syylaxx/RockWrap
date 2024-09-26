import { Vector3 } from "@minecraft/server";
import { DynamicPropertyManager } from "./DynamicPropertyManager";
import type { DynamicPropertyValue } from "./types/DynamicPropertyValue";

class PlayerDataManager {
    public readonly identifier: string;

    /**
     * Creates a new instance of player data manager.
     * @param name Name of a player.
     */
    public constructor(name: string) {
        const
            identifier = new DynamicPropertyManager(name).get() as string;

        if (!identifier)
            throw Error(`Player '${name}' was not registered.`);

        this.identifier = identifier;
    };

    /**
     * Gets a selected data.
     * @param identifier Identifier, of key, which will be the source of data.
     * @param replaceValue Default value.
     * @returns Data or default value.
     */
    public getData(identifier: string, replaceValue: DynamicPropertyValue = undefined): DynamicPropertyValue {
        return new DynamicPropertyManager(this.identifier + ":" + identifier).get(replaceValue as any);
    };

    /**
     * Sets a data to selected identifier.
     * @param identifier Identifier, which will be changed.
     * @param value New data.
     */
    public setData(identifier: string, value: string | number | boolean | Vector3): void {
        new DynamicPropertyManager(this.identifier + ":" + identifier).set(value);
    };
};

export { PlayerDataManager };