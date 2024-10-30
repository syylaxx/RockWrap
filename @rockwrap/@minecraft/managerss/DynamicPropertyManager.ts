import { Vector3, world } from "@minecraft/server";
import { DynamicPropertyValue } from "./types/DynamicPropertyValue";

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
    private readonly identifier: string;

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
    public get(replaceValue: any = undefined): DynamicPropertyValue {
        if (!world.getDynamicProperty(this.identifier))
            world.setDynamicProperty(this.identifier, replaceValue);
        
        return world.getDynamicProperty(this.identifier);
    };

    /**
     * Sets a value for this identifier.
     * @param value New value of identifier.
     */
    public set(value: DynamicPropertyValue = undefined): void {
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