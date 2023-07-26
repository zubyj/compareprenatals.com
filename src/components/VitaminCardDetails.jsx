// VitaminCardDetails.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Collapse, Grid, Box, Table, TableRow, TableCell, TableBody, Modal, Dialog, DialogContent, DialogTitle } from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';
import fdaVitaminValues from '../fda-rdv.json'

function VitaminCardDetails({ vitamin, showVitamins, handleToggleVitamins, open, handleClose }) {
    const [missingNutrients, setMissingNutrients] = useState([]);
    const [lowNutrients, setLowNutrients] = useState([]);
    const [openMissingNutrients, setOpenMissingNutrients] = useState(false);
    const [openLowNutrients, setOpenLowNutrients] = useState(false);

    useEffect(() => {
        const missing = [];
        const low = [];

        vitamin.vitamins.forEach(vitaminInfo => {
            const fdaValue = fdaVitaminValues[vitaminInfo.name];
            if (!fdaValue || Number(vitaminInfo.amount) === 0) {
                missing.push(vitaminInfo.name);
            } else if (Number(vitaminInfo.amount) < fdaValue) {
                low.push({ name: vitaminInfo.name, amount: vitaminInfo.amount });
            }
        });

        setMissingNutrients(missing);
        setLowNutrients(low);
    }, [vitamin]);

    const handleOpenMissingNutrients = () => setOpenMissingNutrients(true);
    const handleCloseMissingNutrients = () => setOpenMissingNutrients(false);

    const handleOpenLowNutrients = () => setOpenLowNutrients(true);
    const handleCloseLowNutrients = () => setOpenLowNutrients(false);

    // Function to divide an array into chunks of 3 vitamins
    const chunk = (arr, len) => {
        var chunks = [],
            i = 0,
            n = arr.length;
        while (i < n) {
            chunks.push(arr.slice(i, i += len));
        }
        return chunks;
    }

    // Divide vitamin array into chunks of 2
    const vitaminChunks = chunk(vitamin.vitamins, 2);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'backgroundColor': 'rgba(0,0,0,0.5)',
            }}
        >
            <Card  >
                <CardContent sx={{
                    'display': 'flex',
                    'flexDirection': 'column',
                    'alignItems': 'center',
                    'justifyContent': 'center',
                    'gap': '30px',
                    'width': '80vw',
                    'minHeight': '60vh',
                    'backgroundColor': 'lightblue',
                }} >
                    <Typography variant="h5" color="darkgreen">{vitamin.general_info.brand_name}</Typography>
                    <Typography variant="h6" color="secondary">{vitamin.general_info.product_name}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'green', padding: '15px', borderRadius: '10px', color: 'white' }}>
                            <MedicationIcon sx={{ fontSize: 60 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <Card><Typography variant="h6" padding={1}>{vitamin.general_info.score || '-'}/10</Typography></Card>
                                <Typography variant="subtitle2">Nutrition Score</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Card><Typography variant="h6" padding={1}>{vitamin.general_info.format}</Typography></Card>
                                <Typography variant="subtitle2">Format</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Card><Typography variant="h6" padding={1} minWidth={30} textAlign={'center'}>{vitamin.general_info.serving_size}</Typography></Card>
                                <Typography variant="subtitle2" textAlign={'center'}>Serving Size</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Button variant="contained" color="success" href={vitamin.general_info.url} target='_blank'>Order for ${vitamin.general_info.price}</Button>



                    <Button variant="contained" color="error" onClick={handleOpenMissingNutrients}>Warning: {missingNutrients.length} Nutrients Missing</Button>
                    <Button variant="contained" color="warning" onClick={handleOpenLowNutrients}>Warning: {lowNutrients.length} Nutrients Low</Button>
                    <Dialog
                        open={openMissingNutrients}
                        onClose={handleCloseMissingNutrients}
                    >
                        <DialogTitle>{"Missing Nutrients"}</DialogTitle>
                        <DialogContent>
                            <ul>
                                {missingNutrients.map((nutrient, index) => (
                                    <li key={index}>{nutrient}</li>
                                ))}
                            </ul>
                        </DialogContent>
                    </Dialog>
                    <Dialog
                        open={openLowNutrients}
                        onClose={handleCloseLowNutrients}
                    >
                        <DialogTitle>{"Low Nutrients"}</DialogTitle>
                        <DialogContent>
                            <ul>
                                {lowNutrients.map((nutrient, index) => (
                                    <li key={index}>{nutrient.name}: {nutrient.amount}</li>
                                ))}
                            </ul>
                        </DialogContent>
                    </Dialog>




                    <Button variant="outlined" color="secondary" onClick={handleToggleVitamins}>{showVitamins ? 'Hide Vitamins' : 'Show Vitamins'}</Button>
                    <Collapse in={showVitamins}>
                        <Card sx={{ backgroundColor: 'white', border: '1px solid black', marginTop: '10px' }}>
                            <Typography variant="h6" sx={{ textAlign: 'center', fontFamily: "'Arial Black', 'Helvetica Bold', sans-serif" }}>Vitamins</Typography>
                            <Table>
                                <TableBody>
                                    {vitaminChunks.map((vitaminChunk, index) => (
                                        <TableRow key={index}>
                                            {vitaminChunk.map((vitaminInfo, subIndex) => (
                                                <>
                                                    <TableCell sx={{ border: 'none', fontFamily: "'Arial Black','Helvetica Bold',sans-serif", fontSize: '10pt' }}>{vitaminInfo.name}</TableCell>
                                                    <TableCell sx={{ border: 'none', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '10pt' }}>{vitaminInfo.amount}</TableCell>
                                                </>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </Collapse>
                    <hr />
                </CardContent>
            </Card >
        </Modal >
    );
}

export default VitaminCardDetails;
