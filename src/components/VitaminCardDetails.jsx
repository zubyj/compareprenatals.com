// VitaminCardDetails.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Collapse, Grid, Box, Table, TableRow, TableCell, TableBody, Modal, Alert } from '@mui/material';
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

    const handleToggleMissingNutrients = () => setOpenMissingNutrients(!openMissingNutrients);
    const handleToggleLowNutrients = () => setOpenLowNutrients(!openLowNutrients);

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
                    'gap': '25px',
                    'width': '80vw',
                    'minHeight': '60vh',
                    'backgroundColor': 'lightblue',
                }} >
                    <Box sx={{
                        'backgroundColor': 'lightcyan',
                        'padding': '30px',
                        'borderRadius': '10px',
                        'width': '350px',
                        'textAlign': 'center'

                    }}>
                        <Typography variant="h3" fontSize={30} color="primary">{vitamin.general_info.brand_name}</Typography>
                        <hr />
                        <Typography variant="h6" color="secondary" fontWeight={700}>{vitamin.general_info.product_name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'darkgreen', padding: '15px', borderRadius: '10px', color: 'white', width: '375px' }}>
                            <MedicationIcon sx={{ fontSize: 60 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <Card>
                                    <Typography
                                        variant="h6"
                                        padding={1}
                                        fontWeight={700}
                                        style={{
                                            color: vitamin.general_info.score <= 3 ? 'red' :
                                                vitamin.general_info.score <= 8 ? 'orange' :
                                                    vitamin.general_info.score <= 10 ? 'green' :
                                                        'black'
                                        }}
                                    >
                                        {vitamin.general_info.score} /10</Typography></Card>
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
                    <Button variant="contained" color="primary" style={{ width: '300px' }} href={vitamin.general_info.url} target='_blank'>Order for ${vitamin.general_info.price} from Amazon</Button>
                    <hr />
                    <Typography variant="body1">
                        Vitamin Details
                    </Typography>
                    <Button variant="contained" color="error" style={{ width: '300px' }} onClick={handleToggleMissingNutrients}>Warning: {missingNutrients.length} Nutrients Missing</Button>
                    <Button variant="contained" color="error" style={{ width: '300px' }} onClick={handleToggleLowNutrients}>Warning: {lowNutrients.length} Nutrients Low</Button>
                    <Button variant="contained" color="primary" style={{ width: '300px' }} onClick={handleToggleVitamins}>{showVitamins ? 'Hide Vitamins' : 'Show Vitamins'}</Button>
                    <Collapse in={openMissingNutrients}>
                        <Alert severity="error">
                            <Table>
                                <TableBody>
                                    {missingNutrients.map((nutrient, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ border: 'none', fontFamily: "'Arial Black','Helvetica Bold',sans-serif", fontSize: '8pt', padding: '5px' }}>
                                                {nutrient}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Alert>
                    </Collapse>
                    <Collapse in={openLowNutrients}>
                        <Alert severity="warning">
                            <Table>
                                <TableBody>
                                    {lowNutrients.map((nutrient, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ border: 'none', fontFamily: "'Arial Black','Helvetica Bold',sans-serif", fontSize: '8pt', padding: '5px' }}>
                                                {nutrient.name}: {nutrient.amount}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Alert>
                    </Collapse>
                    <Collapse in={showVitamins}>
                        <Card sx={{ backgroundColor: 'white', border: '1px solid black', marginTop: '10px' }}>
                            <Typography variant="h6" sx={{ textAlign: 'center', fontFamily: "'Arial Black', 'Helvetica Bold', sans-serif" }}>Vitamins</Typography>
                            <Table>
                                <TableBody>
                                    {vitaminChunks.map((vitaminChunk, index) => (
                                        <TableRow key={index}>
                                            {vitaminChunk.map((vitaminInfo, subIndex) => (
                                                <>
                                                    <TableCell sx={{ border: 'none', fontFamily: "'Arial Black','Helvetica Bold',sans-serif", fontSize: '8pt' }}>
                                                        {vitaminInfo.name} {Number(vitaminInfo.amount) === 0 ? '❌' : Number(vitaminInfo.amount) < fdaVitaminValues[vitaminInfo.name] ? '⚠️' : ''}
                                                    </TableCell>
                                                    <TableCell sx={{ border: 'none', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '8pt' }}>{vitaminInfo.amount}</TableCell>
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
