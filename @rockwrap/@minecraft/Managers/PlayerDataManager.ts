import { Vector3 } from "@minecraft/server";

import { DynamicPropertyManager } from "./DynamicPropertyManager";

class PlayerDataManager {
    public readonly identifier: string;

    public constructor(name: string) {
        const
            identifier = new DynamicPropertyManager(name).get() as string;

        if (!identifier)
            throw Error(`Player '${name}' was not registered.`);

        this.identifier = identifier;
    }

    public getData(identifier: string, replaceValue: string | number | boolean | Vector3 = undefined): string | number | boolean | Vector3 {
        return new DynamicPropertyManager(this.identifier + ":" + identifier).get(replaceValue as any);
    };

    public setData(identifier: string, value: string | number | boolean | Vector3): void {
        new DynamicPropertyManager(this.identifier + ":" + identifier).set(value);
    };
};

export { PlayerDataManager };