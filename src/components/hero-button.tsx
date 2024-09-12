import React from 'react';
import Link from 'next/link';

interface CardProps {
  name: string;
}

const Card: React.FC<CardProps> = ({ name }) => {
  const imgName = name.replace(/\s+/g, '-');
    return (
      <Link href={`/build/${imgName}`} passHref>
        <div
          className="flex justify-end items-center h-44 w-32 flex-col gap-2 p-4 bg-offwhite-dark rounded-sm shacow-xl hover:cursor-pointer"
          style={{
            backgroundImage: `url(/heroCards/${imgName}.png)`,
            backgroundSize: 'cover', // Cover the entire div
            backgroundPosition: 'center', // Center the background image
          }} 
        >
          <h3 className="text-md text-center text-shadow-lg w-full font-bold">{name}</h3>
        </div>
      </Link>
    );
  };
  
export default Card;
