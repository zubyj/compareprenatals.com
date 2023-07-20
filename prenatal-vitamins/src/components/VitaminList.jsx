import React from 'react';
import { Typography } from '@mui/material';
import VitaminCard from './VitaminCard';

function VitaminList({ vitamins }) {
    return (
        <div>
            <Typography variant="h4">Prenatal Vitamins</Typography>
            {vitamins.map((vitamin, index) => (
                <VitaminCard key={index} vitamin={vitamin} />
            ))}
        </div>
    );
}

export default VitaminList;
