"use client"

import Link from "next/link";
import { Hero } from "../lib/Hero";
import { HeroAttributesMap } from "~/types/types";
import heroData from "~/heroes.json";
import SimComponent from "~/components/Sim";
import { getSavedBuilds, loadBuild } from "../lib/Builds";
import { useState, useEffect } from "react";
import BuildCard from "~/components/BuildCard";

export default function SimPage() {

    const heroes: HeroAttributesMap = heroData;
    const buildNames: string[] = getSavedBuilds() as string[];
    
    const [heroList, setHeroList] = useState<Hero[]>([]);

    const addBuild = (buildName: string) => {
        setHeroList((heroList) => [...heroList, new Hero(loadBuild(buildName))])
    }

    return (
        <main className="min-h-screen w-full text-offwhite">
            <div className="flex flex-col gap-2 items-center pt-16">
                <h1 className="text-3xl">Select your builds</h1>
                <a onClick={()=> setHeroList([])} className="text-black bg-offwhite p-1 rounded-md shadow-xl hover:cursor-pointer hover:bg-opacity-80">Reset Selections</a>
                {heroList.length < 2 ? (
                    <div className="flex flex-row gap-5 animate-fadeIn">
                        {buildNames?.map(build => (
                            <div onClick={() => addBuild(build)}>
                                <BuildCard buildName={build} hero={loadBuild(build) as Hero} />
                            </div>
                        )
                        )}
                    </div>
                ) : (
                    <div>
                        {heroList.length == 2 ? (
                            <div className="animate-fadeIn">
                                <SimComponent heroAData={heroList[0] as Hero} heroBData={heroList[1] as Hero} />
                            </div>
                        ) : <div></div>
                        }
                    </ div>
                )}
            </div>
        </main>
    );
}
