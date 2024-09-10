import { ItemStack } from "@minecraft/server";

class ItemStackManager {
    public readonly instance: ItemStack;
    public readonly maxDurability: number = undefined;

    public durability: number = undefined;

    public constructor(itemStack: ItemStack) {
        if (!(itemStack instanceof ItemStack))
            throw new Error(`ItemStack was not defined correctly!`);

        this.instance = itemStack;

        const durabilityComponent = itemStack.getComponent("durability");

        if (!durabilityComponent) return;

        this.durability = durabilityComponent.maxDurability - durabilityComponent.damage;
        this.maxDurability = durabilityComponent.maxDurability;
    };

    public setDurability(newDurability: number): void {
        if (newDurability > this.maxDurability || newDurability < 0)
            throw new Error("Durability must be within valid bounds.");

        const durabilityComponent = this.instance.getComponent("durability");

        if (!durabilityComponent) return;

        this.durability = newDurability;

        durabilityComponent.damage = this.maxDurability - newDurability;
    };
};

export { ItemStackManager };
