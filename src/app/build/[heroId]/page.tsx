"use client"
import Link from "next/link";
import Card from "../../../components/HeroCard";
import { ItemCard } from "~/components/ItemCard";
import ItemCardMini from "~/components/ItemCardMini";
import heroData from "~/heroes.json";
import itemData from "~/items.json";
import { Action, HeroAttributes, HeroAttributesMap, Item, ItemMap, DamageType, StatType } from "~/types/types";
import { Hero } from "~/app/lib/Hero";
import { useEffect, useState, useReducer, useRef } from "react";
import { getImageName } from "~/utils";
import { getSavedBuilds, loadBuild, saveBuild } from "~/app/lib/Builds";

const StatBox: React.FC<{ name: string; value: number; icon: string }> = ({ name, value, icon }) => {
  return (
    <div className="flex flex-col justify-start items-center w-10">
      <div className="text-md text-center tracking-tight text-white">
        {Math.round(value)}
      </div>
      <div className="text-sm text-center tracking-tight text-white">
        {/* TODO: Removing the text leads to a much cleaner interface */}
      </div>
      <img className="h-4" src={`/${icon}.png`}/>
    </div>
  );
};

//Function for applying item modifiers to hero
function applyStats( hero: Hero, modifier: HeroAttributes): Hero {
  hero.bulletDamage = hero.base.bulletDamage * modifier.bulletDamage;
  hero.ammo = hero.base.ammo * modifier.ammo;
  hero.health = hero.base.health * modifier.health;
  hero.bonusHealth = hero.base.bonusHealth + modifier.bonusHealth;
  hero.healthRegen = hero.base.healthRegen + modifier.healthRegen;
  hero.bulletResist = hero.base.bulletResist * modifier.bulletResist;
  hero.spiritResist = hero.base.spiritResist * modifier.spiritResist;
  hero.moveSpeed = hero.base.moveSpeed + modifier.moveSpeed;
  hero.sprintSpeed = hero.base.sprintSpeed + modifier.sprintSpeed;
  hero.stamina = hero.base.stamina + modifier.stamina;
  hero.abilityRange = hero.base.abilityRange * modifier.abilityRange;
  hero.cooldownReduction = hero.base.cooldownReduction * modifier.cooldownReduction;
  //TODO: this may need some attention eventually
  hero.bulletLifesteal = hero.base.bulletLifesteal * modifier.bulletLifesteal;
  hero.spiritLifesteal = hero.base.spiritLifesteal * modifier.spiritLifesteal;
  hero.bulletShield = hero.base.bulletShield + modifier.bulletShield;
  hero.spiritShield = hero.base.spiritShield + modifier.spiritShield;

  return hero;
}

function heroReducer(hero: Hero, action: Action): Hero {
  switch (action.type) {
    //Holds all major logic for stat changes to hero
    case 'UPDATE_STATS':
      
      if (hero.inventory.length === 0){
        return { ...hero, ...hero.base };
      }

      const newHero = {...hero};

      let modifiers: HeroAttributes = {
          name: "",
          bulletDamage: 1,
          bulletsPerShot: 0,
          ammo: 1,
          bulletsPerSec: 1,
          lightMelee: 0,
          heavyMelee: 0,
          health: 1,
          bonusHealth: 0,
          healthRegen: 0,
          bulletResist: 1,
          spiritResist: 1,
          moveSpeed: 0,
          sprintSpeed: 0,
          stamina: 0,
          abilityRange: 1,
          cooldownReduction: 1,
          bulletLifesteal: 1,
          spiritLifesteal: 1,
          bulletShield: 0,
          spiritShield: 0,

          abilityPoints: 0,
          spiritPower: 0,
          spiritScaling: ["default", 0],
          inventory: [],
          bulletDamagePerLevel: 0,
          meleeDamagePerLevel: 0,
          healthPerLevel: 0,
          flexSlots: 0,
      };
      // Iterates through items and accumulates the modifiers into a single object
      hero.inventory.forEach(item => {
        item.modifiers.forEach(modifier => {
          const stat = modifier.stat;
          switch(modifier.modifier) {
            case "+":
              modifiers[stat] += modifier.value
              break;
            case "-":
              modifiers[stat] -= modifier.value
              break;
          }
        })
      })
      
      const returnHero = applyStats(newHero, modifiers);

      return returnHero;

    case 'TOGGLE_ITEM':
      if (action.item && hero.inventory?.includes(action.item)) {
        return {
          ...hero,
          inventory: hero.inventory?.filter(item => item !== action.item)
        };
      }

      if (action.item) {
        action.item = action.item as Item;
        const category = action.item.category;
        if ((hero.inventory?.filter(item => item.category == category).length || 0) < 4) {
          return {
            ...hero,
            inventory: [...hero.inventory || [], action.item]
          };
        } else {
          return hero;
        }
      }
      return hero;
    case 'SUBTRACT_ABILITY_POINT':
      if (hero.abilityPoints > 0) {
        return{
          ...hero,
          abilityPoints: hero.abilityPoints - 1
        }
      }

      else {
        return hero;
      }
    case 'ADD_ABILITY_POINT':
      return{
        ...hero,
        abilityPoints: hero.abilityPoints + 1
      }
    default:
      return hero;
  }
}


