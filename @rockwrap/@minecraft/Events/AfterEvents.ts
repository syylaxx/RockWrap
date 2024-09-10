import { Block, ItemStack, world, system } from "@minecraft/server";

import { PlayerManager } from "../Managers/PlayerManager";
import { BlockManager } from "../Managers/BlockManager";
import { ItemStackManager } from "../Managers/ItemStackManager";

interface MessageSentArgs { message: string, player: PlayerManager };
interface BlockBrokenArgs { block: Block, player: PlayerManager, itemStack: ItemStackManager };
interface BlockPlacedArgs { block: Block, player: PlayerManager };
interface ItemUsedArgs { itemStack: ItemStackManager, player: PlayerManager };
interface PlayerSpawnedArgs { playerJoined: boolean, player: PlayerManager };

const eventsData = [
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
];

class AfterEvents {
    private static intervals: (() => void)[] = [];
    private static isSubscribed: boolean = false;

    public static OnTick(callback: () => void): void {
        this.intervals.push(callback);

        if (this.isSubscribed) return;

        this.isSubscribed = true;

        system.runInterval(() => {
            for (const interval of this.intervals)
                interval();
        }, 1);
    };

    private static subscribe(identifier: string, callback: (arg: any) => void) {
        const eventData = eventsData.find(event => event.identifier === identifier);

        eventData.callbacks.push(callback);

        if (eventData.isSubscribed) return;

        eventData.isSubscribed = true;

        world.afterEvents[eventData.event].subscribe((eventCallBack: any) => {
            let {
                player,
                itemStack,
                block,
                playerJoined,
                initialSpawn,
                sender,
                source
            } = eventCallBack;

            playerJoined = initialSpawn;
            
            player = sender ?? player;
            player = source ?? player;

            console.warn((itemStack ? new ItemStackManager(itemStack) : undefined).durability)

            player = player ? new PlayerManager(player) : undefined;

            itemStack = itemStack ? new ItemStackManager(itemStack) : undefined;

            block = block ? new BlockManager(block) : undefined;

            for (const callback of eventData.callbacks)
                callback(eventCallBack);
        });
    };

    static MessageSent(callback: (args: MessageSentArgs) => void): void {
        this.subscribe("MessageSent", callback);
    };

    static BlockBroken(callback: (args: BlockBrokenArgs) => void): void {
        this.subscribe("BlockBroken", callback);
    };

    static BlockPlaced(callback: (args: BlockPlacedArgs) => void): void {
        this.subscribe("BlockPlaced", callback);
    };

    static ItemUsed(callback: (args: ItemUsedArgs) => void): void {
        this.subscribe("ItemUsed", callback);
    };

    static PlayerSpawned(callback: (args: PlayerSpawnedArgs) => void): void {
        this.subscribe("PlayerSpawned", callback);
    };
}

export { AfterEvents };