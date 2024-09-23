"use client"

import Link from "next/link";
import { Hero } from "../lib/Hero";
import { HeroAttributesMap } from "~/types/types";
import heroData from "~/heroes.json";
import { Sim } from "../lib/sim";
import SimComponent from "~/components/Sim";

export default function SimPage() {

  let hero1Name = "Abrams";
  let hero2Name = "Bebop";
  const heroes: HeroAttributesMap = heroData;

  //TODO: Take another look at this
  const heroA = heroes[hero1Name] ? new Hero(heroes[hero1Name]) : new Hero();
  const heroB = heroes[hero2Name] ? new Hero(heroes[hero2Name]) : new Hero();

    return (
        <main className="flex min-h-screen flex-col items-center text-white">
            <SimComponent heroAData={heroA} heroBData={heroB}/>
        </main>
    );
}
