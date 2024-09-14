import { Entity, Player, system, world } from "@minecraft/server";

import { BlockManager } from "../Managers/BlockManager";
import { ItemStackManager } from "../Managers/ItemStackManager";
import { PlayerManager } from "../Managers/PlayerManager";
import { EntityManager } from "../Managers/EntityManager";

interface BlockBrokenArgs { readonly block: BlockManager, readonly itemStack: ItemStackManager, readonly player: PlayerManager, readonly cancelEvent: () => void };
interface BlockPlacedArgs { readonly block: BlockManager, readonly player: PlayerManager, readonly cancelEvent: () => void };
interface InteractedWithBlockArgs { readonly block: BlockManager, readonly player: PlayerManager, readonly cancelEvent: () => void };
interface ItemPickedUpArgs { readonly itemStack: ItemStackManager, readonly player: PlayerManager, readonly cancelEvent: () => void };
interface ItemUsedArgs { readonly itemStack: ItemStackManager, readonly player: PlayerManager, readonly cancelEvent: () => void };
interface MessageSentArgs { readonly message: string, readonly player: PlayerManager, readonly cancelEvent: () => void };
interface PlayerLeftArgs { readonly player: PlayerManager };
interface WorldInitializedArgs { };

const eventsData = [
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
        identifier: "InteractedWithBlock",
        event: "playerInteractWithBlock",
        isSubscribed: false,
        callbacks: [] as Array<(args: InteractedWithBlockArgs) => void>
    },
    {
        identifier: "ItemPickedUp",
        event: undefined,
        isSubscribed: false,
        callbacks: [] as Array<(args: ItemPickedUpArgs) => void>
    },
    {
        identifier: "ItemUsed",
        event: "itemUse",
        isSubscribed: false,
        callbacks: [] as Array<(args: ItemUsedArgs) => void>
    },
    {
        identifier: "MessageSent",
        event: "chatSend",
        isSubscribed: false,
        callbacks: [] as Array<(args: MessageSentArgs) => void>
    },
    {
        identifier: "PlayerLeft",
        event: "playerLeave",
        isSubscribed: false,
        callbacks: [] as Array<(args: PlayerLeftArgs) => void>
    },
    {
        identifier: "WorldInitialized",
        event: "worldInitialize",
        isSubscribed: false,
        callbacks: [] as Array<(args: WorldInitializedArgs) => void>
    },
];

class BeforeEvents {
    private constructor() {};

    public static ItemPickedUp(callback: (args: ItemPickedUpArgs) => void): void {
        const eventData = eventsData.find(event => event.identifier === "ItemPickedUp");

        eventData.callbacks.push(callback as any);

        if (eventData.isSubscribed) return;

        eventData.isSubscribed = true;

        world.beforeEvents.entityRemove.subscribe(({ removedEntity: item, removedEntity: { typeId, dimension, location } }) => {
            const isPlayerInRange = (loc1: { x: number, y: number, z: number }, loc2: { x: number, y: number, z: number }, range: number) => {
                const dx = Math.abs(loc1.x - loc2.x);
                const dy = Math.abs(loc1.y - loc2.y);
                const dz = Math.abs(loc1.z - loc2.z);

                return dx <= range && dy <= range && dz <= range;
            };

            const range = 1.5;

            const nearestPlayer = world.getPlayers().find((currentPlayer) => {
                return isPlayerInRange(currentPlayer.location, location, range);
            });

            if (typeId !== "minecraft:item" || !nearestPlayer) return;

            const player = new PlayerManager(nearestPlayer);

            const itemStack = new ItemStackManager(item.getComponent("item").itemStack)

            const cancelEvent = () => {
                player.inventory.clearItem({ typeId: itemStack.typeId, amount: itemStack.amount });
                system.runTimeout(() => dimension.spawnItem(itemStack.instance, location), 10);
            };

            for (const eventDataCallback of eventData.callbacks)
                eventDataCallback({ itemStack, player, cancelEvent } as any);
        });
    };

    private static subscribe(identifier: string, callback: (arg: any) => void) {
        const eventData = eventsData.find(event => event.identifier === identifier);

        eventData.callbacks.push(callback);

        if (eventData.isSubscribed) return;

        eventData.isSubscribed = true;

        world.beforeEvents[eventData.event].subscribe((callback: any) => {
            const {
                block,
                itemStack,
                sender,
                source,
                player,
                entity,
                hurtEntity,
                target,
            } = callback;

            const getPlayer = () => source instanceof Player ? source : sender ?? player;
            const getEntity = () => source instanceof Entity ? source : target ?? hurtEntity ?? entity;

            const wrapInManager = () => ({
                block: block ? new BlockManager(block) : undefined,
                itemStack: itemStack ? new ItemStackManager(itemStack) : undefined,
                player: player ? new PlayerManager(getPlayer()) : undefined,
                entity: entity ? new EntityManager(getEntity()) : undefined,
            });

            const cancelEvent = () => {
                callback.cancel = true;
            };

            const replacedCallback = {
                ...callback,
                ...wrapInManager(),
                cancelEvent,
            };
        
            for (const eventDataCallback of eventData.callbacks)
                eventDataCallback(replacedCallback);
        });              
    };
    
    public static BlockBroken(callback: (args: BlockBrokenArgs) => void) {
        this.subscribe("BlockBroken", callback);
    };
    
    public static BlockPlaced(callback: (args: BlockPlacedArgs) => void) {
        this.subscribe("BlockPlaced", callback);
    };
    
    public static ItemUsed(callback: (args: ItemUsedArgs) => void) {
        this.subscribe("ItemUsed", callback);
    };

    public static MessageSent(callback: (args: MessageSentArgs) => void) {
        this.subscribe("MessageSent", callback);
    };

    public static PlayerLeft(callback: (args: PlayerLeftArgs) => void) {
        this.subscribe("PlayerLeft", callback);
    };

    public static WorldInitialized(callback: (args: WorldInitializedArgs) => void) {
        this.subscribe("WorldInitialized", callback);
    };
}

export { BeforeEvents };