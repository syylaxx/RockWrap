import { EntityInventoryComponent, ItemStack, Player, RawText, world } from "@minecraft/server"

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

    public clearItem(item: ItemStack) {
        this.player.runCommandAsync(`clear "${this.player.name}" ${item.typeId} ${item.}`)
    }
}

enum InventoryManager {

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
