import React from 'react';
import VitaminCard from './VitaminCard';

function VitaminList({ vitamins }) {
    return (
        <div>
            {vitamins.map((vitamin, index) => (
                <VitaminCard key={index} vitamin={vitamin} />
            ))}
        </div>
    );
}

export default VitaminList;
