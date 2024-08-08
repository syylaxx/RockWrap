import { system } from "@minecraft/server"

export class IntervalManager {
    private intervals: (() => void)[] = [];

    public setInterval(callback: () => void): void {
        this.intervals.push(callback);
    }

    public startAllIntervals(tickCooldown: number): void {
        system.runInterval(() => {
            for (const interval of this.intervals)
                interval()
        }, tickCooldown)
    }
}