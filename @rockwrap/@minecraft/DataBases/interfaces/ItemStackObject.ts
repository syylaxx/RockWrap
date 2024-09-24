import { Enchantment } from "@minecraft/server";

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

export { ItemStackObject };