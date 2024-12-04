import { world, system, Player, Entity, BlockPermutation, EntityDamageSource, EntityInitializationCause, Direction, Vector3, ScriptEventSource, EntityHitInformation } from "@minecraft/server";

import { PlayerManager } from "../managers/PlayerManager";
import { BlockManager } from "../managers/BlockManager";
import { ItemStackManager } from "../managers/ItemStackManager";
import { EntityManager } from "../managers/EntityManager";
import { CallbackType } from "./types/CallbackType";

interface BlockBrokenArgs { readonly block: BlockManager, readonly brokenBlockPermutation: BlockPermutation, readonly itemStack: ItemStackManager, readonly player: PlayerManager };
interface BlockPlacedArgs { readonly block: BlockManager, readonly player: PlayerManager };
interface ButtonPushedArgs { readonly block: BlockManager, readonly entity: EntityManager };
interface EntityDiedArgs { readonly damageSource: EntityDamageSource, readonly entity: EntityManager };
interface EntityHitEntityArgs { readonly entity: EntityManager, readonly hitEntity: EntityManager };
interface EntityHurtArgs { readonly entity: EntityManager, readonly damageSource: EntityDamageSource, readonly damage: number };
interface EntityRemovedArgs { readonly entityIdentifier: string, readonly typeId: string };
interface EntitySpawnedArgs { readonly cause: EntityInitializationCause, readonly entity: EntityManager }
interface InteractedWithBlockArgs { readonly block: BlockManager, readonly itemStack: ItemStackManager, readonly player: PlayerManager };
interface InteractedWithEntityArgs { readonly entity: EntityManager, readonly player: PlayerManager };
interface ItemInteractedArgs { readonly itemStack: ItemStackManager, readonly player: PlayerManager };
interface ItemInteractedOnArgs { readonly block: BlockManager, readonly blockFace: Direction, readonly faceLocation: Vector3, readonly itemStack: ItemStackManager, readonly player: PlayerManager };
interface ItemUsedArgs { readonly itemStack: ItemStackManager, readonly player: PlayerManager, readonly useDuration: number };
interface MessageSentArgs { readonly message: string, readonly player: PlayerManager };
interface OnPlayerTickArgs { readonly player: PlayerManager };
interface PlayerLeftArgs { readonly playerIdentifier: string, readonly playerName: string };
interface PlayerSpawnedArgs { readonly playerJoined: boolean, readonly player: PlayerManager };
interface ProjectileHitEntityArgs { readonly hitVector: Vector3, readonly locaton: Vector3, readonly projectile: EntityManager, readonly source?: EntityManager, readonly entityInformation: EntityHitInformation };
interface ScriptEventArgs { readonly id: string, readonly initiator?: EntityManager, readonly message: string, readonly sourceType: ScriptEventSource };

const eventsData: CallbackType<any>[] = [
    {
        identifier: "BlockBroken",
        event: world.afterEvents.playerBreakBlock,
        isSubscribed: false,
        callbacks: [] as Array<(args: BlockBrokenArgs) => void>
    },
    {
        identifier: "BlockPlaced",
        event: world.afterEvents.playerPlaceBlock,
        isSubscribed: false,
        callbacks: [] as Array<(args: BlockPlacedArgs) => void>
    },
    {
        identifier: "ButtonPushed",
        event: world.afterEvents.buttonPush,
        isSubscribed: false,
        callbacks: [] as Array<(args: ButtonPushedArgs) => void>
    },
    {
        identifier: "EntityDied",
        event: world.afterEvents.entityDie,
        isSubscribed: false,
        callbacks: [] as Array<(args: EntityDiedArgs) => void>
    },
    {
        identifier: "EntityHitEntity",
        event: world.afterEvents.entityHitEntity,
        isSubscribed: false,
        callbacks: [] as Array<(args: EntityHitEntityArgs) => void>
    },
    {
        identifier: "EntityHurt",
        event: world.afterEvents.entityHurt,
        isSubscribed: false,
        callbacks: [] as Array<(args: EntityHurtArgs) => void>
    },
    {
        identifier: "EntityRemoved",
        event: world.afterEvents.entityRemove,
        isSubscribed: false,
        callbacks: [] as Array<(args: EntityRemovedArgs) => void>
    },
    {
        identifier: "EntitySpawned",
        event: world.afterEvents.entitySpawn,
        isSubscribed: false,
        callbacks: [] as Array<(args: EntitySpawnedArgs) => void>
    },
    {
        identifier: "InteractedWithBlock",
        event: world.afterEvents.playerInteractWithBlock,
        isSubscribed: false,
        callbacks: [] as Array<(args: InteractedWithBlockArgs) => void>
    },
    {
        identifier: "InteractedWithEntity",
        event: world.afterEvents.playerInteractWithEntity,
        isSubscribed: false,
        callbacks: [] as Array<(args: InteractedWithEntityArgs) => void>
    },
    {
        identifier: "ItemInteracted",
        event: world.afterEvents.itemUse,
        isSubscribed: false,
        callbacks: [] as Array<(args: ItemInteractedArgs) => void>
    },
    {
        identifier: "ItemInteractedOn",
        event: world.afterEvents.itemUseOn,
        isSubscribed: false,
        callbacks: [] as Array<(args: ItemInteractedOnArgs) => void>
    },
    {
        identifier: "ItemUsed",
        event: world.afterEvents.itemReleaseUse,
        isSubscribed: false,
        callbacks: [] as Array<(args: ItemUsedArgs) => void>
    },
    {
        identifier: "MessageSent",
        event: world.afterEvents.chatSend,
        isSubscribed: false,
        callbacks: [] as Array<(args: MessageSentArgs) => void>
    },
    {
        identifier: "OnPlayerTick",
        event: undefined,
        isSubscribed: false,
        callbacks: [] as Array<(args: OnPlayerTickArgs) => void>
    },
    {
        identifier: "OnTick",
        event: undefined,
        isSubscribed: false,
        callbacks: [] as Array<() => void>
    },
    {
        identifier: "PlayerLeft",
        event: world.afterEvents.playerLeave,
        isSubscribed: false,
        callbacks: [] as Array<(args: PlayerLeftArgs) => void>
    },
    {
        identifier: "PlayerSpawned",
        event: world.afterEvents.playerSpawn,
        isSubscribed: false,
        callbacks: [] as Array<(args: PlayerSpawnedArgs) => void>
    },
    {
        identifier: "ProjectileHitEntity",
        event: world.afterEvents.projectileHitEntity,
        isSubscribed: false,
        callbacks: [] as Array<(args: ProjectileHitEntityArgs) => void>
    },
    {
        identifier: "ScriptEventReceived",
        event: system.afterEvents.scriptEventReceive,
        isSubscribed: false,
        callbacks: [] as Array<() => void>
    },
    {
        identifier: "WorldInitialized",
        event: world.afterEvents.worldInitialize,
        isSubscribed: false,
        callbacks: [] as Array<() => void>
    },
];

