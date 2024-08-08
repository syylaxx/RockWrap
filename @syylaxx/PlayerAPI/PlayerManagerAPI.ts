import { EntityInventoryComponent, ItemStack, Player, world } from "@minecraft/server"

class PlayerInventoryManager {
    private inventory: EntityInventoryComponent
    private player: Player

    constructor(inventory: EntityInventoryComponent) {
        this.inventory = inventory
        this.player = this.inventory.entity as Player
    }

    public clearAll(): void {
        this.inventory.container?.clearAll()
    }

    public clearItem(item: ItemStack): void {
        this.player.runCommandAsync(`clear "${this.player.name}" ${item.typeId} 0 ${item.amount}`)
    }

    public clearItems(items: ItemStack[]): void {
        for (const item of items)
            this.player.runCommandAsync(`clear "${this.player.name}" ${item.typeId} 0 ${item.amount}`)
    }

    public getAllItems(): ItemStack[] {
        const
            items = [ ]

        for (let i = 0; i < this.inventory.inventorySize; i++)
            if (this.inventory.container.getItem(i))
                items.push(this.inventory.container?.getItem(i))

        return items
    }

    public giveItem(item: ItemStack): void {
        this.inventory.container.addItem(item)
    }
}

export class PlayerManager {
    private player: Player

    constructor(player: Player) {
        this.player = player

        if (!world.getPlayers().find((x) => x.id === this.player.id))
            throw new Error(`Player '${this.player.name}' could not be found!`)
    }

    public get inventory(): PlayerInventoryManager {
        if (!world.getPlayers().find((x) => x.id === this.player.id))
            throw new Error(`Player '${this.player.name}' could not be found!`)

        return new PlayerInventoryManager(this.player.getComponent("inventory") as EntityInventoryComponent)
    }

    public kick(reason: string): void {
        if (!world.getPlayers().find((x) => x.id === this.player.id))
            throw new Error(`Player '${this.player.name}' could not be found!`)

        if (typeof reason !== 'string')
            throw new Error(`Kicking Player '${this.player.name}' failed, parameter 'reason' is not a String.`)

        this.player.runCommandAsync(`kick "${this.player.name}" ${reason}`)
    }
}

const
    player = undefined as Player