"use client"

import Link from "next/link";
import { Hero } from "../lib/Hero";
import { HeroAttributesMap } from "~/types/types";
import heroData from "~/heroes.json";
import SimComponent from "~/components/Sim";
import { getSavedBuilds, loadBuild } from "../lib/Builds";
import { useState, useEffect } from "react";

export default function SimPage() {

    const heroes: HeroAttributesMap = heroData;
    const buildNames: string[] = getSavedBuilds() as string[];
    const [heroList, setHeroList] = useState<Hero[]>([]);

    const addBuild = (buildName: string) => {
        setHeroList((heroList) => [...heroList, new Hero(loadBuild(buildName))])
    }

    return (
        <main className="flex min-h-screen flex-col justify-center items-center text-white">
            {heroList.length < 2 ? (
                <div>
                    {buildNames?.map(build => (
                        <div onClick={() => addBuild(build)}>{build}</div>
                    )
                    )}
                </div>
            ) : (
                <div>
                    {heroList.length == 2 ? (
                        <SimComponent heroAData={heroList[0] as Hero} heroBData={heroList[1] as Hero} />
                    ) : <div></div>
                    }
                </ div>
            )}
        </main>
    );
}
