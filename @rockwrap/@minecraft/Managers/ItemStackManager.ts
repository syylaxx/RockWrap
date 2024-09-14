import { ItemStack } from "@minecraft/server";

class ItemStackManager {
    public readonly durability: number;
    public readonly instance: ItemStack;
    public readonly typeId: string;
    public readonly maxDurability: number;
    public readonly amount: number;

    public constructor(itemStack: ItemStack) {
        if (!(itemStack instanceof ItemStack))
            throw new Error(`ItemStack was not defined correctly!`);
        
        this.instance = itemStack;
        this.typeId = itemStack.typeId;
        this.amount = itemStack.amount;

        const durabilityComponent = itemStack.getComponent("durability");

        if (!durabilityComponent?.isValid()) return;

        this.durability = durabilityComponent.maxDurability - durabilityComponent.damage;
        this.maxDurability = durabilityComponent.maxDurability;
    };
};

export { ItemStackManager };