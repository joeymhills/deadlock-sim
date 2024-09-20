"use client"
import { Hero } from "~/app/lib/Hero";
import { getImageName } from "~/utils";

const BuildCard: React.FC<{buildName: string; hero: Hero;}> = ({buildName, hero }) => {
    console.log(` this is a console log >>>> /heroCards/`)
    return (
        <div onClick={() => {}} className={`max-w-24 max-h-28 flex flex-col justify-center items-center shadow-xl rounded-md bg-dark hover:cursor-pointer`}>
            <img className='p-3 h-16' src={`/heroCards/${getImageName(hero.name)}`}></img>
            <div className="flex justify-center items-center bg-offwhite rounded-b-md text-black w-full">
                <h1 className='p-1 h-9 font-bold text-center text-xs'>{buildName}</h1>
            </div>
        </div>
    );
  };
  
export default BuildCard;