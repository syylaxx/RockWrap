import { ItemDurabilityComponent, ItemEnchantableComponent, ItemStack } from "@minecraft/server";

class ItemStackManager {
    private durabilityComponent: ItemDurabilityComponent;

    /**
     * Default instance of an item.
     */
    public readonly instance: ItemStack;

    /**
     * Max durability of an item.
     */
    public readonly maxDurability: number;

    /**
     * Identifier of an item.
     */
    public readonly typeId: string;

    /**
     * Creates an instance of custom item manager.
     * @param itemStack Default instance of an item.
     * @returns Instance of custom item manager.
     */
    public constructor(itemStack: ItemStack) {
        if (!(itemStack instanceof ItemStack))
            throw new Error(`ItemStack was not defined correctly!`);

        this.instance = itemStack;
        this.typeId = itemStack.typeId;

        if (!itemStack.getComponent("durability")) return;

        this.durabilityComponent = itemStack.getComponent("durability");
        this.maxDurability = itemStack.getComponent("durability").maxDurability;
    };

    /**
     * Component, that allows you to access item's enchantments.
     */
    public get enchantable(): ItemEnchantableComponent {
        return this.instance.getComponent("enchantable");
    };

    /**
     * Get's an item amount.
     */
    public get amount(): number {
        return this.instance.amount;
    };

    /**
     * Sets an item amount.
     */
    public set amount(value: number) {
        this.instance.amount = value;
    };

    /**
     * Gets a display name of an item.
     */
    public get nameTag(): string {
        return this.instance.nameTag;
    };

    /**
     * Sets a display name for item.
     */
    public set nameTag(value: string) {
        this.instance.nameTag = value;
    };

    /**
     * Durability left on a item.
     */
    public get durability(): number {
        const durabilityComponent = this.instance.getComponent("durability");

        return durabilityComponent ? durabilityComponent.maxDurability - durabilityComponent.damage : 0;
    };

    /**
     * Sets a new durability to item.
     */
    public set durability(value: number) {
        if (!this.durabilityComponent) return;

        if (value < 0 || value > this.maxDurability)
            throw new Error("Durability must be within valid bounds.");

        this.durabilityComponent.damage = this.maxDurability - value;
    };
};

export { ItemStackManager };