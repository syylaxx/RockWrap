import { Vector3, world } from "@minecraft/server";

type DynamicPropertyValue = string | number | boolean | Vector3 | undefined;

const isADynamicPropertyValue = (value: any): boolean => {
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

    /**
     * Creates a class for managing this identifier.
     * @param identifier Name of an identifier.
     */
    public constructor(identifier: string) {
        this.identifier = identifier;
    };

    /**
     * Gets an value of this identifier.
     * @param replaceValue Default value of this property.
     * @returns Value of this identifier.
     */
    public get(replaceValue: any = undefined): any {
        if (!isADynamicPropertyValue(replaceValue))
            replaceValue = JSON.stringify(replaceValue);

        if (!world.getDynamicProperty(this.identifier))
            world.setDynamicProperty(this.identifier, replaceValue);

        let dynamicProperty = world.getDynamicProperty(this.identifier) as string;

        //console.warn(dynamicProperty)

        if (!isADynamicPropertyValue && JSON.parse(dynamicProperty))
            dynamicProperty = JSON.parse(dynamicProperty);

        return dynamicProperty;
    };

    /**
     * Sets a value for this identifier.
     * @param value New value of identifier.
     */
    public set(value: any = undefined): void {
        if (JSON.parse(value))
            value = JSON.parse(value);

        world.setDynamicProperty(this.identifier, value);
    };

    /**
     * Resets an value for this identifier.
     */
    public reset(): void {
        world.setDynamicProperty(this.identifier, undefined);
    };

    /**
     * Adds up a number or string to this identifier.
     * @param value Number or string to add up.
     */
    public add(value: string | number): void {
        const dynamicProperty = world.getDynamicProperty(this.identifier) as string;

        world.setDynamicProperty(this.identifier, value += dynamicProperty);
    };
};

export { DynamicPropertyManager };