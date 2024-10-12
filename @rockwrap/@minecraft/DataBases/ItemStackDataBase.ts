import { ItemStack } from "@minecraft/server";
import { DynamicPropertyManager } from "../Managers/DynamicPropertyManager";
import { IItemStackObject } from "./interfaces/ItemStackObject";
import { ItemStackManager } from "../Managers/ItemStackManager";

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
        const object = new ItemStackManager(itemStack).getObject();

        new DynamicPropertyManager(this.identifier).set(JSON.stringify(object));
    };

    /**
     * Gets saved ItemStack.
     * @returns Item as ItemStackManager. 
     */
    public getItemStack(): ItemStackManager {
        const object = JSON.parse(new DynamicPropertyManager(this.identifier).get() as string) as IItemStackObject;

        return ItemStackManager.getManager(object)
    };

    /**
     * Resets item from database.
     */
    public reset(): void {
        new DynamicPropertyManager(this.identifier).reset();
    };
}

export { ItemStackDataBase };