interface Passive {
    health: number;
}

interface Active {
    hasActive: boolean;
    duration: number;
}

export interface ItemProps {
    name: string;
    category: string;
    moveSpeed?: number;
    sprintSpeed?: number;
    stamina?: number;
    abilityRange?: number;
    cooldownReduction?: number;
    health?: number;
    healthRegen?: number;
    ammo?: number;
    bulletDamage?: number;
    bulletsPerSec?: number;
    lightMelee?: number;
    heavyMelee?: number;
    spiritPower?: number;
    bulletLifesteal?: number;
    spiritLifesteal?: number;
    bulletVelocity?: number;
    bulletShield?: number;
    spiritShield?: number;
    bulletResist?: number;
    spiritResist?: number;
    //add applied debufs
    //figure out active ability
}
