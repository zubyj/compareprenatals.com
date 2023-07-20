import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function VitaminCard({ vitamin }) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{vitamin.general_info.brand}</Typography>
                <Typography variant="subtitle1">{vitamin.general_info.pill_type}</Typography>
                <Typography variant="subtitle2">${vitamin.general_info.price}</Typography>

            </CardContent>
        </Card>
    );
}

export default VitaminCard;
