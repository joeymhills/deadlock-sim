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
          className="flex justify-end items-center h-60 flex-col gap-4 rounded-xl p-4 text-white bg-dark hover:bg-white/20 hover:cursor-pointer"
          style={{
            backgroundImage: `url(/heroCards/${imgName}.png)`,
            backgroundSize: 'cover', // Cover the entire div
            backgroundPosition: 'center', // Center the background image
          }} 
        >
          <h3 className="text-2xl text-shadow-lg font-bold">{name}</h3>
        </div>
      </Link>
    );
  };
  
export default Card;
