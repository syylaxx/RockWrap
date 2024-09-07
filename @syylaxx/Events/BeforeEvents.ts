import { Block, ItemStack, Player, world } from "@minecraft/server"

interface MessageSentArgs { message: string, player: Player, cancelEvent: () => void }
interface BlockBrokenArgs { block: Block, player: Player, itemStack: ItemStack, cancelEvent: () => void }
interface BlockPlacedArgs { block: Block, player: Player, cancelEvent: () => void }
interface ItemUsedArgs { itemStack: ItemStack, player: Player, cancelEvent: () => void }

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
    ]

export class BeforeEvents {
    private constructor() {}

    private static subscribe(identifier: string, callback: (arg: any) => void) {
        const
            eventData = eventsData.find(event => event.identifier === identifier)

        eventData.callbacks.push(callback)

        if (eventData.isSubscribed)
            return

        eventData.isSubscribed = true

        world.beforeEvents[eventData.event].subscribe((eventCallBack: any) => {
            const
                cancelEvent = () => {
                    eventCallBack.cancel = true
                }

            eventCallBack.cancelEvent = cancelEvent

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
}