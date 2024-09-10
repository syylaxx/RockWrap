import { Vector3 } from "@minecraft/server"

import { DynamicPropertyManager } from "./DynamicPropertyManager"

export class PlayerDataManager {
    private name: string

    public readonly identifier: string

    public constructor(name: string) {
        this.name = name

        const
            identifier = new DynamicPropertyManager(name).get() as string

        if (!identifier)
            throw Error(`Player '${name}' was not registered.`)

        this.identifier = identifier
    }

    public getData(identifier: string, replaceValue: string | number | boolean | Vector3 = undefined): string | number | boolean | Vector3 {
        return new DynamicPropertyManager(this.identifier + ":" + identifier).get(replaceValue as any)
    }

    public setData(identifier: string, value: string | number | boolean | Vector3): void {
        new DynamicPropertyManager(this.identifier + ":" + identifier).set(value)
    }
}