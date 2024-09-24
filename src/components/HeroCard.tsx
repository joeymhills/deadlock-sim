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
  
    return (
      <Link href={`/build/${name}`} passHref>
        <div
          className="flex animate-fadeIn justify-end items-center h-44 w-32 flex-col gap-2 p-4 bg-offwhite-dark hover:bg-opacity-20 rounded-sm shadow-xl hover:cursor-pointer"
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
