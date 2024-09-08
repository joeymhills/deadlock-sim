import Link from "next/link";
import Card from "../components/hero-button";

export default function HomePage() {

  const heroes = [
    "Abrams", "Bebop", "Dynamo", "Grey Talon", "Haze", "Infernus", 
    "Ivy", "Kelvin", "Lady Geist", "Lash", "McGinnis", "Mo & Krill",
    "Paradox", "Pocket", "Seven", "Shiv", "Vindicta", "Viscous", 
    "Warden", "Wraith", "Yamato"
  ];

  return (
    <main className="flex min-h-screen flex-col items-center bg-darker text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Select a <span className="text-accent">Hero</span>
        </h1>
        <div className="grid lg:grid-cols-7 gap-4 md:grid-cols-5 sm:grid-cols-3 md:gap-8">
          
          {heroes.map(hero => (
          <Card key={hero} name={hero} />
          ))}

        </div>
      </div>
    </main>
  );
}