export default function Page({ params }: { params: { heroId: string } }) {

  //Tracks if this is the first render, used use useEffects to avoid updating stats on first render
  const isFirstRender = useRef(true);

  let heroName = decodeURIComponent(params.heroId);
  const heroes: HeroAttributesMap = heroData;



  const buildNames: string[] = getSavedBuilds() as string[];
  
  const [heroList, setHeroList] = useState<Hero[]>([]);

  const addBuild = (buildName: string) => {
      setHeroList((heroList) => [...heroList, new Hero(loadBuild(buildName))])
  }

  //TODO: Take another look at this
  const baseStats = heroes[heroName] ? new Hero(heroes[heroName]) : new Hero(); // Use Hero constructor

  const [hero, setHero] = useReducer(heroReducer, baseStats);
  const [totalCost, setTotalCost]  = useState(0);
  const [buildName, setBuildName] = useState<string>("");

  useEffect(()=> {
    
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setHero({type:'UPDATE_STATS', item: undefined})

    if (hero.inventory.length > 0) {
      setTotalCost(() => hero.inventory.map(item => {return item.cost;}).reduce((acc, curr) => acc + curr));
    } else {
      setTotalCost(0);
    }

  },[hero.inventory])
  
  const imgName = heroName.replace(/\s+/g, '-');
  
  const items = itemData;

  const [activeCategory, setActiveCategory] = useState<string>("weapon");

  return (
    <main className="flex min-h-screen flex-col items-center text-white">
      {/* Container */}
      <div className="flex flex-row justify-start items-start gap-2 pt-16 animate-fadeIn">
          {/* Hero Attributes */}
          <div className="flex flex-col gap-2 w-40">
            <div className="w-full flex flex-col self-start items-center rounded-md bg-dark justify-center gap-1 p-1">
              <div>
                <img className="h-44 rounded-md" src={`/heroCards/${getImageName(hero.name)}`} />
              </div>
              <div className="p-1 flex flex-col justify-center items-center gap-2">
                <input
                  value={buildName}
                  onChange={e => setBuildName(e.target.value)}
                  placeholder=" Enter build name" className="text-sm rounded-md text-black h-6 w-36"
                  ></input>
                  <button onClick={() => saveBuild(hero, buildName)} className="text-black text-md w-36 bg-offwhite hover:bg-opacity-70 rounded-md">Save Build</button>
              </div>
              </div>
            <div className="w-full flex flex-col self-start items-center rounded-md bg-dark justify-center gap-4 p-2">
              <div className="grid grid-cols-2 gap-2">
                <StatBox name="DPS" value={Math.floor(hero.bulletDamage * hero.bulletsPerSec * hero.bulletsPerShot)} icon="Damage_Per_Sec" />
                <StatBox name="Bullet Damage" value={hero.bulletDamage} icon="Bullet_damage"/>
                <StatBox name="Ammo" value={hero.ammo} icon="Ammo"/>
                <StatBox name="Bullets Per Sec" value={hero.bulletsPerSec} icon="Bullets_Per_Sec"/>
                <StatBox name="Light Melee" value={hero.lightMelee} icon="Melee_damage"/>
                <StatBox name="Heavy Melee" value={hero.heavyMelee} icon="Melee_damage"/>
                <StatBox name="Health" value={hero.health + hero.bonusHealth} icon="Health"/>
                <StatBox name="Health Regen" value={hero.healthRegen} icon="Health_Regen"/>
                <StatBox name="Bullet Resist" value={hero.bulletResist} icon="Bullet_Armor"/>
                <StatBox name="Spirit Resist" value={hero.spiritResist} icon="Spirit_Armor"/>
                <StatBox name="Move Speed" value={hero.moveSpeed} icon="Move_speed"/>
                <StatBox name="Sprint Speed" value={hero.sprintSpeed} icon="Move_speed"/>
                <StatBox name="Stamina" value={hero.stamina} icon="Stamina"/>
              </div>
            </div>
          </div>
          
          {/* Item Shop*/} 
          <div className="flex flex-col items-center">
            {/* Category Tabs */}
            <div className={`flex w-full bg-${activeCategory}-bg-1 rounded-t-xl justify-center pt-1 gap-3`}>
              <div onClick={() => setActiveCategory("weapon")}
                className="flex font-bold text-black py-1 px-3 gap-1 justify-center items-center h-8 w-32 rounded-md bg-weapon hover:shadow-lg hover:cursor-pointer">
                <img className="w-5" src="/Weapon.png"></img>
                Weapon
              </div>
              <div onClick={() => setActiveCategory("vitality")}
                className="flex font-bold text-black py-1 px-3 gap-1 justify-center items-center h-8 w-32 rounded-md hover:shadow-lg bg-vitality hover:cursor-pointer">
                <img className="w-5" src="/Vitality.png"></img>
                Vitality
              </div>
              <div onClick={() => setActiveCategory("spirit")}
                className="flex font-bold text-black py-1 px-3 gap-1 justify-center items-center h-8 w-32 rounded-md hover:shadow-lg bg-spirit hover:cursor-pointer">
                <img className="w-5" src="/Spirit.png"></img>
                Spirit
              </div>
            </div>

            {/* Tier 1 */} 
            <div className={`grid grid-cols-10 p-2 bg-${activeCategory}-bg-1 gap-2`}>
              <div className='flex flex-row justify-center items-center row-span-2 font-bold text-souls -rotate-90 gap-2'><img className='h-5' src="/souls.png"></img>500</div>
                {items && Object.entries(items).map(([key, item]) => {
                  if (item.tier === 1 && item.category.toLowerCase() == activeCategory) {
                    return (
                      <ItemCard
                        key={key}
                        toggleItem={setHero}
                        item={item as Item}
                      />
                    );
                  }
                  return null;
                })}
            </div>
            
            {/* Tier 2 */} 
            <div className={`grid grid-cols-10 p-2 bg-${activeCategory}-bg-2 gap-2`}>
            <div className='flex flex-row justify-center items-center row-span-2 font-bold gap-2 text-souls -rotate-90 gap-2'><img className='h-5' src="/souls.png"></img>1,250+</div>
              {items && Object.entries(items).map(([key, item]) => {
                if (item.tier === 2 && item.category.toLowerCase() == activeCategory) {
                  return (
                    <ItemCard
                      key={key}
                      toggleItem={setHero}
                      item={item as Item}
                    />
                  );
                }
                return null;
              })}
            </div>

            {/* Tier 3 */} 
            <div className={`grid grid-cols-10 p-2 bg-${activeCategory}-bg-1 gap-2`}>
            <div className='flex flex-row justify-center items-center font-bold row-span-2 gap-2 text-souls -rotate-90 gap-2'><img className='h-5' src="/souls.png"></img>3,000+</div>
              {items && Object.entries(items).map(([key, item]) => {
                if (item.tier === 3 && item.category.toLowerCase() == activeCategory) {
                  return (
                    <ItemCard
                      key={key}
                      toggleItem={setHero}
                      item={item as Item}
                    />
                  );
                }
                return null;
              })}
            </div>

            {/* Tier 4 */} 
            <div className={`grid grid-cols-10 p-2 bg-${activeCategory}-bg-2 gap-2 rounded-b-xl`}>
            <div className='flex flex-row justify-center items-center font-bold gap-2 row-span-2 text-souls -rotate-90 gap-2'><img className='h-5' src="/souls.png"></img>6,300+</div>
              {items && Object.entries(items).map(([key, item]) => {
                if (item.tier === 4 && item.category.toLowerCase() == activeCategory) {
                  return (
                    <ItemCard
                      key={key}
                      toggleItem={setHero}
                      item={item as Item}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>

        {/* Item Inventory */}
          <div className="flex flex-col gap-4 items-center bg-dark rounded-md p-3">
            
            <div className="flex gap-1 font-bold text-souls py-1 px-3 justify-center items-center h-6 w-32 rounded-md">
              <img className='h-5' src="/souls.png"></img>
              {totalCost}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {hero.inventory?.filter(item => item.category == "Weapon").map((item, index) => (
                <ItemCardMini
                  key={item.name}
                  name={`${item.name}`}
                  toggleItem={setHero}
                  item={items[item.name] as Item}
                />
              ))}

            {/* Render empty item slots to fill up to 4 */}
            {(() => {
              const itemCount = hero.inventory.filter(item => item.category == "Weapon").length || 0;
              const emptySlotsCount = Math.max(4 - itemCount, 0);
              
              return Array.from({ length: emptySlotsCount }).map((_, i) => (
                <div key={`empty-${i}`} className="h-14 w-14 bg-black rounded-md" />
              ));
            })()}
          </div>

            <div className="grid grid-cols-2 gap-2">
              {hero.inventory?.filter(item => item.category == "Vitality").map((item, index) => (
                <ItemCardMini
                  key={item.name}
                  name={`${item.name}`}
                  toggleItem={setHero}
                  item={items[item.name] as Item}
                />
              ))}

            {/* Render empty item slots to fill up to 4 */}
            {(() => {
              const itemCount = hero.inventory.filter(item => item.category == "Vitality").length || 0;
              const emptySlotsCount = Math.max(4 - itemCount, 0);
              
              return Array.from({ length: emptySlotsCount }).map((_, i) => (
                <div key={`empty-${i}`} className="h-14 w-14 bg-black rounded-md" />
              ));
            })()}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {hero.inventory?.filter(item => item.category == "Spirit").map((item, index) => (
                <ItemCardMini
                  key={item.name}
                  name={`${item.name}`}
                  toggleItem={setHero}
                  item={items[item.name] as Item}
                />
              ))}

            {/* Render empty item slots to fill up to 4 */}
            {(() => {
              const itemCount = hero.inventory.filter(item => (item.category == "Spirit" && (!item.isFlex))).length || 0;
              const emptySlotsCount = Math.max(4 - itemCount, 0);
              
              return Array.from({ length: emptySlotsCount }).map((_, i) => (
                <div key={`empty-${i}`} className="h-14 w-14 bg-black rounded-md" />
              ));
            })()}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {hero.inventory?.filter(item => item.isFlex == true).map((item, index) => (
                <ItemCardMini
                  key={item.name}
                  name={`${item.name}`}
                  toggleItem={setHero}
                  item={items[item.name] as Item}
                />
              ))}

            {/* Render empty item slots to fill up to 4 */}
            {(() => {
              const itemCount = hero.inventory.filter(item => item?.isFlex == true).length || 0;
              const emptySlotsCount = Math.max(4 - itemCount, 0);
              
              return Array.from({ length: emptySlotsCount }).map((_, i) => (
                <div key={`empty-${i}`} className="h-14 w-14 bg-black rounded-md" />
              ));
            })()}
            </div>
          </div>
          
      </div>
      {/* TODO: I wish I didn't have to do this, but Tailwind keeps purging these styles because these styles are created at compile time */}
      <div className="hidden bg-weapon-bg-1 bg-weapon-bg-2 bg-vitality-bg-1 bg-vitality-bg-2 bg-spirit-bg-1 bg-spirit-bg-2"></ div>
    </main>
  );
}