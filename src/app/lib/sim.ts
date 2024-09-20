//An attempt on a sycronous and interactive implementation of the simulator.

import { Hero } from "~/app/lib/Hero";
import Heap from "heap-js";

enum DamageType {
    Physical = 'Physical',
    Spirit = 'Spirit',
}

//**ChatGPT code starts here**
abstract class Event {
    tick: number;
    owner: SimHero;
    target: SimHero;
    
    constructor(tick: number, owner: SimHero, target: SimHero) {
        this.tick = tick;
        this.owner = owner;
        this.target = target;
    }
    
    abstract apply(): void;  // Abstract method to apply the event
    abstract shouldReschedule(): boolean;  // Abstract method to apply the event
    abstract nextEvent(): Event;
    abstract print(): void;
}
class BurstDamageEvent extends Event {
    damage: number;
    cooldown: number;
    constructor(tick: number, cooldown: number, owner: SimHero, target: SimHero, damage: number) {
        super(tick, owner, target);
        this.cooldown = cooldown * 64;
        this.damage = damage;
    }

    apply(): void {
        this.target.health -= this.damage;
    };
    shouldReschedule(): boolean {
        return true;
    };
    print(): void {
        console.log(`Tick: ${this.tick}. ${this.owner.name} dealt ${this.damage} DoT to ${this.target.name}.`);
    }
    nextEvent(): BurstDamageEvent {
        return new BurstDamageEvent(
            this.tick + this.cooldown,
            this.cooldown,
            this.owner,
            this.target,
            this.damage,
            );
    }
}
class DoTEvent extends Event {
    damage: number;
    eventsRemaining: number;
    tickRate: number;
    duration: number;
    cooldown: number;
    constructor(tick: number, tickRate: number, cooldown: number, duration: number, owner: SimHero, target: SimHero, damage: number) {
        super(tick, owner, target);
        this.damage = damage;
        this.cooldown = cooldown * 64;
        this.tickRate = tickRate;
        this.duration = duration;
        this.eventsRemaining = (Math.round(duration * 64) / tickRate);
    }

    apply(): void {
        this.target.health -= this.damage;
    }
    print(): void {
        console.log(`Tick: ${this.tick}, TickRate: ${this.tickRate}, Events Remaining: ${this.eventsRemaining}. ${this.owner.name} dealt ${this.damage} DoT to ${this.target.name}. ${this.target.name}'s health is:  ${this.target.health}`);
    }
    shouldReschedule(): boolean {
        return true;
    }
    nextEvent(): DoTEvent {

        if (this.eventsRemaining > 0) {
            this.tick += this. tickRate;
            this.eventsRemaining -= 1;
            return this;

        } else {
            return new DoTEvent(
                this.tick + this.cooldown,
                this.tickRate,
                this.cooldown,
                this.duration,
                this.owner,
                this.target,
                this.damage,
                );
        }
    }
}

class HealEvent extends Event {
    amount: number;
    eventsRemaining: number;
    tickRate: number;
    duration: number;
    cooldown: number;
    constructor(tick: number, tickRate: number, cooldown: number, duration: number, owner: SimHero, target: SimHero, amount: number) {
        super(tick, owner, target);
        this.amount = amount;
        this.cooldown = cooldown * 64;
        this.tickRate = tickRate;
        this.duration = duration;
        this.eventsRemaining = (Math.round(duration * 64) / tickRate);
    }

    apply(): void {
        this.target.health += this.amount;
    }
    print(): void {
        console.log(`Tick: ${this.tick}, TickRate: ${this.tickRate}, Events Remaining: ${this.eventsRemaining}. ${this.owner.name} healed for ${this.amount}. ${this.target.name}'s health is:  ${this.target.health}`);
    }
    shouldReschedule(): boolean {
        return true;
    }
    nextEvent(): HealEvent {

        if (this.eventsRemaining > 0) {
            this.tick += this. tickRate;
            this.eventsRemaining -= 1;
            return this;

        } else {
            return new HealEvent(
                this.tick + this.cooldown,
                this.tickRate,
                this.cooldown,
                this.duration,
                this.owner,
                this.target,
                this.amount
                );
        }
    }
}

