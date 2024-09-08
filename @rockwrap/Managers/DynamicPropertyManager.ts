import { Vector3, world } from "@minecraft/server"

export class DynamicPropertyManager {
    private identifier: string

    constructor(identifier: string) {
        this.identifier = identifier
    }

    get(replaceValue?: string) {
        if (!world.getDynamicProperty(this.identifier))
            world.setDynamicProperty(this.identifier, replaceValue)

        return world.getDynamicProperty(this.identifier)
    }

    set(value: string | number | boolean | Vector3) {
        if (value === null)
            world.setDynamicProperty(this.identifier, undefined)

        world.setDynamicProperty(this.identifier, value)
    }

    reset() {
        world.setDynamicProperty(this.identifier, undefined)
    }

    add(value: string | number) {
        const
            dynamicProperty = world.getDynamicProperty(this.identifier) as string

        world.setDynamicProperty(this.identifier, value += dynamicProperty)
    }
}