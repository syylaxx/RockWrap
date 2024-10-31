import { CommandResult, Entity, EntityApplyDamageByProjectileOptions, EntityApplyDamageOptions, EntityComponentTypeMap, Player, system, Vector3, world } from "@minecraft/server";
import { DynamicPropertyManager } from "./DynamicPropertyManager";
import { PlayerManager } from "./PlayerManager";
import { ConsoleManager } from "./ConsoleManager";
import { EffectOptions } from "./interfaces/EffectOptions";
import { DynamicPropertyValue } from "./types/DynamicPropertyValue";

class EntityManager {
    /**
     * Identifier of this entity.
     * @readonly
     */
    public readonly identifier: string;

    /**
     * Default instance of this entity.
     * @readonly
     */
    public readonly instance: Entity;

    /**
     * Identifier of this entity.
     * @readonly
     */
    public readonly typeId: string;

    /**
     * Creates a new instance of custom entity manager class.
     * @param entity Default entity instance.
     */
    public constructor(entity: Entity) {
        if (!(entity instanceof Entity))
            throw ConsoleManager.error(`Entity was not defined correctly!`);

        if (!world.getEntity(entity.id))
            throw ConsoleManager.error(`Entity '${entity.typeId}' could not be found!`);

        this.instance = entity;
        this.identifier = entity.id;
        this.typeId = entity.typeId;
    };

    /**
     * Entity's name tag.
     */
    public get nameTag(): string {
        return this.instance.nameTag;
    };

    /**
     * Sets an entity name tag.
     */
    public set nameTag(value: string) {
        this.instance.nameTag = value;
    };

    public get location(): Vector3 {
        return this.instance.location;
    };

    public set location(vector: Vector3) {
        this.instance.teleport(vector, { keepVelocity: true });
    };

    public get health(): number {
        return this.getComponent("health").currentValue;
    };

    public set health(value: number) {
        this.getComponent("health").setCurrentValue(value);
    };

    public get velocity(): Vector3 {
        return this.instance.getVelocity();
    };

    public set velocity(vector: Vector3) {
        this.instance.applyImpulse(vector);
    };

    /**
     * Gets an PlayerManager instance, if provided entity was instance of player.
     * @returns If entity is a player, returns `PlayerManager` instance, otherwise `undefined`.
     */
    public get playerInstance(): PlayerManager | undefined {
        const player: Player | undefined = world.getPlayers().find((x) => x.id === this.identifier);

        return player ? new PlayerManager(player) : undefined;
    };

    /**
     * Gets a data from selected identifier, which is assigned to this entity.
     * @param identifier Identifier, which will be the source.
     * @param replaceValue Default value.
     * @returns Returns a signed value or the default one, which is also assigned.
     */
    public getData(identifier: string, replaceValue: string | number | boolean | Vector3 = undefined): DynamicPropertyValue {
        return new DynamicPropertyManager(this.instance.id + ":" + identifier).get(replaceValue as any);
    };

    /**
     * Sets a data for selected identifier, which is assigned to this entity.
     * @param identifier Identifier, which will get the new value.
     * @param value New value of identifier.
     */
    public setData(identifier: string, value: string | number | boolean | Vector3): void {
        new DynamicPropertyManager(this.instance.id + ":" + identifier).set(value);
    };

    public runCommand(command: string): CommandResult | Promise<CommandResult> {
        try {
            return this.instance.runCommand(command);
        } catch {
            return this.instance.runCommandAsync(command);
        };
    };

    /**
     * Adds an effect to player.
     * @param type Identifier of an effect.
     * @param effectOptions Options of an effect.
     */
    public addEffect(type: string, { duration = 20 * 20, amplifier = 0, showParticles = true, infinity = false }: EffectOptions): void {
        if (infinity) {
            system.runInterval((): void => {
                this.instance.addEffect(type, 21, { amplifier: amplifier, showParticles: showParticles });
            }, 20);
        } else {
            this.instance.addEffect(type, duration, { amplifier: amplifier, showParticles: showParticles });
        };
    };

    public stopFire(): void {
        this.instance.extinguishFire();
    };

    public setFire(seconds: number, useEffects?: boolean): void {
        this.instance.setOnFire(seconds, useEffects);
    };

    public resetVelocity(): void {
        this.instance.clearVelocity();
    };

    public damage(amount: number, options?: EntityApplyDamageByProjectileOptions | EntityApplyDamageOptions): boolean {
        return this.instance.applyDamage(amount, options);
    };

    public getComponent<T extends keyof EntityComponentTypeMap>(component: T): EntityComponentTypeMap[T] {
        return this.instance.getComponent(component) as EntityComponentTypeMap[T];
    };
};

export { EntityManager };