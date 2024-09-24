"use client"
import BuildCard from "~/components/BuildCard";
import { getSavedBuilds, loadBuild } from "../lib/Builds";

export default function HomePage() {
  const buildNames: string[] = getSavedBuilds();

  return (
    <main className="flex min-h-screen flex-col items-center text-white animate-fadeIn">
      <div className="">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16">
          <div className="grid lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3 gap-4">
            {buildNames.map(name => {
                const build = loadBuild(name); // Call loadBuild once and store the result
                return build ? (
                <BuildCard key={name} buildName={name} hero={build} />
                ) : null; // Return null instead of an empty fragment for clarity
            })}
          </div>
          {buildNames.length < 1 ? (
          <div className="flex justify-center items-center text-2xl">You haven't created any builds yet!<a href="/" className="pl-2 underline">Start here</a></div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
