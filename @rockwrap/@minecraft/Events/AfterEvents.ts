import { world, system, Player, Entity, Block, BlockPermutation, EntityDamageSource } from "@minecraft/server";

import { PlayerManager } from "../Managers/PlayerManager";
import { BlockManager } from "../Managers/BlockManager";
import { ItemStackManager } from "../Managers/ItemStackManager";
import { EntityManager } from "../Managers/EntityManager";

interface BlockBrokenArgs { readonly block: BlockManager, readonly brokenBlockPermutation: BlockPermutation, readonly itemStack: ItemStackManager, readonly player: PlayerManager };
interface BlockPlacedArgs { readonly block: BlockManager, readonly player: PlayerManager };
interface ButtonPushedArgs { readonly block: BlockManager, readonly entity: EntityManager};
interface EntityHitEntityArgs { readonly hitEntity: EntityManager, readonly hurtEntity: EntityManager };
interface EntityHurtArgs { readonly entity: EntityManager, readonly damageSource: EntityDamageSource, readonly damage: number };
interface InteractedWithBlockArgs { readonly block: BlockManager, readonly player: PlayerManager };
interface ItemUsedArgs { readonly itemStack: ItemStackManager, readonly player: PlayerManager };
interface MessageSentArgs { readonly message: string, readonly player: PlayerManager };
interface PlayerLeftArgs { readonly identifier: string, readonly name: string };
interface PlayerSpawnedArgs { readonly playerJoined: boolean, readonly player: PlayerManager };
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
        identifier: "InteractedWithBlock",
        event: "playerInteractWithBlock",
        isSubscribed: false,
        callbacks: [] as Array<(args: InteractedWithBlockArgs) => void>
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
        identifier: "PlayerSpawned",
        event: "playerSpawn",
        isSubscribed: false,
        callbacks: [] as Array<(args: PlayerSpawnedArgs) => void>
    },
    {
        identifier: "WorldInitialized",
        event: "worldInitialize",
        isSubscribed: false,
        callbacks: [] as Array<(args: WorldInitializedArgs) => void>
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
                brokenBlockPermutation,
                playerId,
                playerName,
                damageSource,
            } = callback;

            const getPlayer = () => source instanceof Player ? source : sender ?? player;
            const getEntity = () => source instanceof Entity ? source : target ?? hurtEntity ?? entity;

            const wrapInManager = () => ({
                block: block ? new BlockManager(block) : undefined,
                damagingEntity: damagingEntity ? new EntityManager(damagingEntity) : undefined,
                entity: getEntity() ? new EntityManager(getEntity()) : undefined,
                itemStack: itemStack ? new ItemStackManager(itemStack) : undefined,
                player: getPlayer() ? new PlayerManager(getPlayer()) : undefined,
                hitEntity: hitEntity ? new EntityManager(hitEntity) : undefined,
            });

            const cancelEvent = () => {
                callback.cancel = true;
            };

            const properties = {
                brokenBlockPermutation: brokenBlockPermutation,
                identifier: playerId,
                name: playerName,
                playerJoined: initialSpawn,
                damageSource: damageSource,
            }

            const replacedCallback = {
                ...callback,
                ...wrapInManager(),
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

    public static InteractedWithBlock(callback: (args: InteractedWithBlockArgs) => void): void {
        this.subscribe("InteractedWithBlock", callback);
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

    public static PlayerSpawned(callback: (args: PlayerSpawnedArgs) => void): void {
        this.subscribe("PlayerSpawned", callback);
    };

    public static WorldInitialized(callback: (args: WorldInitializedArgs) => void): void {
        this.subscribe("WorldInitialized", callback);
    };
}

export { AfterEvents };