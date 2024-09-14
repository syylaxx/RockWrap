import { Entity, system, Vector3, world } from "@minecraft/server";

import { DynamicPropertyManager } from "./DynamicPropertyManager";
import { PlayerManager } from "./PlayerManager";

interface EffectOptions { duration?: number, amplifier?: number, showParticles?: boolean, infinity?: boolean };

class EntityManager {
    public readonly identifier: string;
    public readonly instance: Entity;

    public nameTag: string;

    public constructor(entity: Entity) {
        if (!(entity instanceof Entity))
            throw new Error(`[ERROR] Entity was not defined correctly!`);

        if (!entity.dimension.getEntities().find((x) => x.id === entity.id))
            throw new Error(`[ERROR] Entity '${this.instance.typeId}' could not be found!`);

        this.instance = entity;
        this.identifier = entity.id;

        this.nameTag = entity.nameTag;
    };

    /**
     * If Entity is a Player, returns `PlayerManager`, otherwise `undefined`.
     */

    public get playerInstance(): PlayerManager | undefined {
        const player = world.getPlayers().find((x) => x.id === this.identifier)

        return player ? new PlayerManager(player) : undefined
    }

    public getData(identifier: string, replaceValue: string | number | boolean | Vector3 = undefined): string | number | boolean | Vector3 {
        return new DynamicPropertyManager(this.instance.id + ":" + identifier).get(replaceValue as any);
    };

    public setData(identifier: string, value: string | number | boolean | Vector3): void {
        new DynamicPropertyManager(this.instance.id + ":" + identifier).set(value);
    };

    public addEffect(type: string, { duration = 20 * 20, amplifier = 0, showParticles = true, infinity = false }: EffectOptions): void {
        if (infinity) {
            system.runInterval(() => {
                this.instance.addEffect(type, 21, { amplifier: amplifier, showParticles: showParticles });
            }, 20);
        } else {
            this.instance.addEffect(type, duration, { amplifier: amplifier, showParticles: showParticles });
        };
    };
};

export { EntityManager };