class WeaponEvent extends Event {
    damage: number;
    eventsRemaining: number;
    tickRate: number;
    constructor(tick: number,owner: SimHero, target: SimHero) {
        super(tick, owner, target);
        this.damage = (this.owner.gun.damage * this.owner.gun.bulletsPerShot);
        this.tickRate = this.owner.gun.tickRate;
        
        //TODO: Refactor this and the gun interface, im just lazy rn
        this.eventsRemaining = this.owner.ammo;
    }
    apply(): void {
        this.target.health -= this.damage;
        
    }
    print(): void {
        console.log(`Tick: ${this.tick}, TickRate: ${this.tickRate}, Ammo left: ${this.eventsRemaining}. ${this.owner.name} dealt ${this.damage} bullet damage to ${this.target.name}. ${this.target.name}'s health is:  ${this.target.health}`);
    }
    shouldReschedule(): boolean {
        return true;
    }
    reload(): void {
        //Add reload time here
        this.eventsRemaining = this.owner.ammo;
        this.tick += 128;
        console.log(`${this.owner.name} is reloading`);
    }
    nextEvent(): WeaponEvent {
        if (this.eventsRemaining > 0) {
            this.tick += this.tickRate;
            this.eventsRemaining -= 1;
            return this;

        } else {
            this.reload();
            return this;
        }
    }
}
//SimHero related things
export interface Gun {
    damage: number;
    tickRate: number;
    bulletsPerShot: number;
}

class SimHero extends Hero {
    gun: Gun;
    regenTick: number;
    constructor(hero: Hero) {
        super(hero)
        this.gun = {damage: this.bulletDamage, tickRate: Math.round(64 / this.bulletsPerSec), bulletsPerShot: this.bulletsPerShot};
        this.regenTick = Math.round(64 / hero.healthRegen);
    }
}
export class Sim {
    heroA: SimHero;
    heroB: SimHero;
    tick: number;
    eventQueue: Heap<Event> = new Heap<Event>((a, b) => a.tick - b.tick);
    constructor(heroA: Hero, heroB: Hero) {
        this.heroA =  new SimHero(heroA);
        this.heroB = new SimHero(heroB);
        this.tick = 0;
    }
    
    nextTick(): void {
        this.tick = this.tick + 1
    }
    
    scheduleEvent(event: Event): void {
        this.eventQueue.push(event);
    }

    checkEvents(): void {
        let event: Event | undefined = this.eventQueue.peek()
        if (event && (event.tick == this.tick)) {
            //TODO: Type assertion bad
            event = this.eventQueue.pop() as Event;

            //Executes the event
            event.apply();
            
            //Might keep this around to avoid extra computing
            //event.shouldReschedule();

            event.print();

            this.scheduleEvent(event.nextEvent())

            this.checkEvents();
        };
    };
    // TODO: Refactor to include more flexibilty. Right now the damage ammount is immutable and doesn't
    // handle factors like lifesteal, spirit v.s. weapon, status effects, etc
    run(): [Hero, Hero]{
        //Initial weapon damage schedule
        this.scheduleEvent(new WeaponEvent(
                this.tick,
                this.heroA,
                this.heroB
        ));

        this.scheduleEvent(new WeaponEvent(
                this.tick,
                this.heroB,
                this.heroA
        ));
        let times: number[] = [];

        //Main engine loop
        const tickDuration = 1000 / 64;
        let start: number;
        let deltaTime: number;

        while (this.heroA.health > 0 && this.heroB.health > 0) {
            const start = performance.now();
            this.checkEvents();

            // Prevent infinite looping
            if (this.tick > 100000) {
                break;
            }

            const deltaTime = performance.now() - start;

            if (deltaTime < tickDuration) {
                console.log("tick was too fast");
                setTimeout((() => console.log(`pausing execution for ${tickDuration - deltaTime} on tick ${this.tick}`)),
                    (tickDuration - deltaTime))
            } else {
                console.log(`Execution took: ${deltaTime} on tick ${this.tick}`)
            }
            
            this.nextTick();
        }

        console.log("TTK is:", this.tick / 64, " seconds");
        return [this.heroA, this.heroB];
    }
}