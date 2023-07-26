// VitaminCard.jsx
import React, { useState } from 'react';
import { Card, Typography, Button, Grid, Box } from '@mui/material';
import VitaminCardDetails from './VitaminCardDetails';

function VitaminCard({ vitamin, vitaminSwitches }) {
    const [showVitamins, setShowVitamins] = useState(false);
    const [open, setOpen] = useState(false);

    const handleToggleVitamins = () => {
        setShowVitamins(!showVitamins);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen} variant="contained" color="success" sx={{ 'width': '90vw', 'paddingY': '10px', 'marginY': '10px', 'height': '150px', 'borderRadius': '20px' }}>
                <Grid container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid item xs={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '10px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            <Button variant="contained">{vitamin.general_info.brand_name}</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                            <Typography variant="subtitle2" color="white">{vitamin.general_info.product_name}</Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Card><Typography variant="subtitle1" padding={.2}>{vitamin.general_info.score || '-'}/10</Typography></Card>
                                    <Typography variant="caption">Score</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Card><Typography variant="subtitle1" padding={.2}>{vitamin.general_info.format}</Typography></Card>
                                    <Typography variant="caption">Format</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Card><Typography variant="subtitle1" padding={.2} minWidth={30}>{vitamin.general_info.serving_size}</Typography></Card>
                                    <Typography variant="caption">Servings</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Button >
            <VitaminCardDetails
                vitamin={vitamin}
                showVitamins={showVitamins}
                handleToggleVitamins={handleToggleVitamins}
                open={open}
                handleClose={handleClose}
            />
        </>
    );
}
export default VitaminCard;