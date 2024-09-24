import { Vector3, world } from "@minecraft/server";

type DynamicPropertyValue = string | number | boolean | Vector3 | undefined;

const isADynamicPropertyValue = (value: any) => {
    return (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        typeof value === "undefined" ||
        value && typeof value.x === "number" && typeof value.y === "number" && typeof value.z === "number"
    );
};

class DynamicPropertyManager {
    private identifier: string;

    public constructor(identifier: string) {
        this.identifier = identifier;
    };

    public get(replaceValue: any = undefined): any {
        if (!isADynamicPropertyValue(replaceValue))
            replaceValue = JSON.stringify(replaceValue);

        if (!world.getDynamicProperty(this.identifier))
            world.setDynamicProperty(this.identifier, replaceValue);

        let dynamicProperty = world.getDynamicProperty(this.identifier) as string;

        console.warn(dynamicProperty)

        if (!isADynamicPropertyValue && JSON.parse(dynamicProperty))
            dynamicProperty = JSON.parse(dynamicProperty);

        return dynamicProperty;
    };

    public set(value: any = undefined): void {
        if (JSON.parse(value))
            value = JSON.parse(value);

        world.setDynamicProperty(this.identifier, value);
    };

    public reset(): void {
        world.setDynamicProperty(this.identifier, undefined);
    };

    public add(value: string | number): void {
        const dynamicProperty = world.getDynamicProperty(this.identifier) as string;

        world.setDynamicProperty(this.identifier, value += dynamicProperty);
    };
};

export { DynamicPropertyManager };