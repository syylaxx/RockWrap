import { CommandResult, Container, Dimension, EntityComponentTypes, EntityEquippableComponent, EntityInventoryComponent, EquipmentSlot, GameMode, ItemStack, Player, PlayerSoundOptions, RawText, system, Vector3, world } from "@minecraft/server";

import { DynamicPropertyManager } from "./DynamicPropertyManager";
import { ItemStackManager } from "./ItemStackManager";
import { ConsoleManager } from "./ConsoleManager";
import { rockWrapConfiguration } from "../../@config/RockWrapConfig";

interface EffectOptions { duration?: number, amplifier?: number, showParticles?: boolean, infinity?: boolean };
interface InventorySlot { itemStack: ItemStackManager, slot: number };
interface ItemStackData { typeId: string, amount?: number };

const { prefix: messagePrefix } = rockWrapConfiguration["@minecraft"].messages;

class PlayerInventoryManager {
    private inventory: EntityInventoryComponent;
    private player: Player;

    /**
     * Creates an instance of custom player's inventory manager.
     * @param inventory Inventory of a player.
     */
    public constructor(inventory: EntityInventoryComponent) {
        this.inventory = inventory;
        this.player = this.inventory.entity as Player;
    }

    /**
     * Default instance of a container.
     */
    public get container(): Container {
        return this.inventory.container;
    }; 

    /**
     * Clears all items from inventory.
     */
    public clearAll(): void {
        this.inventory.container.clearAll();
    };

    /**
     * Clears selected item and it's amount.
     * @param item Information about deletion.
     */
    public clearItem({ typeId, amount = Infinity }: ItemStackData): void {
        let deletedAmount = 0;

        for (const { itemStack, slot } of this.getInventory()) {
            if (itemStack.typeId !== typeId) continue;

            if (itemStack.amount <= amount - deletedAmount) {
                deletedAmount += itemStack.amount;

                this.container.setItem(slot);
            } else {
                itemStack.amount -= (amount - deletedAmount);

                deletedAmount = amount;

                this.container.setItem(slot, itemStack);
            };

            if (deletedAmount >= amount) return;
        };
    };

    /**
     * Clears selected items and their amount.
     * @param items Information about deletion
     */
    public clearItems(items: ItemStackData[]): void {
        for (const { typeId, amount } of items)
            this.clearItem({ typeId, amount });
    };

    /**
     * Gets all items from the player's inventory, and returns an array with items.
     * @returns An array with items.
     */
    public getAllItems(): ItemStackManager[] {
        const items: ItemStackManager[] = [];

        for (let i = 0; i < this.inventory.inventorySize; i++)
            if (this.inventory.container.getItem(i))
                items.push(new ItemStackManager(this.inventory.container?.getItem(i)) ?? null);

        return items;
    };

    /**
     * Gets the whole inventory of the player, and returns an array with item and their slot in inventory.
     * @returns An array with item and their position in player's inventory.
     */
    public getInventory(): InventorySlot[] {
        const inventory = [ ];

        for (let i = 0; i < this.inventory.inventorySize; i++) {
            const itemStack = this.inventory.container.getItem(i);

            const itemStackManager = itemStack ? new ItemStackManager(itemStack) : undefined;

            if (itemStackManager)
                inventory.push({
                    itemStack: itemStackManager,
                    slot: i
                });
        };

        return inventory;
    };

    /**
     * Gives an item to inventory.
     * @param itemStack Default instance of item, that will be added.
     */
    public giveItem(itemStack: ItemStack): void {
        this.container.addItem(itemStack);
    };

    /**
     * Sets an item on specific slot.
     * @param itemStack Default instance of item, that will be set on selected slot.
     * @param slot Slot, that will get the item.
     */
    public setItem(itemStack: ItemStack, slot: number): void {
        this.inventory.container.setItem(slot, itemStack);
    };

    /**
     * Gets an item from selected slot.
     * @param slot Slot, that will be the source.
     * @returns Returns an custom item stack manager class if slot was not empty. Unless it's `undefined`.
     */
    public getItem(slot: number): ItemStackManager | undefined {
        const itemStack = (this.player.getComponent("inventory") as EntityInventoryComponent).container.getItem(slot);

        return itemStack ? new ItemStackManager(itemStack) : undefined;
    };

