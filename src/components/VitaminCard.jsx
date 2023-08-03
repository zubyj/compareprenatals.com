// VitaminCard.jsx
import React, { useState } from 'react';
import { Card, Typography, Button, Grid, Box } from '@mui/material';
import VitaminCardDetails from './VitaminCardDetails';
import MedicationIcon from '@mui/icons-material/Medication';
import { useMemo } from 'react';

function VitaminCard({ vitamin, index, vitaminSwitches, }) {
    const [showVitamins, setShowVitamins] = useState(false);
    const [open, setOpen] = useState(false);

    // Filter the vitamins that have null or undefined amount.
    const realValueVitamins = useMemo(() => {
        return vitamin.vitamins.filter(v => v.amount);
    }, [vitamin]);

    const handleToggleVitamins = () => {
        setShowVitamins(!showVitamins);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formatToEmoji = (format) => {
        switch (format) {
            case 'Gummy':
                return '🍬';
            case 'Pill':
                return '💊';
            case 'Liquid':
                return '🥤';
            default:
                return '';
        }
    };

    const determineGradient = (index) => {
        if (index % 2 === 0) {
            return 'linear-gradient(to top, #c471f5 0%, #fa71cd 100%)';
        } else {
            return 'linear-gradient(to top, #00c6fb 0%, #005bea 100%)'; // Replace with your desired alternate gradient
        }
    };

    const totalVitamins = parseInt(vitamin.general_info.num_low_vitamins) + parseInt(vitamin.general_info.num_missing_vitamins);

    const getWarningsColor = () => {
        if (totalVitamins <= 3) {
            return 'green';
        }
        else if (vitamin.general_info.num_low_vitamins <= 8) {
            return '#ff8c00';
        }
        else if (vitamin.general_info.num_low_vitamins <= 10) {
            return 'red';
        }
        else {
            return 'red';
        }
    }

    return (
        <>
            <Card
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                <Button onClick={handleOpen} variant="contained" color="primary" sx={{
                    'width': '100%',
                    'paddingY': '10px',
                    'marginY': '10px',
                    'height': '150px',
                    'borderRadius': '20px',
                    'backgroundImage': determineGradient(index)
                }}>
                    <Grid container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '0' }}>
                        <Grid item xs={6} paddingRight={6} >
                            <MedicationIcon sx={{ color: 'lightcyan', fontSize: '60px' }} />
                        </Grid>
                        <Grid item xs={6} paddingRight={3}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px', marginRight: '30px' }}>
                                <Typography variant="caption" fontSize="15px" color="lightcyan" width={'300px'} fontWeight={700} overflow={'hidden'}>{vitamin.general_info.brand_name}</Typography>
                                <Typography variant="body1" color="white" width={'300px'}>{vitamin.general_info.product_name}</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                        <Card
                                            sx={{
                                                backgroundColor: getWarningsColor(),
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                padding={.5}
                                                fontWeight={700}
                                                fontSize={'1.1'}
                                                minWidth={45}
                                                border={'1px solid black'}
                                                color={'white'}
                                            >
                                                {totalVitamins}
                                            </Typography>
                                        </Card>
                                        <Typography variant="caption">Warnings</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <Card sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', minWidth: '90px', minHeight: '30px' }}>
                                            <Typography variant="subtitle2" padding={.5} >
                                                {vitamin.general_info.format} {formatToEmoji(vitamin.general_info.format)}
                                            </Typography>
                                        </Card>
                                        <Typography variant="caption">Format</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center' }}>
                                        <Card sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '50px', minHeight: '30px' }}>
                                            <Typography variant="subtitle2" padding={.5} >
                                                {vitamin.general_info.serving_size}
                                            </Typography>
                                        </Card>
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
            </Card >
        </>
    );

}

export default VitaminCard;
