import { Entity, Player, system, world } from "@minecraft/server";
import { BlockManager } from "../managers/BlockManager";
import { ItemStackManager } from "../managers/ItemStackManager";
import { PlayerManager } from "../managers/PlayerManager";
import { EntityManager } from "../managers/EntityManager";
import type { CallbackType } from "./types/CallbackType";

import { BlockBrokenArgs } from "./interfaces/BeforeEvents/BlockBrokenArgs";
import { BlockPlacedArgs } from "./interfaces/BeforeEvents/BlockPlacedArgs";
import { EntityRemovedArgs } from "./interfaces/BeforeEvents/EntityRemovedArgs";
import { InteractedWithBlockArgs } from "./interfaces/BeforeEvents/InteractedWithBlockArgs";
import { InteractedWithEntityArgs } from "./interfaces/BeforeEvents/InteractedWithEntityArgs";
import { ItemPickedUpArgs } from "./interfaces/BeforeEvents/ItemPickedUpArgs";
import { ItemUsedArgs } from "./interfaces/BeforeEvents/ItemUsedArgs";
import { MessageSentArgs } from "./interfaces/BeforeEvents/MessageSentArgs";
import { PlayerLeftArgs } from "./interfaces/BeforeEvents/PlayerLeftArgs";

const eventsData: CallbackType<any>[] = [
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
        identifier: "EntityRemoved",
        event: "entityRemove",
        isSubscribed: false,
        callbacks: [] as Array<(args: EntityRemovedArgs) => void>
    },
    {
        identifier: "InteractedWithBlock",
        event: "playerInteractWithBlock",
        isSubscribed: false,
        callbacks: [] as Array<(args: InteractedWithBlockArgs) => void>
    },
    {
        identifier: "InteractedWithEntity",
        event: "playerInteractWithEntity",
        isSubscribed: false,
        callbacks: [] as Array<(args: InteractedWithEntityArgs) => void>
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
        callbacks: [] as Array<() => void>
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
            const isPlayerInRange = (loc1: { x: number, y: number, z: number }, loc2: { x: number, y: number, z: number }, range: number): boolean => {
                const dx = Math.abs(loc1.x - loc2.x);
                const dy = Math.abs(loc1.y - loc2.y);
                const dz = Math.abs(loc1.z - loc2.z);

                return dx <= range && dy <= range && dz <= range;
            };

            const range: number = 1.5;

            const nearestPlayer: Player | undefined = world.getPlayers().find((currentPlayer) => {
                return isPlayerInRange(currentPlayer.location, location, range);
            });

            if (typeId !== "minecraft:item" || !nearestPlayer) return;

            const player: PlayerManager = new PlayerManager(nearestPlayer);
            const itemStack: ItemStackManager = new ItemStackManager(item.getComponent("item").itemStack);

            const cancelEvent = (): void => {
                player.inventory.clearItem({ typeId: itemStack.typeId, amount: itemStack.amount });
                system.runTimeout(() => dimension.spawnItem(itemStack, location).clearVelocity(), 10);
            };

            for (const eventDataCallback of eventData.callbacks)
                eventDataCallback({ itemStack, player, cancelEvent } as any);
        });
    };
    
    private static subscribe(identifier: string, callback: (arg: any) => void): void {
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
                message,
                removedEntity,
            } = callback;
            
            const cancelEvent = (): boolean => callback.cancel = true;

            const getPlayer = source instanceof Player ? source : sender ?? player;
            const getEntity = source instanceof Entity ? source : target ?? hurtEntity ?? removedEntity ?? entity;

            const properties = {
                block: block ? new BlockManager(block) : undefined,
                itemStack: itemStack ? new ItemStackManager(itemStack) : undefined,
                player: getPlayer ? new PlayerManager(getPlayer) : undefined,
                entity: getEntity ? new EntityManager(getEntity) : undefined,

                message,
            };

            const replacedCallback = {
                ...callback,
                ...properties,
                cancelEvent,
            };
        
            for (const eventDataCallback of eventData.callbacks)
                eventDataCallback(replacedCallback);
        });              
    };
    
    public static BlockBroken(callback: (args: BlockBrokenArgs) => void): void {
        this.subscribe("BlockBroken", callback);
    };
    
    public static BlockPlaced(callback: (args: BlockPlacedArgs) => void): void {
        this.subscribe("BlockPlaced", callback);
    };
        
    public static EntityRemoved(callback: (args: EntityRemovedArgs) => void): void {
        this.subscribe("EntityRemoved", callback);
    };

    public static InteractedWithBlock(callback: (args: InteractedWithBlockArgs) => void): void {
        this.subscribe("InteractedWithBlock", callback);
    };

    public static InteractedWithEntity(callback: (args: InteractedWithEntityArgs) => void): void {
        this.subscribe("InteractedWithEntity", callback);
    };
    
    public static ItemUsed(callback: (args: ItemUsedArgs) => void): void {
        this.subscribe("ItemUsed", callback);
    };

    public static MessageSent(callback: (args: MessageSentArgs) => void): void {
        this.subscribe("MessageSent", callback);
    };

    public static PlayerLeft(callback: (args: PlayerLeftArgs) => void): void {
        this.subscribe("PlayerLeft", callback);
    };

    public static WorldInitialized(callback: () => void): void {
        this.subscribe("WorldInitialized", callback);
    };
}

export { BeforeEvents, BlockBrokenArgs, BlockPlacedArgs, EntityRemovedArgs, InteractedWithBlockArgs, InteractedWithEntityArgs, ItemPickedUpArgs, ItemUsedArgs, MessageSentArgs, PlayerLeftArgs };