import Link from "next/link";
import { Hero } from "../lib/Hero";
import { HeroAttributesMap } from "~/types/types";
import heroData from "~/heroes.json";
import { Sim } from "../lib/sim";

export default function HomePage() {

  let hero1Name = "Abrams";
  let hero2Name = "Bebop";
  const heroes: HeroAttributesMap = heroData;

  //TODO: Take another look at this
  const hero1 = heroes[hero1Name] ? new Hero(heroes[hero1Name]) : new Hero();
  const hero2 = heroes[hero2Name] ? new Hero(heroes[hero2Name]) : new Hero();
  let sim = new Sim(hero1, hero2);
  let heroTuple: [Hero, Hero] = sim.run();

    return (
        <main className="flex min-h-screen flex-col items-center bg-black/90 text-white"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/bg-deadlock.png)`,
                backgroundSize: 'cover', // Cover the entire div
                backgroundPosition: 'center', // Center the background image
            }}
        >
            <div className="">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
                    <div>
                        {heroTuple[0].health}
                    </div>
                    <div>
                        {heroTuple[1].health}
                    </div>
                </div>
            </div>
        </main>
    );
}
