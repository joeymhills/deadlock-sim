"use client"
import Link from "next/link";
import Card from "../../../components/hero-button";
import { ItemCard } from "~/components/itemCard";
import ItemCardMini from "~/components/ItemCardMini";
import heroData from "~/heroes.json";
import itemData from "~/items.json";
import { Action, HeroAttributes, HeroAttributesMap, Item, ItemMap } from "~/types/types";
import { Hero } from "~/app/lib/Hero";
import { useEffect, useState, useReducer, useRef } from "react";

const StatBox: React.FC<{ name: string; value: number }> = ({ name, value }) => {
  return (
    <div className="flex flex-col justify-start items-center">
      <div className="text-md text-center tracking-tight text-white">
        {value}
      </div>
      <div className="text-md text-center tracking-tight text-white">
        {name}
      </div>
    </div>
  );
};

function heroReducer(hero: Hero, action: Action): Hero {
  switch (action.type) {
    //Holds all major logic for stat changes to hero
    case 'UPDATE_STATS':
      
      if (hero.inventory.length === 0){
        return { ...hero, ...hero.base };
      }
      const newHero = {...hero}
      hero.inventory.forEach(item => {
        item.modifiers.forEach(modifier => {
          switch(modifier.modifier) {
            case "*":
              if (hero.bulletsPerSec) {
                newHero.bulletDamage = hero.base.bulletDamage * modifier.value
              }
              break;
            case "+":
              newHero.bulletDamage = hero.base.bulletDamage + modifier.value
              break;
            case "-":
              newHero.bulletDamage = hero.base.bulletDamage - modifier.value
              break;
          }
        })
      })
      return newHero;

    case 'TOGGLE_ITEM':
      if (action.item && hero.inventory?.includes(action.item)) {
        return {
          ...hero,
          inventory: hero.inventory?.filter(item => item !== action.item)
        };
      }
      if (action.item) {
          action.item = action.item as Item;
        if ((action.item && hero.inventory?.length || 0) < 4) {
          return {
            ...hero,
            inventory: [...hero.inventory || [], action.item]
          };
        }
      }
      return hero;
    default:
      return hero;
  }
}


