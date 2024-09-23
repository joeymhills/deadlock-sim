import Link from "next/link";
import Card from "../components/HeroCard";

export default function HomePage() {

  const heroes = [
    "Abrams", "Bebop", "Dynamo", "Grey Talon", "Haze", "Infernus", 
    "Ivy", "Kelvin", "Lady Geist", "Lash", "McGinnis", "Mo & Krill",
    "Paradox", "Pocket", "Seven", "Shiv", "Vindicta", "Viscous", 
    "Warden", "Wraith", "Yamato"
  ];


  return (
    <main className="flex min-h-screen flex-col items-center text-white">
      <div className="">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16"
            >
          <h1 className="text-2xl font-bold text-offwhite">Select a Hero</h1>
          
          <div className="grid lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3 gap-4">
            {heroes.map(hero => (
            <Card key={hero} name={hero} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
