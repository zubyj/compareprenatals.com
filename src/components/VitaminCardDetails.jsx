// VitaminCardDetails.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Collapse, Grid, Box, Table, TableRow, TableCell, TableBody, Modal, Alert } from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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
                low.push({ name: vitaminInfo.name, amount: vitaminInfo.amount, recommended: fdaValue });
            }
        });

        setMissingNutrients(missing);
        setLowNutrients(low);
    }, [vitamin]);

    const handleToggleMissingNutrients = () => setOpenMissingNutrients(!openMissingNutrients);
    const handleToggleLowNutrients = () => setOpenLowNutrients(!openLowNutrients);

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

    const url = new URL(vitamin.general_info.url);
    const hostname = url.hostname;
    // Split the hostname by dot "."
    const parts = hostname.split(".");

    let domain;
    if (parts[0] === 'www') {
        // If the hostname starts with 'www', take the second part
        domain = parts[1];
    } else {
        // Otherwise, take the first part
        domain = parts[0];
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
            }}
            data-aos="zoom-in"
        >
            <Card>
                <CardContent sx={{
                    'display': 'flex',
                    'flexDirection': 'column',
                    'alignItems': 'center',
                    'gap': '25px',
                    'width': '375px',
                    'height': '75vh',
                    'backgroundColor': '#2074d4',
                    'overflowY': 'auto',
                }} >
                    <Box sx={{
                        'backgroundColor': '#fff',
                        'padding': '30px',
                        'borderRadius': '10px',
                        'width': '250px',
                        'textAlign': 'center'

                    }}>
                        <Typography variant="h1" fontSize={30}>{vitamin.general_info.brand_name}</Typography>
                        <hr />
                        <Typography variant="h2" fontSize={20} fontWeight={700}>{vitamin.general_info.product_name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'white', padding: '15px', borderRadius: '10px', width: '325px' }}>
                            <MedicationIcon sx={{ fontSize: 60 }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <Card>
                                    <Typography
                                        variant="h6"
                                        padding={1}
                                        style={{
                                            color: vitamin.general_info.score <= 3 ? 'red' :
                                                vitamin.general_info.score <= 8 ? 'orange' :
                                                    vitamin.general_info.score <= 10 ? 'green' :
                                                        'black'
                                        }}
                                    >
                                        {vitamin.general_info.score} /10</Typography></Card>
                                <Typography variant="subtitle2" marginTop={2} fontWeight={700}>Nutrition Score</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Card><Typography variant="h6" padding={1}>{vitamin.general_info.format} {formatToEmoji(vitamin.general_info.format)}</Typography></Card>
                                <Typography variant="subtitle2" marginTop={2} fontWeight={700}>Format</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Card><Typography variant="h6" padding={1} minWidth={30} textAlign={'center'}>{vitamin.general_info.serving_size}</Typography></Card>
                                <Typography variant="subtitle2" marginTop={2} textAlign={'center'} fontWeight={700}>Serving Size</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Button variant="contained" color="warning" style={{ width: '300px' }} href={vitamin.general_info.url} target='_blank'>Order for ${vitamin.general_info.price} from {domain}</Button>
                    <Box sx={{ marginBottom: '20px' }}>
                        <Alert severity="error" onClick={handleToggleMissingNutrients}>
                            <Typography style={{ width: '250px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                Warning: {missingNutrients.length} Nutrients Missing {openMissingNutrients ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </Typography>
                        </Alert>
                        <Collapse in={openMissingNutrients}>
                            <Alert severity="error">
                                <Table>
                                    <TableBody>
                                        {missingNutrients.map((nutrient, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ border: 'none', fontSize: '8pt', padding: '5px' }}>
                                                    {nutrient}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Alert>
                        </Collapse>
                    </Box>
                    <Box sx={{ marginBottom: '20px' }}>
                        <Alert severity="warning" onClick={handleToggleLowNutrients}>
                            <Typography style={{ width: '250px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                Warning: {lowNutrients.length} Nutrients Low {openLowNutrients ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </Typography>
                        </Alert>
                        <Collapse in={openLowNutrients}>
                            <Alert severity="warning">
                                <Table>
                                    <TableBody>
                                        {lowNutrients.map((nutrient, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ border: 'none', fontSize: '8pt', padding: '5px' }}>
                                                    Only {nutrient.amount} mg/mcg of {nutrient.name}. {nutrient.recommended} mg/mcg recommended by FDA.
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Alert>
                        </Collapse>
                    </Box>
                    <Button variant="contained" color="primary" style={{ width: '300px' }} onClick={handleToggleVitamins}>
                        {showVitamins ? 'Hide Vitamins' : 'Show Vitamins'}
                        {showVitamins ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Button>

                    <Collapse in={showVitamins}>
                        <Card sx={{ backgroundColor: 'white', border: '1px solid black' }}>
                            <Typography variant="h6" sx={{ textAlign: 'center', fontFamily: "'Arial Black', 'Helvetica Bold', sans-serif" }}>Vitamins</Typography>
                            <Table>
                                <TableBody>
                                    {vitaminChunks.map((vitaminChunk, index) => (
                                        <TableRow key={index}>
                                            {vitaminChunk.map((vitaminInfo, subIndex) => (
                                                <>
                                                    <TableCell sx={{ border: 'none', fontFamily: "'sans-serif", fontWeight: '700', fontSize: '12px' }}>
                                                        {vitaminInfo.name} {Number(vitaminInfo.amount) === 0 ? '❌' : Number(vitaminInfo.amount) < fdaVitaminValues[vitaminInfo.name] ? '⚠️' : ''}
                                                    </TableCell>
                                                    <TableCell sx={{ border: 'none', fontFamily: 'sans-serif', fontWeight: '700', fontSize: '10pt' }}>{vitaminInfo.amount}</TableCell>
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
