import { Vector3, world } from "@minecraft/server"

export class DynamicPropertyManager {
    private identifier: string

    public constructor(identifier: string) {
        this.identifier = identifier
    }

    public get(replaceValue?: string): string | number | boolean | Vector3 | undefined {
        if (!world.getDynamicProperty(this.identifier))
            world.setDynamicProperty(this.identifier, replaceValue)

        return world.getDynamicProperty(this.identifier)
    }

    public set(value: string | number | boolean | Vector3 = undefined): void {
        world.setDynamicProperty(this.identifier, value)
    }

    public reset(): void {
        world.setDynamicProperty(this.identifier, undefined)
    }

    public add(value: string | number): void {
        const
            dynamicProperty = world.getDynamicProperty(this.identifier) as string

        world.setDynamicProperty(this.identifier, value += dynamicProperty)
    }
}