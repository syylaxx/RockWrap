import { world, system, Player, Entity, BlockPermutation, EntityDamageSource, EntityInitializationCause, Direction, Vector3 } from "@minecraft/server";

import { PlayerManager } from "../Managers/PlayerManager";
import { BlockManager } from "../Managers/BlockManager";
import { ItemStackManager } from "../Managers/ItemStackManager";
import { EntityManager } from "../Managers/EntityManager";
import { CallbackType } from "./types/CallbackType";

interface BlockBrokenArgs { readonly block: BlockManager, readonly brokenBlockPermutation: BlockPermutation, readonly itemStack: ItemStackManager, readonly player: PlayerManager };
interface BlockPlacedArgs { readonly block: BlockManager, readonly player: PlayerManager };
interface ButtonPushedArgs { readonly block: BlockManager, readonly entity: EntityManager};
interface EntityHitEntityArgs { readonly entity: EntityManager, readonly hitEntity: EntityManager };
interface EntityHurtArgs { readonly entity: EntityManager, readonly damageSource: EntityDamageSource, readonly damage: number };
interface EntitySpawnedArgs { readonly cause: EntityInitializationCause, readonly entity: EntityManager }
interface InteractedWithBlockArgs { readonly block: BlockManager, readonly itemStack: ItemStackManager, readonly player: PlayerManager };
interface InteractedWithEntityArgs { readonly entity: EntityManager, readonly player: PlayerManager };
interface ItemUsedArgs { readonly itemStack: ItemStackManager, readonly player: PlayerManager };
interface ItemUsedOnArgs { readonly block: BlockManager, readonly blockFace: Direction, readonly faceLocation: Vector3, readonly itemStack: ItemStackManager, readonly player: PlayerManager };
interface MessageSentArgs { readonly message: string, readonly player: PlayerManager };
interface PlayerLeftArgs { readonly identifier: string, readonly name: string };
interface PlayerSpawnedArgs { readonly playerJoined: boolean, readonly player: PlayerManager };

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
        identifier: "ButtonPushed",
        event: "buttonPush",
        isSubscribed: false,
        callbacks: [] as Array<(args: ButtonPushedArgs) => void>
    },
    {
        identifier: "EntityHitEntity",
        event: "entityHitEntity",
        isSubscribed: false,
        callbacks: [] as Array<(args: EntityHitEntityArgs) => void>
    },
    {
        identifier: "EntityHurt",
        event: "entityHurt",
        isSubscribed: false,
        callbacks: [] as Array<(args: EntityHurtArgs) => void>
    },
    {
        identifier: "EntitySpawned",
        event: "entitySpawn",
        isSubscribed: false,
        callbacks: [] as Array<(args: EntitySpawnedArgs) => void>
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
        identifier: "ItemUsed",
        event: "itemUse",
        isSubscribed: false,
        callbacks: [] as Array<(args: ItemUsedArgs) => void>
    },
    {
        identifier: "ItemUsedOn",
        event: "itemUseOn",
        isSubscribed: false,
        callbacks: [] as Array<(args: ItemUsedOnArgs) => void>
    },
    {
        identifier: "MessageSent",
        event: "chatSend",
        isSubscribed: false,
        callbacks: [] as Array<(args: MessageSentArgs) => void>
    },
    {
        identifier: "OnTick",
        event: undefined,
        isSubscribed: false,
        callbacks: [] as Array<() => void>
    },
    {
        identifier: "PlayerLeft",
        event: "playerLeave",
        isSubscribed: false,
        callbacks: [] as Array<(args: PlayerLeftArgs) => void>
    },
    {
        identifier: "PlayerSpawned",
        event: "playerSpawn",
        isSubscribed: false,
        callbacks: [] as Array<(args: PlayerSpawnedArgs) => void>
    },
    {
        identifier: "WorldInitialized",
        event: "worldInitialize",
        isSubscribed: false,
        callbacks: [] as Array<() => void>
    },
];

class AfterEvents {
    public static OnTick(callback: () => void): void {
        const eventData = eventsData.find(event => event.identifier === "OnTick")

        eventData.callbacks.push(callback);

        if (eventData.isSubscribed) return;

        eventData.isSubscribed = true;

        system.runInterval((): void => {
            for (const interval of eventData.callbacks as Array<() => void>)
                interval();
        }, 1);
    };

    private static subscribe(identifier: string, callback: (arg: any) => void) {
        const eventData = eventsData.find(event => event.identifier === identifier);

        eventData.callbacks.push(callback);

        if (eventData.isSubscribed) return;

        eventData.isSubscribed = true;

        world.afterEvents[eventData.event].subscribe((callback: any) => {
            const {
                block,
                initialSpawn,
                itemStack,
                sender,
                source,
                player,
                entity,
                hurtEntity,
                hitEntity,
                damagingEntity,
                target,
                playerName,
                playerId,
            } = callback;
            
            const cancelEvent = () => callback.cancel = true;

            const getPlayer: Player = source instanceof Player ? source : sender ?? player;
            const getEntity: Entity = source instanceof Entity ? source : target ?? damagingEntity ?? hurtEntity ?? entity;

            const properties = {
                block: block ? new BlockManager(block) : undefined,
                entity: getEntity ? new EntityManager(getEntity) : undefined,
                itemStack: itemStack ? new ItemStackManager(itemStack) : undefined,
                player: getPlayer ? new PlayerManager(getPlayer) : undefined,
                hitEntity: hitEntity ? new EntityManager(hitEntity) : undefined,

                playerSpawned: initialSpawn,
                name: playerName,
                identifier: playerId,
            };

            const replacedCallback = {
                ...callback,
                ...properties,
                cancelEvent
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

    public static ButtonPushed(callback: (args: ButtonPushedArgs) => void): void {
        this.subscribe("ButtonPushed", callback);
    };

    public static EntityHitEntity(callback: (args: EntityHitEntityArgs) => void): void {
        this.subscribe("EntityHitEntity", callback);
    };

    public static EntityHurt(callback: (args: EntityHurtArgs) => void): void {
        this.subscribe("EntityHurt", callback);
    };

    public static EntitySpawned(callback: (args: EntitySpawnedArgs) => void): void {
        this.subscribe("EntitySpawned", callback);
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
    
    public static ItemUsedOn(callback: (args: ItemUsedOnArgs) => void): void {
        this.subscribe("ItemUsedOn", callback);
    };
    
    public static MessageSent(callback: (args: MessageSentArgs) => void): void {
        this.subscribe("MessageSent", callback);
    };

    public static PlayerLeft(callback: (args: PlayerLeftArgs) => void): void {
        this.subscribe("PlayerLeft", callback);
    };

    public static PlayerSpawned(callback: (args: PlayerSpawnedArgs) => void): void {
        this.subscribe("PlayerSpawned", callback);
    };

    public static WorldInitialized(callback: () => void): void {
        this.subscribe("WorldInitialized", callback);
    };
}

export { AfterEvents };