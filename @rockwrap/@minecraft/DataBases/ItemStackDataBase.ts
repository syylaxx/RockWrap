import { Enchantment, ItemStack } from "@minecraft/server";

import { DynamicPropertyManager } from "../Managers/DynamicPropertyManager";

interface ItemStackObject {
    /**
     * ID of an item.
     */
    typeId: string,

    /**
     * Custom name of an item.
     */
    nameTag: string,

    /**
     * Amount of an item.
     */
    amount: number,

    /**
     * Durablity of an item.
     */
    damage: number,

    /**
     * Lore of this item.
     * Lore is a additional description for items.
     */
    lore: string[],

    /**
     * Enchantments of this item.
     */
    enchantments: Enchantment[]
};

class ItemStackDataBase {
    private identifier: string;

    /**
     * Creates an item database.
     * @param identifier Identifier of database for this item.
     */
    public constructor(identifier: string) {
        this.identifier = "ItemStackDataBase-" + identifier;
    };

    /**
     * Saves ItemStack to database.
     * @param itemStack Item, which is going to be saved.
     */
    public saveItemStack(itemStack: ItemStack) {
        const { typeId, nameTag, amount, getLore, getComponent } = itemStack;
        const { getEnchantments } = getComponent("enchantable");
        const { damage } = getComponent("durability");
        const data = {
            typeId: typeId,
            nameTag: nameTag,
            amount: amount,
            damage: damage,
            lore: getLore(),
            enchantments: getEnchantments()
        };

        new DynamicPropertyManager(this.identifier).set(JSON.stringify(data));
    };

    /**
     * Gets saved ItemStack.
     * @returns Item as ItemStack instance. 
     */
    public getItemStack(): ItemStack {
        const data = JSON.parse(new DynamicPropertyManager(this.identifier).get() as string) as ItemStackObject;
        const { typeId, nameTag, amount, damage, lore, enchantments } = data;
        const itemStack = new ItemStack(typeId, amount);

        itemStack.nameTag = nameTag;
        itemStack.setLore(lore);
        itemStack.getComponent("durability").damage = damage;
        itemStack.getComponent("enchantable").addEnchantments(enchantments);

        return itemStack;
    };

    /**
     * Resets item from database.
     */
    public reset() {
        new DynamicPropertyManager(this.identifier).reset();
    };
}

export { ItemStackDataBase };