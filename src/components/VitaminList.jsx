import React from 'react';
import VitaminCard from './VitaminCard';

function VitaminList({ vitamins, vitaminSwitches }) {
    return (
        <div>
            {vitamins.map((vitamin, index) => (
                <VitaminCard key={index} index={index} vitamin={vitamin} vitaminSwitches={vitaminSwitches} />
            ))}
        </div>
    );
}
export default VitaminList;
