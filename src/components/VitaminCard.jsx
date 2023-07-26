// VitaminCard.jsx
import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';
import VitaminCardDetails from './VitaminCardDetails'; // make sure the path is correct

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
            <Card>
                <Button onClick={handleOpen} variant="contained" color="success" sx={{
                    'width': '90vw',
                    'paddingY': '10px',
                    'marginY': '10px',
                    'height': '200px',
                    'borderRadius': '20px',
                }}>
                    <CardContent>
                        <Grid>
                            <Box sx={{
                                'display': 'flex',
                                'flexDirection': 'row',
                                'justifyContent': 'center',
                                'alignItems': 'center',
                                'textAlign': 'center',
                                'gap': '10px',
                            }}>
                                <Typography variant="h5" paddingLeft="8px">{vitamin.general_info.brand_name}</Typography>
                                <Box display="flex" flexDirection="column" gap={1} justifyContent="center" alignItems="center">
                                    <Typography variant="subtitle2" color="white" >{vitamin.general_info.product_name}</Typography>
                                    <Box display="flex" flexDirection="row" gap={1} >
                                        <Card>
                                            <Typography variant="h6" padding={1}>{vitamin.general_info.score || '-'}/10</Typography>
                                        </Card>
                                        <Card>
                                            <Typography variant="subtitle1" padding={1}>{vitamin.general_info.format}</Typography>
                                        </Card>
                                        <Card>
                                            <Typography variant="h6" padding={1}>{vitamin.general_info.serving_size}</Typography>
                                        </Card>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </CardContent>
                </Button>
                <VitaminCardDetails
                    vitamin={vitamin}
                    showVitamins={showVitamins}
                    handleToggleVitamins={handleToggleVitamins}
                    open={open}
                    handleClose={handleClose}
                />
            </Card>
        </>
    );
}
export default VitaminCard;
