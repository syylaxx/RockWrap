import { Block, ItemStack, Player, world, system } from "@minecraft/server"

interface MessageSentArgs { message: string, player: Player }
interface BlockBrokenArgs { block: Block, player: Player, itemStack: ItemStack }
interface BlockPlacedArgs { block: Block, player: Player }
interface ItemUsedArgs { itemStack: ItemStack, player: Player }
interface PlayerSpawnedArgs { playerJoined: boolean, player: Player }

const
    eventsData = [
        {
            identifier: "MessageSent",
            event: "chatSend",
            isSubscribed: false,
            callbacks: [] as Array<(args: MessageSentArgs) => void>
        },
        {
            identifier: "BlockBroken",
            event: "playerBreakBlock",
            isSubscribed: false,
            callbacks: [] as Array<(args: BlockBrokenArgs) => void>
        },
        {
            identifier: "BlockPlaced",
            event: "playerPlaceBlock",
            isSubscribed: false,
            callbacks: [] as Array<(args: BlockPlacedArgs) => void>
        },
        {
            identifier: "ItemUsed",
            event: "itemUse",
            isSubscribed: false,
            callbacks: [] as Array<(args: ItemUsedArgs) => void>
        },
        {
            identifier: "PlayerSpawned",
            event: "playerSpawn",
            isSubscribed: false,
            callbacks: [] as Array<(args: PlayerSpawnedArgs) => void>
        },
    ]

export class AfterEvents {
    private static intervals: (() => void)[] = []
    private static isSubscribed = false

    public static OnTick(callback: () => void): void {
        this.intervals.push(callback)

        if (this.isSubscribed)
            return

        this.isSubscribed = true

        system.runInterval(() => {
            for (const interval of this.intervals)
                interval()
        }, 1)
    }

    private static subscribe(identifier: string, callback: (arg: any) => void) {
        const
            eventData = eventsData.find(event => event.identifier === identifier)

        eventData.callbacks.push(callback)

        if (eventData.isSubscribed)
            return

        eventData.isSubscribed = true

        world.afterEvents[eventData.event].subscribe((eventCallBack: any) => {
            eventCallBack.playerJoined = eventCallBack.initialSpawn
            
            eventCallBack.player = eventCallBack.sender ?? eventCallBack.player
            eventCallBack.player = eventCallBack.source ?? eventCallBack.player

            for (const callback of eventData.callbacks)
                callback(eventCallBack)
        })
    }

    static MessageSent(callback: (args: MessageSentArgs) => void) {
        this.subscribe("MessageSent", callback)
    }

    static BlockBroken(callback: (args: BlockBrokenArgs) => void) {
        this.subscribe("BlockBroken", callback)
    }

    static BlockPlaced(callback: (args: BlockPlacedArgs) => void) {
        this.subscribe("BlockPlaced", callback)
    }

    static ItemUsed(callback: (args: ItemUsedArgs) => void) {
        this.subscribe("ItemUsed", callback)
    }

    static PlayerSpawned(callback: (args: PlayerSpawnedArgs) => void) {
        this.subscribe("PlayerSpawned", callback)
    }
}