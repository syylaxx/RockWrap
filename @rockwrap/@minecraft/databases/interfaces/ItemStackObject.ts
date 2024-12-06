import { Enchantment, ItemLockMode, Vector3 } from "@minecraft/server";

type ItemPropertyValue = string | number | boolean | Vector3;
type ItemProperty = [string, ItemPropertyValue];

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
     * Describes how an item can be moved within a container.
     */
    lockMode: ItemLockMode,

    /**
     * Describes if the item will be kept on death.
     */
    keepOnDeath: boolean,

    /**
     * The dynamic properties of an item.
     *
     * For every property, the first index is the key and the second is the value.
     */
    dynamicProperties: ItemProperty[],

    /**
     * Lore of this item.
     * Lore is a additional description for items.
     */
    lore: string[],

    /**
     * The list of block types this item can break in Adventure mode.
     */
    canDestroy: string[],

    /**
     * The list of block types this item can be placed on in Adventure mode.
     */
    canPlaceOn: string[],

    /**
     * Enchantments of this item.
     */
    enchantments: Enchantment[]
}

export { ItemProperty, ItemStackObject };