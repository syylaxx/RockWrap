import { Vector3, world } from "@minecraft/server";

import { DynamicPropertyManager } from "./DynamicPropertyManager";

class EntityDataManager {
    private identifier: string;

    public constructor(identifier: string) {
        const entity = world.getEntity(identifier)

        if (!entity)
            throw Error(`Entity is not loaded.`);

        this.identifier = identifier;
    }

    public getData(identifier: string, replaceValue: string | number | boolean | Vector3 = undefined): string | number | boolean | Vector3 {
        return new DynamicPropertyManager(this.identifier + ":" + identifier).get(replaceValue as any);
    };

    public setData(identifier: string, value: string | number | boolean | Vector3): void {
        new DynamicPropertyManager(this.identifier + ":" + identifier).set(value);
    };
};

export { EntityDataManager };