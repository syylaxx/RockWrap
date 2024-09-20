import { ItemDurabilityComponent, ItemEnchantableComponent, ItemStack } from "@minecraft/server";

class ItemStackManager {
    private durabilityComponent: ItemDurabilityComponent;

    public readonly instance: ItemStack;
    public readonly maxDurability: number;
    public readonly typeId: string;

    public constructor(itemStack: ItemStack) {
        if (!(itemStack instanceof ItemStack))
            throw new Error(`ItemStack was not defined correctly!`);

        this.instance = itemStack;
        this.typeId = itemStack.typeId;

        if (!itemStack.getComponent("durability")) return;

        this.durabilityComponent = itemStack.getComponent("durability");
        this.maxDurability = itemStack.getComponent("durability").maxDurability;
    };

    public get enchantable(): ItemEnchantableComponent {
        return this.instance.getComponent("enchantable");
    };

    public get amount(): number {
        return this.instance.amount;
    };

    public set amount(value: number) {
        this.instance.amount = value;
    };

    public get nameTag(): string {
        return this.instance.nameTag;
    };

    public set nameTag(value: string) {
        this.instance.nameTag = value;
    };

    public get durability(): number {
        const durabilityComponent = this.instance.getComponent("durability");

        return durabilityComponent ? durabilityComponent.maxDurability - durabilityComponent.damage : 0;
    };

    public set durability(value: number) {
        if (!this.durabilityComponent) return;

        if (value < 0 || value > this.maxDurability)
            throw new Error("Durability must be within valid bounds.");

        this.durabilityComponent.damage = this.maxDurability - value;
    };
};

export { ItemStackManager };