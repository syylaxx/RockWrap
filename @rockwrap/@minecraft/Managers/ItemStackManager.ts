import { Enchantment, ItemDurabilityComponent, ItemEnchantableComponent, ItemStack } from "@minecraft/server";

interface IItemStackObject {
    typeId: string,
    nameTag: string,
    amount: number,
    lore: string[],
    enchantments: Enchantment[],
    damage: number
};

class ItemStackManager extends ItemStack{
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
     * Creates an instance of custom item manager.
     * @param itemStack Default instance of an item.
     * @returns Instance of custom item manager.
     */
    public constructor(itemStack: ItemStack) {
        super(itemStack.typeId, itemStack.amount);

        if (!(itemStack instanceof ItemStack))
            throw new Error(`ItemStack was not defined correctly!`);

        this.instance = itemStack;

        this.durabilityComponent = itemStack.getComponent("durability") as ItemDurabilityComponent;
        this.maxDurability = this.durabilityComponent ? this.durabilityComponent.maxDurability : 0;
    };

    /**
     * Component, that allows you to access item's enchantments.
     */
    public get enchantable(): ItemEnchantableComponent {
        return this.instance.getComponent("enchantable") as ItemEnchantableComponent;
    };

    /**
     * Durability left on a item.
     */
    public get durability(): number {
        return this.durabilityComponent ? this.durabilityComponent.maxDurability - this.durabilityComponent.damage : 0;
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

    public getObject(): IItemStackObject {
        const { typeId, nameTag, amount } = this.instance;

        const object = {
            typeId, nameTag, amount,
            lore: this.instance.getLore(),
            enchantments: (this.instance.getComponent("enchantable") as ItemEnchantableComponent)?.getEnchantments(),
            damage: (this.instance.getComponent("durability") as ItemDurabilityComponent)?.damage,
        } as IItemStackObject;

        return object;
    };

    public static getManager(object: IItemStackObject): ItemStackManager {
        const { typeId, nameTag, amount, damage, lore, enchantments } = object;

        const itemStack = new ItemStack(typeId, amount);

        itemStack.nameTag = nameTag;
        itemStack.setLore(lore);
        (itemStack.getComponent("enchantable") as ItemEnchantableComponent)?.addEnchantments(enchantments);
        itemStack.getComponent("durability") ? (itemStack.getComponent("durability") as ItemDurabilityComponent).damage = damage : null;

        return new ItemStackManager(itemStack);
    };
};

export { ItemStackManager };