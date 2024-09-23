"use client"
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface CardProps {
  name: string;
}

const Card: React.FC<CardProps> = ({ name }) => {
  function getImageName(str: string): string {
      return str.replace(/\s+/g, '_') + ".png"
  }
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
      if (isHovered && cardRef.current) {
        cardRef.current.classList.add("bg-opacity-20");
      } else if (cardRef.current) {
        cardRef.current.classList.remove("bg-opacity-20");
      }
    }, [isHovered]);
  
    return (
      <Link href={`/build/${name}`} passHref>
        <div
          className="flex justify-end items-center h-44 w-32 flex-col gap-2 p-4 bg-offwhite-dark rounded-sm shadow-xl hover:cursor-pointer"
          ref={cardRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            backgroundImage: `url(/heroCards/${getImageName(name)})`,
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
