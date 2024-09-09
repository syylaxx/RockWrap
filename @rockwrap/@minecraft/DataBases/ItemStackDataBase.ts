import { Enchantment, ItemStack } from "@minecraft/server"
import { DynamicPropertyManager } from "../Managers/DynamicPropertyManager"

interface ItemStackObject {
    typeId: string,
    nameTag: string,
    amount: number,
    damage: number,
    lore: string[],
    enchantments: Enchantment[]
}

export class ItemStackDataBase {
    private identifier: string

    public constructor(identifier: string) {
        this.identifier = "ItemStackDataBase-" + identifier
    }

    public saveItemStack(itemStack: ItemStack) {
        const
            { typeId, nameTag, amount, getLore, getComponent } = itemStack,
            { getEnchantments } = getComponent("enchantable"),
            { damage } = getComponent("durability"),
            data = {
                typeId: typeId,
                nameTag: nameTag,
                amount: amount,
                damage: damage,
                lore: getLore(),
                enchantments: getEnchantments()
            }

        new DynamicPropertyManager(this.identifier).set(JSON.stringify(data))
    }

    public getItemStack(): ItemStack {
        const
            data = JSON.parse(new DynamicPropertyManager(this.identifier).get() as string) as ItemStackObject,
            { typeId, nameTag, amount, damage, lore, enchantments } = data,
            itemStack = new ItemStack(typeId, amount)

        itemStack.nameTag = nameTag
        itemStack.setLore(lore)
        itemStack.getComponent("durability").damage = damage
        itemStack.getComponent("enchantable").addEnchantments(enchantments)

        return itemStack
    }

    public reset() {
        new DynamicPropertyManager(this.identifier).reset()
    }
}