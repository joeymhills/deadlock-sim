"use client"
import Link from "next/link";
import Card from "../../../components/hero-button";
import { ItemCard } from "~/components/itemCard";
import ItemCardMini from "~/components/ItemCardMini";
import heroData from "~/heroes.json";
import itemData from "~/items.json";
import { HeroAttributes, HeroAttributesMap, Item, ItemMap } from "~/types/types";
import { Hero } from "~/app/lib/Hero";
import { useState } from "react";

const StatBox: React.FC<{ name: string; value: number }> = ({ name, value }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-md tracking-tight text-white">
        {value}
      </div>
      <div className="text-md tracking-tight text-white">
        {name}
      </div>
    </div>
  );
};

export default function Page({ params }: { params: { heroId: string } }) {

  let heroName = params.heroId;
  const heroes: HeroAttributesMap = heroData;
  const items: ItemMap = itemData;
  //let hero = new Hero(heroes[heroName]);

  //TODO: This is a type assertion and is unsafe, fix at some point.
  const [hero, setHero] = useState<Hero>(heroes[heroName] as Hero);

  //TODO: This function is BAD
  //Callback util function for adding the clicked item component to the list of items.
  const toggleItem = (temp: Item) => {
    if (hero.weaponInventory?.includes(temp)) {
      setHero(prevHero => ({
        ...prevHero,
        weaponInventory: prevHero.weaponInventory?.filter(item => item !== temp)
      }));
      return;
    }
    setHero(prevHero => ({
      ...prevHero,
      weaponInventory: [...prevHero.weaponInventory || [], temp]
    }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-darker text-white">
      <div className="container grid grid-cols-12 items-center gap-8 px-4 py-16">

        {/* Hero Attributes */}
        <div className="flex flex-col row-span-2 col-span-3 items-center rounded-xl bg-dark justify-center gap-12 px-4 py-16">

          <Card name={heroName} />

          <div className="flex flex-col items-center bg-darker rounded-xl p-7">
            <h2 className="text-lg pb-5 font-bold tracking-tight text-white sm:text-[2rem]">Weapon</h2>
            <div className="grid grid-cols-2 gap-4">
              <StatBox name="DPS" value={Math.floor(hero.bulletDamage * hero.bulletsPerSec * hero.bulletsPerShot)} />
              <StatBox name="Bullet Damage" value={hero.bulletDamage} />
              <StatBox name="Ammo" value={hero.ammo} />
              <StatBox name="Bullets Per Sec" value={hero.bulletsPerSec} />
              <StatBox name="Light Melee" value={hero.lightMelee} />
              <StatBox name="Heavy Melee" value={hero.heavyMelee} />
            </div>
          </div>

          <div className="flex flex-col items-center bg-darker rounded-xl p-7">
            <h2 className="text-lg pb-5 font-bold tracking-tight text-white sm:text-[2rem]">Vitality</h2>
            <div className="grid grid-cols-2 gap-10">
              <StatBox name="Health" value={hero.health} />
              <StatBox name="Health Regen" value={hero.healthRegen} />
              <StatBox name="Bullet Resist" value={hero.bulletResist} />
              <StatBox name="Spirit Resist" value={hero.spiritResist} />
              <StatBox name="Move Speed" value={hero.moveSpeed} />
              <StatBox name="Sprint Speed" value={hero.sprintSpeed} />
              <StatBox name="Stamina" value={hero.stamina} />
            </div>
          </div>
        </div>

        {/* Item Shop */}
        {/* Weapon Items */}
          <div className="flex flex-col col-span-9 items-center">
            <h2 className="text-lg pb-5 font-bold tracking-tight text-white sm:text-[2rem]">Weapon</h2>
            {/* Tier 1 */} 
            <div className="grid grid-cols-9 p-5 bg-weapon-bg-1 rounded-t-xl gap-4">
            <div className='flex flex-row justify-center items-center gap-4 text-souls'><img className='h-5' src="/souls.png"></img>500</div>
              <ItemCardMini toggleItem={toggleItem} item={items["Basic Magazine"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
            </div>
            
            {/* Tier 2 */} 
            <div className="grid grid-cols-9 p-5 bg-weapon-bg-2 gap-4">
            <div className='flex flex-row justify-center items-center gap-2 text-souls'><img className='h-5' src="/souls.png"></img>1,250+</div>
              <ItemCardMini toggleItem={toggleItem} item={items["Basic Magazine"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
            </div>

            {/* Tier 3 */} 
            <div className="grid grid-cols-9 p-5 bg-weapon-bg-1 gap-4">
            <div className='flex flex-row justify-center items-center gap-2 text-souls'><img className='h-5' src="/souls.png"></img>3,000+</div>
              <ItemCardMini toggleItem={toggleItem} item={items["Basic Magazine"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
            </div>

            {/* Tier 4 */} 
            <div className="grid grid-cols-9 p-5 bg-weapon-bg-2 gap-4 rounded-b-xl">
            <div className='flex flex-row justify-center items-center gap-2 text-souls'><img className='h-5' src="/souls.png"></img>6,300+</div>
              <ItemCardMini toggleItem={toggleItem} item={items["Basic Magazine"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
              <ItemCardMini toggleItem={toggleItem} item={items["Close Quarters"] as Item} />
            </div>
          </div>

        {/* Item Inventory */}
          
          <div className="flex flex-row justify-center items-center gap-6 col-span-9 items-center bg-dark rounded-xl p-7">
            
            <div className="grid grid-cols-2 gap-4">
              {hero.weaponInventory?.map((item, index) => (
                <ItemCardMini
                  key={index}
                  name={`${item.name}`}
                  toggleItem={toggleItem}
                  item={items[item.name] as Item}
                />
              ))}

            {/* Render empty item slots to fill up to 4 */}
            {(() => {
              const itemCount = hero.weaponInventory?.length || 0;
              console.log('Item Count:', itemCount);

              const emptySlotsCount = Math.max(4 - itemCount, 0);
              console.log('Empty Slots Count:', emptySlotsCount);
              
              return Array.from({ length: emptySlotsCount }).map((_, i) => (
                <div key={`empty-${i}`} className="h-28 w-24 bg-black rounded-xl" />
              ));
            })()}
          </div>

            <div className="grid grid-cols-2 gap-4">
              {hero.vitalityInventory?.map((item, index) => (
                <ItemCardMini
                  key={index}
                  name={`${item.name}`}
                  toggleItem={toggleItem}
                  item={items[item.name] as Item}
                />
              ))}

            {/* Render empty item slots to fill up to 4 */}
            {(() => {
              const itemCount = hero.vitalityInventory?.length || 0;
              console.log('Item Count:', itemCount);

              const emptySlotsCount = Math.max(4 - itemCount, 0);
              console.log('Empty Slots Count:', emptySlotsCount);
              
              return Array.from({ length: emptySlotsCount }).map((_, i) => (
                <div key={`empty-${i}`} className="h-28 w-24 bg-black rounded-xl" />
              ));
            })()}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {hero.spiritInventory?.map((item, index) => (
                <ItemCardMini
                  key={index}
                  name={`${item.name}`}
                  toggleItem={toggleItem}
                  item={items[item.name] as Item}
                />
              ))}

            {/* Render empty item slots to fill up to 4 */}
            {(() => {
              const itemCount = hero.spiritInventory?.length || 0;
              console.log('Item Count:', itemCount);

              const emptySlotsCount = Math.max(4 - itemCount, 0);
              console.log('Empty Slots Count:', emptySlotsCount);
              
              return Array.from({ length: emptySlotsCount }).map((_, i) => (
                <div key={`empty-${i}`} className="h-28 w-24 bg-black rounded-xl" />
              ));
            })()}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {hero.flexInventory?.map((item, index) => (
                <ItemCardMini
                  key={index}
                  name={`${item.name}`}
                  toggleItem={toggleItem}
                  item={items[item.name] as Item}
                />
              ))}

            {/* Render empty item slots to fill up to 4 */}
            {(() => {
              const itemCount = hero.flexInventory?.length || 0;
              console.log('Item Count:', itemCount);

              const emptySlotsCount = Math.max(4 - itemCount, 0);
              console.log('Empty Slots Count:', emptySlotsCount);
              
              return Array.from({ length: emptySlotsCount }).map((_, i) => (
                <div key={`empty-${i}`} className="h-28 w-24 bg-black rounded-xl" />
              ));
            })()}
            </div>
          </div>
      </div>
    </main>
  );
}