    /**
     * Gets an item from player's selected item.
     * @returns Returns an custom item stack manager class if slot was not empty. Unless it's `undefined`.
     */
    public getMainHand(): ItemStackManager | undefined {
        const itemStack = (this.player.getComponent("equippable") as EntityEquippableComponent).getEquipment(EquipmentSlot.Mainhand);

        return itemStack ? new ItemStackManager(itemStack) : undefined;
    };

    /**
     * Gets an item from player's left hand.
     * @returns Returns an custom item stack manager class if slot was not empty. Unless it's `undefined`.
     */
    public getOffHand(): ItemStackManager | undefined {
        const itemStack = (this.player.getComponent("equippable") as EntityEquippableComponent).getEquipment(EquipmentSlot.Offhand);

        return itemStack ? new ItemStackManager(itemStack) : undefined;
    };

    /**
     * Sets an item from player's selected item.
     * @param itemStack Item, that will be replaced in player's selected slot.
     */
    public setMainHand(itemStack: ItemStack): void {
        this.container.setItem(this.player.selectedSlotIndex, itemStack);
    };
};

class PlayerManager {
    public readonly dimension: Dimension;
    public readonly identifier: string;
    public readonly instance: Player;
    public readonly name: string;

    /**
     * Creates an instance of a Manager for the Player Class.
     * @param player Player, can be either Player Class, Player.name or Player.id.
     */

    public constructor(player: Player | string) {
        if (!(player instanceof Player) && typeof player !== "string")
            throw ConsoleManager.error(`Player was not defined correctly!`);

        if (typeof player === "string") {
            const foundPlayer = world.getPlayers().find((x) => x.id === player || x.name === player);

            if (!foundPlayer)
                throw ConsoleManager.error(`Player '${player}' could not be found!`);

            this.instance = foundPlayer;
        } else {
            this.instance = player;
        };

        this.dimension = this.instance.dimension;
        this.identifier = this.instance.id;
        this.name = this.instance.name;
    };
    
    public get nameTag(): string {
        return this.instance.nameTag;
    };

    public set nameTag(value: string) {
        this.instance.nameTag = value;
    };

    public get inventory(): PlayerInventoryManager {
        return new PlayerInventoryManager(this.instance.getComponent("inventory") as EntityInventoryComponent);
    };

    public getGameMode(): GameMode {
        return this.instance.getGameMode();
    };

    public isOp(): boolean {
        return this.instance.isOp();
    };

    public runCommand(command: string): CommandResult | Promise<CommandResult> {
        try {
            return this.instance.runCommand(command);
        } catch {
            return this.instance.runCommandAsync(command);
        };
    };

    public kick(reason: string = ""): void {
        this.runCommand(`kick "${this.instance.name}" ${reason}`);
    };

    public getData(identifier: string, replaceValue: string | number | boolean | Vector3 = undefined): string | number | boolean | Vector3 {
        return new DynamicPropertyManager(this.instance.id + ":" + identifier).get(replaceValue as any);
    };

    public setData(identifier: string, value: string | number | boolean | Vector3): void {
        new DynamicPropertyManager(this.instance.id + ":" + identifier).set(value);
    };

    public sendMessage(text: string | string[] | number | RawText): void {
        if (typeof text === "number") {
            this.instance.sendMessage(messagePrefix + String(text));
        } else {
            this.instance.sendMessage(messagePrefix + text);
        };
    };

    public addEffect(type: string, { duration = 20 * 20, amplifier = 0, showParticles = true, infinity = false }: EffectOptions): void {
        if (infinity) {
            system.runInterval(() => {
                this.instance.addEffect(type, 21, { amplifier: amplifier, showParticles: showParticles });
            }, 20);
        } else {
            this.instance.addEffect(type, duration, { amplifier: amplifier, showParticles: showParticles });
        };
    };

    public playSound(type: string, options: PlayerSoundOptions = undefined): void {
        this.instance.playSound(type, options);
    };

    public getComponent(component: EntityComponentTypes) {
        return this.instance.getComponent(component);
    };

    public applyKnockback(directionX: number, directionZ: number, horizontalStrength: number, verticalStrength: number): void {
        this.instance.applyKnockback(directionX, directionZ, horizontalStrength, verticalStrength);
    };

    public applyImpulse(vector: Vector3) {
        this.instance.applyImpulse(vector);
    };
};

export { PlayerManager, ItemStackData };