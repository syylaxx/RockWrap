import { Container, Dimension, EntityComponentTypes, EntityInventoryComponent, EquipmentSlot, GameMode, ItemStack, Player, PlayerSoundOptions, RawText, system, Vector3, world } from "@minecraft/server";

import { DynamicPropertyManager } from "./DynamicPropertyManager";
import { ItemStackManager } from "./ItemStackManager";
import { ConsoleManager } from "./ConsoleManager";
import { rockWrapConfiguration } from "../../@config/RockWrapConfig";

interface EffectOptions { duration?: number, amplifier?: number, showParticles?: boolean, infinity?: boolean };
interface InventorySlot { itemStack: ItemStackManager, slot: number };
interface ItemStackData { typeId: string, amount?: number };

const messagePrefix = rockWrapConfiguration["@minecraft"].messages.prefix;

class PlayerInventoryManager {
    private inventory: EntityInventoryComponent;
    private player: Player;

    public constructor(inventory: EntityInventoryComponent) {
        this.inventory = inventory;
        this.player = this.inventory.entity as Player;
    }

    public get container(): Container {
        return this.inventory.container;
    };

    public clearAll(): void {
        this.inventory.container.clearAll();
    };

    public clearItem(item: ItemStackData): void {
        this.player.runCommandAsync(`clear "${this.player.name}" ${item.typeId} 0 ${item.amount = 1}`);
    };

    public clearItems(items: ItemStackData[]): void {
        for (const item of items)
            this.player.runCommandAsync(`clear "${this.player.name}" ${item.typeId} 0 ${item.amount}`);
    }

    /**
     * Gets all Items from the Player, and returns Array with ItemStack.
     * @returns Return an Array with ItemStack.
     */

    public getAllItems(): ItemStackManager[] {
        const items = [ ];

        for (let i = 0; i < this.inventory.inventorySize; i++)
            if (this.inventory.container.getItem(i))
                items.push(new ItemStackManager(this.inventory.container?.getItem(i)) ?? null);

        return items;
    };

    /**
     * Gets the whole inventory of the Player, and returns Array with InventorySlot.
     * @returns Return an Array with InventorySlot.
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

    public giveItem(itemStack: ItemStack): void {
        this.inventory.container.addItem(itemStack);
    };

    public setItem(itemStack: ItemStack, slot: number): void {
        this.inventory.container.setItem(slot, itemStack);
    };

    public getItem(slot: number): ItemStackManager | undefined {
        const itemStack = this.player.getComponent("inventory").container.getItem(slot);

        return itemStack ? new ItemStackManager(itemStack) : undefined;
    };

    public getMainHand(): ItemStackManager | undefined {
        const itemStack = this.player.getComponent("equippable").getEquipment(EquipmentSlot.Mainhand);

        return itemStack ? new ItemStackManager(itemStack) : undefined;
    };

    public getOffHand(): ItemStackManager | undefined {
        const itemStack = this.player.getComponent("equippable").getEquipment(EquipmentSlot.Offhand);

        return itemStack ? new ItemStackManager(itemStack) : undefined;
    };

    public setMainHand(itemStack: ItemStack): void {
        this.container.setItem(this.player.selectedSlotIndex, itemStack);
    };
};

class PlayerManager {
    public readonly dimension: Dimension;
    public readonly identifier: string;
    public readonly instance: Player;
    public readonly name: string;

    public constructor(player: Player) {
        if (!(player instanceof Player))
            throw ConsoleManager.error(`Player was not defined correctly!`);

        if (!world.getPlayers().find((x) => x.id === player.id))
            throw ConsoleManager.error(`Player '${this.instance.name}' could not be found!`);

        this.dimension = player.dimension;
        this.identifier = player.id;
        this.instance = player;
        this.name = player.name;
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

    public kick(reason: string): void {
        this.instance.runCommandAsync(`kick "${this.instance.name}" ${reason}`);
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
};

export { PlayerManager, ItemStackData };