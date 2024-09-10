import { Container, EntityInventoryComponent, EquipmentSlot, ItemStack, Player, RawText, system, Vector3, world } from "@minecraft/server";

import { DynamicPropertyManager } from "./DynamicPropertyManager";

interface ItemStackData { typeId: string, amount?: number };
interface InventorySlot { itemStack: ItemStack, slot: number };
interface EffectOptions { duration?: number, amplifier?: number, showParticles?: boolean, infinity?: boolean };

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
        this.player.runCommandAsync(`clear "${this.player.name}" ${item.typeId} 0 ${item.amount}`);
    };

    public clearItems(items: ItemStackData[]): void {
        for (const item of items)
            this.player.runCommandAsync(`clear "${this.player.name}" ${item.typeId} 0 ${item.amount}`);
    }

    /**
     * Gets all Items from the Player, and returns Array with ItemStack.
     * @returns Return an Array with ItemStack.
     */

    public getAllItems(): ItemStack[] | [] {
        const items = [ ];

        for (let i = 0; i < this.inventory.inventorySize; i++)
            if (this.inventory.container.getItem(i))
                items.push(this.inventory.container?.getItem(i));

        return items;
    };

    /**
     * Gets the whole inventory of the Player, and returns Array with InventorySlot.
     * @returns Return an Array with InventorySlot.
     */

    public getInventory(): InventorySlot[] | [] {
        const inventory = [ ];

        for (let i = 0; i < this.inventory.inventorySize; i++)
            if (this.inventory.container.getItem(i))
                inventory.push({
                    itemStack: this.inventory.container.getItem(i),
                    slot: i
                });

        return inventory;
    };

    public giveItem(item: ItemStack): void {
        this.inventory.container.addItem(item);
    };

    public getItem(slot: number): ItemStack | undefined {
        return this.player.getComponent("inventory").container.getItem(slot);
    };

    public getMainHand(): ItemStack | undefined {
        return this.player.getComponent("equippable").getEquipment(EquipmentSlot.Mainhand);
    };

    public getOffHand(): ItemStack | undefined {
        return this.player.getComponent("equippable").getEquipment(EquipmentSlot.Offhand);
    };
};

class PlayerManager {
    public readonly instance: Player;
    public readonly identifier: string;
    public readonly name: string;

    public nameTag: string;

    public constructor(player: Player) {
        this.instance = player;

        if (!(player instanceof Player))
            throw new Error(`Player could not be found!`);

        if (!world.getPlayers().find((x) => x.id === this.instance.id))
            throw new Error(`Player '${this.instance.name}' could not be found!`);

        this.identifier = this.instance.id;
        this.nameTag = this.instance.nameTag;
        this.name = this.instance.name;
    };

    public get inventory(): PlayerInventoryManager {
        return new PlayerInventoryManager(this.instance.getComponent("inventory") as EntityInventoryComponent);
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
            this.instance.sendMessage(String(text));
        } else {
            this.instance.sendMessage(text);
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
};

export { PlayerManager };