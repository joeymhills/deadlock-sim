//Hero types
export interface HeroAttributes {
  bulletDamage?: number;
  bulletsPerShot?: number;
  ammo?: number;
  bulletsPerSec?: number;
  lightMelee?: number;
  heavyMelee?: number;
  health?: number;
  healthRegen?: number;
  bulletResist?: number;
  spiritResist?: number;
  moveSpeed?: number;
  sprintSpeed?: number;
  stamina?: number;
  abilityRange?: number;
  cooldownReduction?: number;
  spiritPower?: number;
  bulletLifesteal?: number;
  spiritLifesteal?: number;
  bulletShield?: number;
  spiritShield?: number;
  abilityPoints?: number;
  spiritScaling?: [string, number];
  weaponInventory: [],
  vitalityInventory: [],
  spiritInventory: [],
  flexInventory: []
}

export interface HeroAttributesMap {
  [key: string]: HeroAttributes;
}

//Item types

export type ModifierOperation = '-' | '+' | '*';
export type ModifierTuple = [ModifierOperation, number];

export interface Modifiers {
    moveSpeed?: ModifierTuple;
    sprintSpeed?: ModifierTuple;
    stamina?: ModifierTuple;
    abilityRange?: ModifierTuple;
    cooldownReduction?: ModifierTuple;
    health?: ModifierTuple;
    healthRegen?: ModifierTuple;
    ammo?: ModifierTuple;
    bulletDamage?: ModifierTuple;
    bulletsPerSec?: ModifierTuple;
    lightMelee?: ModifierTuple;
    heavyMelee?: ModifierTuple;
    spiritPower?: ModifierTuple;
    bulletLifesteal?: ModifierTuple;
    spiritLifesteal?: ModifierTuple;
    bulletVelocity?: ModifierTuple;
    bulletShield?: ModifierTuple;
    spiritShield?: ModifierTuple;
    bulletResist?: ModifierTuple;
    spiritResist?: ModifierTuple;
}

export type EffectCondition = "headshot" | "range" | undefined;

export interface ItemPassives extends Modifiers {
  condition: EffectCondition;
  cooldown: number;
  duration: number;
  range:number;
}

export interface ItemActives extends Modifiers {
  cooldown: number;
  dps: ModifierTuple;
  duration: number;
  radius: number;
  range: number;
}
export interface ItemDebuffs extends Modifiers {
  duration: number;
}
export interface Item {
    name: string;
    category: string;
    cost: number;
    tier: number;
    //TODO: This might need refactor
    componentOf: Item | undefined;
    modifiers: Modifiers;
    passives: ItemPassives | undefined;
    actives: ItemActives | undefined;
}
export interface ItemMap {
  [key: string]: Item;
}

export interface ItemComponentProps {
    item: Item;
    addItem: (itemName: string) => void;
}
//Ability Types