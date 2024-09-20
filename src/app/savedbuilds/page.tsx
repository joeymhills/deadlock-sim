"use client"
import BuildCard from "~/components/buildCard";
import { getSavedBuilds, loadBuild } from "../lib/Builds";

export default function HomePage() {
  const buildNames: string[] = getSavedBuilds();

  return (
    <main className="flex min-h-screen flex-col items-center bg-black/90 text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/bg-deadlock.png)`,
            backgroundSize: 'cover', // Cover the entire div
            backgroundPosition: 'center', // Center the background image
          }} 
        >
      <div className="">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16"
            >
          <h1 className="text-2xl font-bold text-offwhite">Builds</h1>
          
          <div className="grid lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3 gap-4">
            {buildNames.map(name => {
                const build = loadBuild(name); // Call loadBuild once and store the result
                return build ? (
                <BuildCard key={name} buildName={name} hero={build} />
                ) : null; // Return null instead of an empty fragment for clarity
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
