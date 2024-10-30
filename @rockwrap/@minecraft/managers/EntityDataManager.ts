import { Entity, world } from "@minecraft/server";
import { DynamicPropertyManager } from "./DynamicPropertyManager";
import type { DynamicPropertyValue } from "./types/DynamicPropertyValue";

class EntityDataManager {
    private readonly identifier: string;

    /**
     * Creates a instance of class to manage entity's properties.
     * @param identifier Identifier of an entity. (`import("@minecraft/server").Entity.id`)
     */
    public constructor(identifier: string) {
        const entity: Entity | undefined = world.getEntity(identifier)

        if (!entity)
            throw Error(`Entity is not loaded.`);

        this.identifier = identifier;
    }

    /**
     * Gets an data for selected identifier, which is assigned to this entity.
     * @param identifier Identifier, that will be the source.
     * @param replaceValue Default value for search.
     * @returns Value or the default one from this identifier. 
     */
    public getData(identifier: string, replaceValue: DynamicPropertyValue = undefined): DynamicPropertyValue {
        return new DynamicPropertyManager(this.identifier + ":" + identifier).get(replaceValue as any);
    };

    /**
     * Sets a data for selected identifier, which is assigned to this entity.
     * @param identifier Identifier, that will save value.
     * @param value Value of an identifier.
     */
    public setData(identifier: string, value: DynamicPropertyValue): void {
        new DynamicPropertyManager(this.identifier + ":" + identifier).set(value);
    };
};

export { EntityDataManager };