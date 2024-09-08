import React from 'react';
import { Item, Modifiers, ModifierTuple, ModifierOperation, ItemComponentProps } from '~/types/types'; // Adjust path as necessary
import { displayModifier } from '~/app/utils';

export const ItemCard: React.FC<ItemComponentProps> = ({ item, addItem }) => {
    const { category, cost, modifiers, passives, actives } = item;
    const imgName = "/items/" + category + "/" + item.name.replace(/\s+/g, '-') + ".png";
    
    return (
        <div onClick={() => addItem(item.name)} className={`flex flex-col justify-center items-center p-5 rounded-xl bg-${category.toLowerCase()}`}>
            <div className='flex flex-row justify-center items-center '><img className='h-5' src="/souls.png"></img>{cost}</div>
            <h1>{item.name}</h1>
            <img src={imgName}></img>
            <ul>
                {/* Modifiers */}

                {modifiers?.moveSpeed && <li>Move Speed: {displayModifier(modifiers.moveSpeed)}</li>}
                {modifiers?.sprintSpeed && <li>Sprint Speed: {displayModifier(modifiers.sprintSpeed)}</li>}
                {modifiers?.stamina && <li>Stamina: {displayModifier(modifiers.stamina)}</li>}
                {modifiers?.abilityRange && <li>Ability Range: {displayModifier(modifiers.abilityRange)}</li>}
                {modifiers?.cooldownReduction && <li>Cooldown Reduction: {displayModifier(modifiers.cooldownReduction)}</li>}
                {modifiers?.health && <li>Health: {modifiers.health[0]} {modifiers.health[1]}</li>}
                {modifiers?.healthRegen && <li>Health Regen: {modifiers.healthRegen[0]} {modifiers.healthRegen[1]}</li>}
                {modifiers?.ammo && <li>Ammo: {modifiers.ammo[0]} {modifiers.ammo[1]}</li>}
                {modifiers?.bulletDamage && <li>Weapon Damage: {modifiers.bulletDamage[0]} {modifiers.bulletDamage[1]}</li>}
                {modifiers?.spiritPower && <li>Spirit Power: {modifiers.spiritPower[0]} {modifiers.spiritPower[1]}</li>}
                {modifiers?.bulletLifesteal && <li>Bullet Lifesteal: {modifiers.bulletLifesteal[0]} {modifiers.bulletLifesteal[1]}</li>}
                {modifiers?.spiritLifesteal && <li>Spirit Lifesteal: {modifiers.spiritLifesteal[0]} {modifiers.spiritLifesteal[1]}</li>}
                {modifiers?.bulletsPerSec && <li>Fire Rate: {modifiers.bulletsPerSec[0]} {modifiers.bulletsPerSec[1]}</li>}
                {modifiers?.bulletVelocity && <li>Bullet Velocity: {modifiers.bulletVelocity[0]} {modifiers.bulletVelocity[1]}</li>}
                {modifiers?.bulletShield && <li>Bullet Shield: {modifiers.bulletShield[0]} {modifiers.bulletShield[1]}</li>}
                {modifiers?.spiritShield && <li>Spirit Shield: {modifiers.spiritShield[0]} {modifiers.spiritShield[1]}</li>}
                {modifiers?.bulletResist && <li>Bullet Resist: {modifiers.bulletResist[0]} {modifiers.bulletResist[1]}</li>}
                {modifiers?.spiritResist && <li>Spirit Resist: {modifiers.spiritResist[0]} {modifiers.spiritResist[1]}</li>}

                {/* Passives */}
                {passives && (
                    <>
                        {passives?.cooldown && <li>Cooldown: {passives.cooldown}</li>}
                        {passives?.cooldown && <li>Duration: {passives.duration}</li>}
                        {passives?.moveSpeed && <li>Move Speed (Passive): {passives.moveSpeed[0]} {passives.moveSpeed[1]}</li>}
                        {/* Add other passives as needed */}
                    </>
                )}

                {/* Actives */}
                {actives && (
                    <>
                        {actives?.cooldown && <li>Cooldown: {actives.cooldown}</li>}
                        {actives?.duration && <li>Duration: {actives.duration}</li>}
                        {actives?.radius && <li>Radius: {actives.radius}</li>}
                        {actives?.range && <li>Range: {actives.range}</li>}
                    </>
                )}
            </ul>
        </div>
    );
};

export default ItemCard;
