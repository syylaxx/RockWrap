import { ItemDurabilityComponent, ItemEnchantableComponent, ItemStack } from "@minecraft/server";
import { ItemProperty, IItemStackObject } from "../databases/interfaces/ItemStackObject";

class ItemStackManager extends ItemStack {
    private durabilityComponent: ItemDurabilityComponent;

    /**
     * Max durability of an item.
     */
    public readonly maxDurability: number;

    /**
     * Creates an instance of custom item manager.
     * @param itemStack Default instance of an item or correct typeId.
     * @returns Instance of custom item manager.
     */
    public constructor(itemStack: ItemStack | string) {
        if (!(itemStack instanceof ItemStack) && typeof itemStack !== "string")
            throw new Error(`ItemStack was not defined correctly!`);

        if (typeof itemStack === "string" && !new ItemStack(itemStack)?.typeId)
            throw new Error(`TypeId : '${itemStack}' does not exist!`);

        super(
            itemStack instanceof ItemStack ? itemStack.typeId : itemStack as string,
            itemStack instanceof ItemStack ? itemStack.amount : 1
        );

        this.durabilityComponent = this.getComponent("durability") as ItemDurabilityComponent;
        this.maxDurability = this.durabilityComponent ? this.durabilityComponent.maxDurability : 0;
    };

    /**
     * Component, that allows you to access item's enchantments.
     */
    public get enchantable(): ItemEnchantableComponent {
        return this.getComponent("enchantable") as ItemEnchantableComponent;
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
        const {
            typeId,
            amount,
            nameTag,
            lockMode,
            keepOnDeath,
            getDynamicProperty,
        } = this

        const enchantableComponent = this.getComponent("enchantable") as ItemEnchantableComponent;
        const durabilityComponent = this.getComponent("durability") as ItemDurabilityComponent;

        const dynamicProperties = this.getDynamicPropertyIds()
            .map((id): ItemProperty => ([
                id,
                getDynamicProperty(id)
            ]));

        const object: IItemStackObject = {
            amount, dynamicProperties, keepOnDeath, lockMode, nameTag, typeId,

            damage: durabilityComponent?.damage,
            canDestroy: this.getCanDestroy(),
            canPlaceOn: this.getCanPlaceOn(),
            enchantments: enchantableComponent?.getEnchantments(),
            lore: this.getLore(),
        };

        return object;
    };

    public static getManager(object: IItemStackObject): ItemStackManager {
        const {
            typeId, nameTag, amount, damage, lockMode, keepOnDeath, dynamicProperties,

            lore,
            canDestroy,
            canPlaceOn,
            enchantments
        } = object;

        const itemStack = new ItemStack(typeId, amount);

        itemStack.nameTag = nameTag;
        itemStack.lockMode = lockMode;
        itemStack.keepOnDeath = keepOnDeath;

        dynamicProperties.forEach((property) => {
            itemStack.setDynamicProperty(...property);
        });

        itemStack.setLore(lore);

        itemStack.getComponent("durability") ? (itemStack.getComponent("durability") as ItemDurabilityComponent).damage = damage : null;

        (itemStack.getComponent("enchantable") as ItemEnchantableComponent)?.addEnchantments(enchantments);

        itemStack.setCanDestroy(canDestroy);
        itemStack.setCanPlaceOn(canPlaceOn);

        return new ItemStackManager(itemStack);
    };
};

export { ItemStackManager };