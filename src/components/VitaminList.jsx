import React from 'react';
import VitaminCard from './VitaminCard';

function VitaminList({ vitamins, selectedVitamin }) {

    return (
        <div>
            {vitamins.map((vitamin, index) => (
                <VitaminCard key={index} vitamin={vitamin} selectedVitamin={selectedVitamin} />
            ))}

        </div>
    );
}

export default VitaminList;
