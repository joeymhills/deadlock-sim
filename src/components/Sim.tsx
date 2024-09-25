import React, { useEffect, useState, useRef } from "react";
import { Hero } from "~/app/lib/Hero";
import Heap from "heap-js";
import { getImageName } from "~/utils";

enum DamageType {
    Bullet = 'bullet',
    Spirit = 'spirit',
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
    damageType: DamageType;
    constructor(tick: number, cooldown: number, damageType: DamageType, owner: SimHero, target: SimHero, damage: number) {
        super(tick, owner, target);
        this.damageType = damageType;
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
            this.damageType,
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
    damageType: DamageType;
    constructor(tick: number, tickRate: number, cooldown: number, damageType: DamageType, duration: number, owner: SimHero, target: SimHero, damage: number) {
        super(tick, owner, target);
        this.damage = damage;
        this.cooldown = cooldown * 64;
        this.damageType = damageType;
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
                this.damageType,
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
    damageType: DamageType;
    constructor(tick: number, owner: SimHero, target: SimHero) {
        super(tick, owner, target);
        this.damage = (this.owner.gun.damage * this.owner.gun.bulletsPerShot);
        this.tickRate = this.owner.gun.tickRate;
        this.damageType = DamageType.Bullet;
        
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
interface Gun {
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
class Sim {
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

interface SimProps {
    heroAData: Hero;
    heroBData: Hero;
  }
  
  const SimComponent: React.FC<SimProps> = ({ heroAData, heroBData }) => {

    let animationFrameId: number;
    const tickDuration = 1000 / 64; // Time for each tick
    
    // State Hooks
    const [heroADisplay, setHeroADisplay] = useState(new SimHero(heroAData));
    const [heroBDisplay, setHeroBDisplay] = useState(new SimHero(heroBData));
    const [tickDisplay, setTickDisplay] = useState(0); // Separate state for displaying tick
    
    // Ref Hooks
    const tickRef = useRef(0); // Use ref to track the actual tick within the game loop
    const eventQueue = useRef(new Heap<Event>((a, b) => a.tick - b.tick)); // Event queue in ref
    const lastTickTimeRef = useRef(performance.now()); // Keep track of last tick time across renders
    const heroARef = useRef(new SimHero(heroAData));
    const heroBRef = useRef(new SimHero(heroBData)); 

    // Schedule an event
    const scheduleEvent = (event: Event) => {
      eventQueue.current.push(event);
    };
    
    // Need to find out a way to make these abilities programatically
    const heroAability1 = () => {
        return new DoTEvent(tickRef.current, 32, 8, DamageType.Spirit, 8,  heroARef.current, heroBRef.current, 80)
    }
  
    // Check and process events at the current tick
    const checkEvents = () => {
      let event = eventQueue.current.peek();
  
      while (event && event.tick === tickRef.current) {
        event = eventQueue.current.pop() as Event;
        event.apply();
  
        // Reschedule the event if necessary
        scheduleEvent(event.nextEvent());
  
        // Peek the next event in the queue
        event = eventQueue.current.peek();
      }
    };
    useEffect(() => {
    
      // Initial event setup

      //Sets up hero guns
      scheduleEvent(new WeaponEvent(0, heroARef.current, heroBRef.current));
      scheduleEvent(new WeaponEvent(0, heroBRef.current, heroARef.current));
      
      //Sets up innate health regen
      scheduleEvent(new HealEvent(0, heroARef.current.regenTick, 0, Infinity, heroARef.current, heroARef.current, 1));
      scheduleEvent(new HealEvent(0, heroARef.current.regenTick, 0, Infinity, heroARef.current, heroARef.current, 1));

    },[])

    // Main Event Loop Checks for events, if events are present then it executes them. If there are no
    // events then it moves onto the next tick.
    const gameLoop = () => {
        const now = performance.now();
        const deltaTime = now - lastTickTimeRef.current;

        if (deltaTime >= tickDuration) {
            checkEvents(); // Process events for this tick

            // Increment the tick in the ref
            tickRef.current += 1;

            // Update the display (this can trigger a re-render)
            setTickDisplay(tickRef.current);
            setHeroADisplay(heroARef.current);
            setHeroBDisplay(heroBRef.current);

            lastTickTimeRef.current = now; // Update last tick time
        }
        if (heroARef.current.health <= 0 || heroBRef.current.health <= 0) {
            
            //cleanup function
            return () => {
                cancelAnimationFrame(animationFrameId);
            };
        }
        // Continue the loop
        animationFrameId = requestAnimationFrame(gameLoop);
        
    };
  
      // Start the simulation loop
    
    {/*
      // Cleanup when the component unmounts
    */}
  
    return (
      <div className="pt-16 text-center min-h-screen flex flex-col items-center gap-4">
        
        <div className="flex flex-row justify-center items-start gap-4 p-8 bg-dark">
          
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl">{heroADisplay.name}</h2>
            <img className="h-72 rounded-md" src={`/heroCards/${getImageName(heroADisplay.name)}`} />
            <p>Health: {Math.round(heroADisplay.health > 0 ? heroADisplay.health : 0)}</p>

            {/* Max might not be accurate when health is increased by items*/}
            <progress id="health" value={heroADisplay.health} max={heroADisplay.base.health}></progress>

            {/*<button onClick={() => scheduleEvent(heroAability1())}>Use Ability 1</button>*/}
          </div>
  
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl">{heroBDisplay.name}</h2>
            <img className="h-72 rounded-md" src={`/heroCards/${getImageName(heroBDisplay.name)}`} />
            <p>Health: {Math.round(heroBDisplay.health > 0 ? heroBDisplay.health : 0)}</p>

            {/* Max might not be accurate when health is increased by items*/}
            <progress id="health" value={heroBDisplay.health} max={heroBDisplay.base.health}></progress>
          </div>
        </div>

        <p>Time: {(tickDisplay / 64).toFixed(2)}</p>
        <button onClick={() => {animationFrameId = requestAnimationFrame(gameLoop);}}>click to begin simulation</button>
      </div>
    );
  };
  
  export default SimComponent;