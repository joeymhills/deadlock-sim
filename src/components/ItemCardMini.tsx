import React from 'react';
import { Item, Modifiers, ModifierTuple, ModifierOperation, ItemComponentProps } from '~/types/types'; // Adjust path as necessary
import { displayModifier } from '~/app/utils';

export const ItemCardMini: React.FC<ItemComponentProps> = ({ item, toggleItem }) => {
    const { category, cost, modifiers, passives, actives } = item;
    const imgName = "/items/" + category + "/" + item.name.replace(/\s+/g, '-') + ".png";
    const bgColor = "weapon";
    //const test = `flex flex-col justify-center items-center p-5 shadow-xl rounded-xl bg-${bgColor}`;
    //console.log(test);
    
    return (
        <div onClick={() => toggleItem(item)} className={`max-w-24 max-h-28 flex flex-col justify-center items-center shadow-xl rounded-xl bg-weapon hover:cursor-pointer`}>
            <img className='p-3 h-16' src={imgName}></img>
            <div className="bg-offwhite rounded-b-xl text-black w-full">
                <h1 className='p-1 font-bold text-center text-md'>{item.name}</h1>
            </div>
        </div>
    );
};

export default ItemCardMini;