export default function Page({ params }: { params: { heroId: string } }) {

  //Tracks if this is the first render, used use useEffects to avoid updating stats on first render
  const isFirstRender = useRef(true);

  let heroName = params.heroId;
  const heroes: HeroAttributesMap = heroData;

  //TODO: Take another look at this
  const baseStats = heroes[heroName] ? new Hero(heroes[heroName]) : new Hero(); // Use Hero constructor

  const [hero, setHero] = useReducer(heroReducer, baseStats);
  
  useEffect(()=> {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    console.log("use effect ran");
    setHero({type:'UPDATE_STATS', item: undefined})
  },[hero.inventory])
  
  const imgName = heroName.replace(/\s+/g, '-');
  
  //TODO: This function is BAD

  //Callback util function for adding the clicked item component to the list of items.
  /*
  const toggleItem = (temp: Item) => {
    if (hero.weaponInventory?.includes(temp)) {
      setHero(prevHero => ({
        ...prevHero,
        weaponInventory: prevHero.weaponInventory?.filter(item => item !== temp)
      }));
      return;
    }

    if ((hero.weaponInventory?.length || 0) < 4) {
      setHero(prevHero => ({
        ...prevHero,
        weaponInventory: [...prevHero.weaponInventory || [], temp]
      }));
    }
  };
  */

  const items: ItemMap = itemData;
  const [activeCategory, setActiveCategory] = useState<string>("weapon");

  return (
    <main className="flex min-h-screen flex-col items-center bg-darker text-white">
      
      {/* Container */}
      <div className="container flex flex-row items-center gap-3 px-4 py-6 pt-24">

        {/* Hero Attributes */}
        <div className="flex flex-row self-start items-center fixed top-0 left-0 w-full rounded-b-md bg-dark justify-center gap-4 px-2 py-2">

          <div>
            <div
              className="flex justify-end items-center h-20 w-20 rounded-lg"
              style={{
                backgroundImage: `url(/heroCards/${imgName}.png)`,
                backgroundSize: 'cover', // Cover the entire div
                backgroundPosition: 'center', // Center the background image
              }} 
            >
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <StatBox name="DPS" value={Math.floor(hero.bulletDamage * hero.bulletsPerSec * hero.bulletsPerShot)} />
            <StatBox name="Bullet Damage" value={hero.bulletDamage} />
            <StatBox name="Ammo" value={hero.ammo} />
            <StatBox name="Bullets Per Sec" value={hero.bulletsPerSec} />
            <StatBox name="Light Melee" value={hero.lightMelee} />
            <StatBox name="Heavy Melee" value={hero.heavyMelee} />
            <StatBox name="Health" value={hero.health} />
            <StatBox name="Health Regen" value={hero.healthRegen} />
            <StatBox name="Bullet Resist" value={hero.bulletResist} />
            <StatBox name="Spirit Resist" value={hero.spiritResist} />
            <StatBox name="Move Speed" value={hero.moveSpeed} />
            <StatBox name="Sprint Speed" value={hero.sprintSpeed} />
            <StatBox name="Stamina" value={hero.stamina} />
          </div>
        </div>

          <div className="flex flex-col items-center">

          {/* Category Tabs */}
            <div className="flex pb-3 gap-3">
              <div onClick={() => setActiveCategory("weapon")}
                className="flex font-bold text-black py-1 px-3 justify-center items-center h-10 w-32 rounded-md bg-weapon hover:cursor-pointer">
                Weapon
              </div>
              <div onClick={() => setActiveCategory("vitality")}
                className="flex font-bold text-black py-1 px-3 justify-center items-center h-10 w-32 rounded-md bg-vitality hover:cursor-pointer">
                Vitality
              </div>
              <div onClick={() => setActiveCategory("spirit")}
                className="flex font-bold text-black py-1 px-3 justify-center items-center h-10 w-32 rounded-md bg-spirit hover:cursor-pointer">
                Spirit
              </div>
              <div
                className="flex font-bold text-black py-1 px-3 justify-center items-center h-10 w-72 rounded-md bg-dark hover:cursor-pointer">
                <img className='h-5' src="/souls.png"></img>
                  <input placeholder="500" className="border border-gray rounded-md"></input>
              </div>
            </div>

            {/* Item Shop */}

            {/* Tier 1 */} 
            <div className={`grid grid-cols-9 p-5 bg-${activeCategory}-bg-1 rounded-t-xl gap-4`}>
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
            <div className={`grid grid-cols-9 p-5 bg-${activeCategory}-bg-2 gap-4`}>
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
            <div className={`grid grid-cols-9 p-5 bg-${activeCategory}-bg-1 gap-4`}>
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
            <div className={`grid grid-cols-9 p-5 bg-${activeCategory}-bg-2 gap-4 rounded-b-xl`}>
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
          
          <div className="flex flex-col gap-4 items-center bg-dark rounded-xl p-7">
            
            <div className="grid grid-cols-2 gap-4">
              {hero.inventory?.filter(item => item.category == "Weapon").map((item, index) => (
                <ItemCardMini
                  key={index}
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
                <div key={`empty-${i}`} className="h-16 w-16 bg-black rounded-xl" />
              ));
            })()}
          </div>

            <div className="grid grid-cols-2 gap-2">
              {hero.inventory?.filter(item => item.category == "Vitality").map((item, index) => (
                <ItemCardMini
                  key={index}
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
                <div key={`empty-${i}`} className="h-16 w-16 bg-black rounded-xl" />
              ));
            })()}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {hero.inventory?.filter(item => item.category == "Spirit").map((item, index) => (
                <ItemCardMini
                  key={index}
                  name={`${item.name}`}
                  toggleItem={setHero}
                  item={items[item.name] as Item}
                />
              ))}

            {/* Render empty item slots to fill up to 4 */}
            {(() => {
              const itemCount = hero.inventory.filter(item => item.category == "Spirit").length || 0;
              const emptySlotsCount = Math.max(4 - itemCount, 0);
              
              return Array.from({ length: emptySlotsCount }).map((_, i) => (
                <div key={`empty-${i}`} className="h-16 w-16 bg-black rounded-xl" />
              ));
            })()}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {hero.flexInventory?.map((item, index) => (
                <ItemCardMini
                  key={index}
                  name={`${item.name}`}
                  toggleItem={setHero}
                  item={items[item.name] as Item}
                />
              ))}

            {/* Render empty item slots to fill up to 4 */}
            {(() => {
              const itemCount = hero.flexInventory?.length || 0;
              const emptySlotsCount = Math.max(4 - itemCount, 0);
              
              return Array.from({ length: emptySlotsCount }).map((_, i) => (
                <div key={`empty-${i}`} className="h-16 w-16 bg-black rounded-xl" />
              ));
            })()}
            </div>
          </div>
      </div>
    </main>
  );
}
