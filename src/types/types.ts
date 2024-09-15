//Hero types
export interface HeroAttributes {
  name: string;
  bulletDamage: number;
  bulletsPerShot: number;
  ammo: number;
  bulletsPerSec: number;
  lightMelee: number;
  heavyMelee: number;
  health: number;
  healthRegen: number;
  bulletResist: number;
  spiritResist: number;
  moveSpeed: number;
  sprintSpeed: number;
  stamina: number;
  abilityRange: number;
  cooldownReduction: number;
  bulletLifesteal: number;
  spiritLifesteal: number;
  bulletShield: number;
  spiritShield: number;

  spiritPower: number;
  abilityPoints: number;
  flexSlots: number;
  spiritScaling: [string, number];
  bulletDamagePerLevel: number;
  meleeDamagePerLevel: number;
  healthPerLevel: number;
  inventory: Item[];
}

export interface HeroAttributesMap {
  [key: string]: HeroAttributes;
}

export interface Action {
  item: Item | undefined;
  type: 'UPDATE_STATS' | 'TOGGLE_ITEM' | 'SUBTRACT_ABILITY_POINT' | 'ADD_ABILITY_POINT';
}

//Item types

export type ModifierOperation = '-' | '+' | '*';
export type ModifierTuple = [ModifierOperation, number];

export type Modifier = {
  stat: string;
  modifier: ModifierOperation
  value: number;
}

export type EffectCondition = "headshot" | "range" | "health" | undefined;

export interface ItemPassives {
  modifiers: Modifier[]
  condition: EffectCondition;
  cooldown: number;
  duration: number;
  range:number;
}

export interface ItemActives {
  modifiers: Modifier[]
  cooldown: number;
  dps: ModifierTuple;
  duration: number;
  radius: number;
  range: number;
}
export interface ItemDebuffs {
  modifiers: Modifier[]
  duration: number;
}
export interface Item {
    name: string;
    category: string;
    cost: number;
    tier: number;
    
    //TODO: These might need refactor
    isFlex?: boolean;
    componentOf?: Item;

    modifiers: Modifier[];
    passives: ItemPassives | undefined;
    actives: ItemActives | undefined;
}
export interface ItemMap {
  [key: string]: Item;
}

export interface ItemComponentProps {
    item: Item;
    toggleItem: (action: Action) => void;
}
//Ability Types

