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
          <h1 className="text-6xl font-bold text-offwhite">Select a Hero</h1>
          
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