class AfterEvents {
    private constructor() { };

    private static subscribe(identifier: string, callback: (arg: any) => void) {
        const eventData = eventsData.find(event => event.identifier === identifier);

        eventData.callbacks.push(callback);

        if (eventData.isSubscribed) return;

        eventData.isSubscribed = true;

        eventData.event.subscribe((callback: any) => {
            const {
                block,
                initialSpawn,
                initiator,
                itemStack,
                sender,
                source,
                player,
                entity,
                hurtEntity,
                hitEntity,
                damagingEntity,
                target,
                playerId,
                removedEntityId,
                faceLocation,
                damageSource,
                projectile,
                hitVector,
                deadEntity,
                useDuration,
            } = callback;

            const getEntity: Entity = source instanceof Entity ? source : target ?? deadEntity ?? damagingEntity ?? hurtEntity ?? entity;
            const getPlayer: Player = source instanceof Player ? source : sender ?? player;

            const properties = {
                block: block ? new BlockManager(block) : undefined,
                entity: getEntity ? new EntityManager(getEntity) : undefined,
                hitEntity: hitEntity ? new EntityManager(hitEntity) : undefined,
                initiator: initiator ? new EntityManager(initiator) : undefined,
                itemStack: itemStack ? new ItemStackManager(itemStack) : undefined,
                player: getPlayer ? new PlayerManager(getPlayer) : undefined,

                entityInformation: callback.getEntityHit ? callback.getEntityHit() : undefined,
                entityIdentifier: removedEntityId,
                playerIdentifier: playerId,
                playerJoined: initialSpawn,
                source: eventData.event === world.afterEvents.projectileHitEntity ? new EntityManager(source) : undefined,
                faceLocation,
                damageSource,
                projectile,
                hitVector,
                useDuration,
            };

            const replacedCallback = {
                ...callback,
                ...properties
            };

            for (const eventDataCallback of eventData.callbacks)
                eventDataCallback(replacedCallback);
        });
    };

    public static OnPlayerTick(callback: (args: OnPlayerTickArgs) => void, delay: number = 1): void {
        const eventData = eventsData.find(event => event.identifier === "OnPlayerTick")

        eventData.callbacks.push(callback);

        if (eventData.isSubscribed) return;

        eventData.isSubscribed = true;

        AfterEvents.OnTick(() => {
            for (const { name } of world.getPlayers()) {
                const player = new PlayerManager(name);

                for (const interval of eventData.callbacks as Array<(args: OnPlayerTickArgs) => void>) {
                    if (system.currentTick % delay !== 0) continue;

                    interval({ player });
                };
            };
        });
    };

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

    public static EntityRemoved(callback: (args: EntityRemovedArgs) => void): void {
        this.subscribe("EntityRemoved", callback);
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

    public static ItemInteracted(callback: (args: ItemInteractedArgs) => void): void {
        this.subscribe("ItemInteracted", callback);
    };

    public static ItemInteractedOn(callback: (args: ItemInteractedOnArgs) => void): void {
        this.subscribe("ItemInteractedOn", callback);
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

    public static ProjectileHitEntity(callback: (args: ProjectileHitEntityArgs) => void): void {
        this.subscribe("ProjectileHitEntity", callback);
    };

    public static ScriptEventReceived(callback: (args: ScriptEventArgs) => void): void {
        this.subscribe("ScriptEventReceived", callback);
    };

    public static WorldInitialized(callback: () => void): void {
        this.subscribe("WorldInitialized", callback);
    };
}

export { AfterEvents };