//This file contains the logic for creating a Hero instance in the hero builder

import { HeroAttributes, Item, ItemActives, ItemPassives, ItemDebuffs} from "~/types/types";

const defaultHeroAttributes: HeroAttributes = {
    bulletDamage: 0,
    bulletsPerShot: 0,
    ammo: 0,
    bulletsPerSec: 0,
    lightMelee: 0,
    heavyMelee: 0,
    health: 0,
    healthRegen: 0,
    bulletResist: 0,
    spiritResist: 0,
    moveSpeed: 0,
    sprintSpeed: 0,
    stamina: 0,
    abilityRange: 0,
    cooldownReduction: 0,
    spiritPower: 0,
    bulletLifesteal: 0,
    spiritLifesteal: 0,
    bulletShield: 0,
    spiritShield: 0,
    abilityPoints: 0,
    spiritScaling: ["default", 0],
    weaponInventory: [],
    vitalityInventory: [],
    spiritInventory: [],
    flexInventory: []
  };
export class Hero {
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
    spiritPower: number;
    bulletLifesteal: number;
    spiritLifesteal: number;
    bulletShield: number;
    spiritShield: number;
    abilityPoints: number;
    spiritScaling: [string,number];
    weaponInventory: Item[];
    vitalityInventory: Item[];
    spiritInventory: Item[];
    flexInventory: Item[];


    constructor(heroData: Partial<HeroAttributes> = {}) {
        const data = { ...defaultHeroAttributes, ...heroData };
        this.bulletDamage = data.bulletDamage!;
        this.bulletsPerShot = data.bulletsPerShot!;
        this.ammo = data.ammo!;
        this.bulletsPerSec = data.bulletsPerSec!;
        this.lightMelee = data.lightMelee!;
        this.heavyMelee = data.heavyMelee!;
        this.health = data.health!;
        this.healthRegen = data.healthRegen!;
        this.bulletResist = data.bulletResist!;
        this.spiritResist = data.spiritResist!;
        this.moveSpeed = data.moveSpeed!;
        this.sprintSpeed = data.sprintSpeed!;
        this.stamina = data.stamina!;
        this.abilityRange = data.abilityRange!;
        this.cooldownReduction = data.cooldownReduction!;
        this.spiritPower = data.spiritPower!;
        this.bulletLifesteal = data.bulletLifesteal!;
        this.spiritLifesteal = data.spiritLifesteal!;
        this.bulletShield = data.bulletShield!;
        this.spiritShield = data.spiritShield!;
        this.abilityPoints = data.abilityPoints!;
        this.spiritScaling = data.spiritScaling!;
        this.weaponInventory = data.weaponInventory!;
        this.vitalityInventory = data.vitalityInventory!;
        this.spiritInventory = data.spiritInventory!;
        this.flexInventory = data.flexInventory!;
    }
}