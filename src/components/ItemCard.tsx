import React, { useState } from 'react';
import { Item, Action, ModifierTuple, ModifierOperation, ItemComponentProps } from '~/types/types'; // Adjust path as necessary
import { displayModifier } from '~/app/utils';

export const ItemCard: React.FC<ItemComponentProps> = ({ item, toggleItem }) => {
    const { category, cost, modifiers, passives, actives } = item;
    const imgName = "/items/" + category.toLowerCase() + "/" + item.name.replace(/\s+/g, '_') + ".png";
    const action: Action = { item, type: 'TOGGLE_ITEM' };
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div 
        onClick={() => toggleItem(action)} 
        className={`relative max-w-24 max-h-28 flex flex-col justify-center items-center shadow-xl rounded-md bg-${category.toLowerCase()} hover:cursor-pointer`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img className='p-3 h-16' src={imgName} alt={item.name} />
        <div className="flex justify-center items-center bg-offwhite rounded-b-md text-black w-full">
          <h1 className='p-1 h-9 font-bold text-center text-xs'>{item.name}</h1>
        </div>
  
        {/* Popup that appears on hover */}
        {isHovered && (
          <div className={`absolute top-0 left-full ml-2 p-2 bg-${category.toLowerCase()}-bg-1 border border-offwhite-dark text-white text-lg rounded shadow-xl w-64 z-50 flex flex-col justify-center items-center`}>
            <h2 className="font-bold text-2xl">{item.name}</h2>
            <p>Cost: {cost}</p>
            <p>Passives: {modifiers?.map(modifier =>  modifier.modifier)}</p>
            <p>Actives:</p>
          </div>
        )}
        {/* TODO: I wish I didn't have to do this, but Tailwind keeps purging these styles because these styles are created at compile time */}
        <div className="hidden bg-weapon-bg-1 bg-weapon-bg-2 bg-vitality-bg-1 bg-vitality-bg-2 bg-spirit-bg-1 bg-spirit-bg-2"></ div>
      </div>
    );
  };

export default ItemCard;
