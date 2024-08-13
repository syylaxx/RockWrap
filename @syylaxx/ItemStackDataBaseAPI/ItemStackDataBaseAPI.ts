import { ItemStack } from "@minecraft/server"
import { DynamicProperty } from "../DynamicPropertyAPI/DynamicProperty"

export class ItemStackDataBase {
    private identifier: string

    constructor(identifier: string) {
        this.identifier = "ItemStackDataBase-" + identifier
    }

    public saveItemStack(itemStack: ItemStack) {
        const
            { typeId, nameTag, amount, getLore, getComponent } = itemStack,
            { getEnchantments } = getComponent("enchantable"),
            { damage, maxDurability } = getComponent("durability"),
            data = { 
                typeId: typeId,
                nameTag: nameTag,
                amount: amount,
                damage: damage,
                lore: getLore(),
                enchantments: getEnchantments()
            }

        new DynamicProperty(this.identifier).set(JSON.stringify(data))
    }

    public getItemStack(): ItemStack {
        const
            data = JSON.parse(new DynamicProperty(this.identifier).get() as string),
            { typeId, nameTag, amount, damage, lore, enchantments } = data,
            itemStack = new ItemStack(typeId, amount)

        itemStack.nameTag = nameTag
        itemStack.setLore(lore)
        itemStack.getComponent("durability").damage = damage
        itemStack.getComponent("enchantable").addEnchantments(enchantments)

        return itemStack
    }

    public reset() {
        new DynamicProperty(this.identifier).reset()
    }
}