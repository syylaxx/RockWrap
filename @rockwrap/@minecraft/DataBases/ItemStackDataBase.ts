import { ItemStack } from "@minecraft/server";
import { DynamicPropertyManager } from "../Managers/DynamicPropertyManager";
import { ItemProperty, ItemStackObject } from "./interfaces/ItemStackObject";

class ItemStackDataBase {
    private readonly identifier: string;

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
        const {
          typeId,
          amount,
          nameTag,
          getLore,
          lockMode,
          keepOnDeath,
          getComponent,
          getCanDestroy,
          getCanPlaceOn,
          getDynamicProperty,
          getDynamicPropertyIds,
        } = itemStack;

        const { getEnchantments } = getComponent("enchantable");
        const { damage } = getComponent("durability");

        const properties = getDynamicPropertyIds()
                            .map((id): ItemProperty => ([
                                id, 
                                getDynamicProperty(id)
                            ]))

        const data: ItemStackObject = {
            typeId, nameTag, amount, damage, lockMode, keepOnDeath, properties,

            lore: getLore(),
            canDestroy: getCanDestroy(),
            canPlaceOn: getCanPlaceOn(),
            enchantments: getEnchantments(),
        }

        new DynamicPropertyManager(this.identifier).set(JSON.stringify(data));
    };

    /**
     * Gets saved ItemStack.
     * @returns Item as ItemStack instance. 
     */
    public getItemStack(): ItemStack {
        const data = JSON.parse(new DynamicPropertyManager(this.identifier).get() as string) as ItemStackObject;
        const { 
            typeId, nameTag, amount, damage, lockMode, keepOnDeath, properties,
            
            lore,
            canDestroy,
            canPlaceOn,
            enchantments
        } = data;

        const itemStack = new ItemStack(typeId, amount);

        itemStack.nameTag = nameTag;
        itemStack.lockMode = lockMode;
        itemStack.keepOnDeath = keepOnDeath;

        properties.forEach((property)=>{
            itemStack.setDynamicProperty(...property);
        })

        itemStack.setLore(lore);
        itemStack.getComponent("durability").damage = damage;
        itemStack.getComponent("enchantable").addEnchantments(enchantments);

        itemStack.setCanDestroy(canDestroy);
        itemStack.setCanPlaceOn(canPlaceOn);

        return itemStack;
    };

    /**
     * Resets item from database.
     */
    public reset(): void {
        new DynamicPropertyManager(this.identifier).reset();
    };
}

export { ItemStackDataBase };