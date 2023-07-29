// VitaminCardDetails.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Collapse, Grid, Box, Table, TableRow, TableCell, TableBody, Modal, Alert } from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
            let name = vitaminInfo.name.toLowerCase();
            if ((!fdaValue || Number(vitaminInfo.amount) === 0) &&
                name !== "magnesium" &&
                name !== "calcium" &&
                name !== "added sugars") {
                missing.push({
                    name: vitaminInfo.name,
                    amount: vitaminInfo.amount,
                    unit: vitaminInfo.unit,
                });
            } else if (Number(vitaminInfo.amount) < fdaValue &&
                name !== "magnesium" &&
                name !== "calcium" &&
                name !== "added sugars") {
                low.push({ name: vitaminInfo.name, amount: vitaminInfo.amount, unit: vitaminInfo.unit, recommended: fdaValue });
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
                    'width': '300px',
                    'maxHeight': '75vh',
                    'backgroundColor': '#2074d4',
                    'background-image': 'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
                    'overflowY': 'auto',
                }} >
                    <Box sx={{
                        'backgroundColor': '#fff',
                        'padding': '20px',
                        'borderRadius': '10px',
                        'width': '240px',
                        'textAlign': 'center'

                    }}>
                        <Typography variant="h4" fontSize={25}>{vitamin.general_info.brand_name}</Typography>
                        <hr />
                        <Typography variant="h2" fontSize={20} fontWeight={700}>{vitamin.general_info.product_name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: 'white', width: '300px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <Card>
                                    <Typography
                                        variant="body1"
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
                                <Card><Typography variant="body1" padding={1}>{vitamin.general_info.format} {formatToEmoji(vitamin.general_info.format)}</Typography></Card>
                                <Typography variant="subtitle2" marginTop={2} fontWeight={700}>Format</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Card><Typography variant="body1" padding={1} minWidth={30} textAlign={'center'}>{vitamin.general_info.serving_size}</Typography></Card>
                                <Typography variant="subtitle2" marginTop={2} textAlign={'center'} fontWeight={700}>Serving Size</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Button variant="contained" color="success" size='large' href={vitamin.general_info.url} target='_blank'>
                        <ShoppingCartIcon />
                        <Typography fontSize="small" marginLeft={2}>
                            Shop Now
                        </Typography>
                    </Button>
                    <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
                        <Button variant="contained" size="small" color="error" style={{ width: "300px" }} onClick={handleToggleMissingNutrients}>
                            Warning: {missingNutrients.length} Nutrients Missing {openMissingNutrients ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Button>
                        <Collapse in={openMissingNutrients}>
                            <Alert severity="error">
                                <Table>
                                    <TableBody>
                                        {missingNutrients.map((nutrient, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ border: 'none', fontSize: '8pt', padding: '5px' }}>
                                                    {nutrient.name} is missing. {nutrient.amount} {nutrient.unit} recommended by FDA.
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Alert>
                        </Collapse>
                    </Box>
                    <Box sx={{ marginBottom: '20px', textAlign: 'center' }}>
                        <Button variant="contained" size="small" color="error" style={{ width: "300px" }} onClick={handleToggleLowNutrients}>
                            Warning: {lowNutrients.length} Nutrients Very Low {openLowNutrients ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Button>
                        <Collapse in={openLowNutrients}>
                            <Alert severity="warning">
                                <Table>
                                    <TableBody>
                                        {lowNutrients.map((nutrient, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ border: 'none', fontSize: '8pt', padding: '5px' }}>
                                                    Only {nutrient.amount} {nutrient.unit} of {nutrient.name}. {nutrient.recommended} {nutrient.unit} recommended by FDA.
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Alert>
                        </Collapse>
                        <Button variant="outlined" style={{ width: '300px', backgroundColor: '#fff', marginTop: '20px' }} onClick={handleToggleVitamins}>
                            {showVitamins ? 'Hide Nutrient List' : 'Show Full Nutrient List'}
                            {showVitamins ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Button>
                    </Box>


                    <Collapse in={showVitamins} >
                        <Card>
                            <Typography variant="h6" sx={{ textAlign: 'center', paddingY: '20px' }}>Vitamins</Typography>
                            <Table>
                                <TableBody>
                                    {vitaminChunks.map((vitaminChunk, index) => (
                                        <TableRow key={index}>
                                            {vitaminChunk.map((vitaminInfo, subIndex) => (
                                                <>
                                                    <TableCell sx={{ border: 'none', fontSize: '12px' }}>
                                                        {vitaminInfo.name} {Number(vitaminInfo.amount) === 0 ? '❌' : Number(vitaminInfo.amount) < fdaVitaminValues[vitaminInfo.name] ? '⚠️' : ''}
                                                    </TableCell>
                                                    <TableCell sx={{ border: 'none', fontWeight: '700', fontSize: '9pt' }}>{vitaminInfo.amount} {vitaminInfo.unit}</TableCell>
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
