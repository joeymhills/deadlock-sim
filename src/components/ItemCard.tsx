import React, { useState, useRef, useEffect } from 'react';
import { Item, Action, Modifier, ModifierTuple, ModifierOperation, ItemComponentProps } from '~/types/types'; // Adjust path as necessary
import { displayModifier } from '~/app/utils';

export const ItemCard: React.FC<ItemComponentProps> = ({ item, toggleItem }) => {
    const { category, cost, modifiers, passives, actives } = item;
    const imgName = "/items/" + category.toLowerCase() + "/" + item.name.replace(/\s+/g, '_') + ".png";
    const action: Action = { item, type: 'TOGGLE_ITEM' };
  
    const [isHovered, setIsHovered] = useState(false);
    const [popupPosition, setPopupPosition] = useState<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>('bottom-right');
    const cardRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (isHovered && cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const isNearRightEdge = rect.right + 300 > window.innerWidth; // Adjust for popup width
        const isNearBottomEdge = rect.bottom + 100 > window.innerHeight; // Adjust for popup height
        
        if (isNearRightEdge && !isNearBottomEdge) {
          setPopupPosition('bottom-left');
        } else if (isNearRightEdge && isNearBottomEdge) {
          setPopupPosition('top-left');
        } else if (!isNearRightEdge && isNearBottomEdge) {
          setPopupPosition('top-right');
        } else {
          setPopupPosition('bottom-right');
        }
      }
      if (isHovered && cardRef.current) {
        cardRef.current.classList.add("bg-opacity-50");
      } else if (cardRef.current) {
        cardRef.current.classList.remove("bg-opacity-50");
      }
    }, [isHovered]);
  
    return (
      <div 
        ref={cardRef}
        onClick={() => toggleItem(action)} 
        className={`relative w-20 flex flex-col justify-center items-center shadow-xl rounded-md bg-${category.toLowerCase()} hover:cursor-pointer`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img className='p-1 h-12' src={imgName} alt={item.name} style={{ filter: 'invert(100%) brightness(0%)' }}/>
        <div className="flex justify-center items-center bg-offwhite rounded-b-md h-8 text-black w-full">
          <h1 className='font-bold text-center text-xxs'>{item.name}</h1>
        </div>
  
        {/* Popup that appears on hover */}
        {isHovered && (
          <div
            className={`absolute ${popupPosition.includes('top') ? 'bottom-full' : 'top-0'} ${popupPosition.includes('right') ? 'left-full ml-2' : 'right-full mr-2'} p-2 bg-dark border border-offwhite-dark text-white text-md rounded shadow-xl w-64 z-50 flex flex-col justify-center items-start`}
          >
            <h2 className="font-bold text-center self-center text-2xl">{item.name}</h2>
            <p>Cost: {cost}</p>
            {modifiers?.map((modifier, index) => (
              <div key={index}>
                {displayModifier(modifier)}
              </div>
            ))}
          </div>
        )}
    
        {/* Keeping these styles for Tailwind purging */}
        <div className="hidden bg-weapon/50 bg-weapon-bg-1 bg-weapon-bg-2 bg-vitality-bg-1 bg-vitality-bg-2 bg-spirit-bg-1 bg-spirit-bg-2"></div>
      </div>
    );
  };
export default ItemCard;
