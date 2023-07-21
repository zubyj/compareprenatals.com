import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Collapse } from '@mui/material';

function VitaminCard({ vitamin }) {
    const [showVitamins, setShowVitamins] = useState(false);

    const handleToggleVitamins = () => {
        setShowVitamins(!showVitamins);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{vitamin.general_info.brand}</Typography>
                <Typography variant="subtitle1">Type: {vitamin.general_info.pill_type}</Typography>
                <Typography variant="subtitle2">Serving Size: {vitamin.general_info.serving_size}</Typography>
                <Typography variant="subtitle2">Price: ${vitamin.general_info.price}</Typography>
                <Button variant="contained" onClick={handleToggleVitamins}>{showVitamins ? 'Hide Vitamins' : 'Show Vitamins'}</Button>
                <Collapse in={showVitamins}>
                    {vitamin.vitamins.map((vitaminInfo, index) => (
                        <Typography key={index} variant="body2">{vitaminInfo.name}: {vitaminInfo.amount}</Typography>
                    ))}
                </Collapse>
            </CardContent>
        </Card>
    );
}

export default VitaminCard;
