// VitaminCardDetails.jsx
import React, { useState, useEffect, useMemo } from 'react';

// MaterialUI imports
import { Card, CardContent, Typography, Button, Collapse, Grid, Box, Table, TableRow, TableCell, TableBody, Modal, Alert } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Load the json of FDA vitamin values
import fdaVitaminValues from '../fda-rdv.json'


function VitaminCardDetails({ vitamin, showVitamins, handleToggleVitamins, open, handleClose }) {
    const [missingNutrients, setMissingNutrients] = useState([]);
    const [lowNutrients, setLowNutrients] = useState([]);
    const [openMissingNutrients, setOpenMissingNutrients] = useState(false);
    const [openLowNutrients, setOpenLowNutrients] = useState(false);

    // Filter the vitamins that have null or undefined amount.
    const realValueVitamins = useMemo(() => {
        return vitamin.vitamins.filter(v => v.amount);
    }, [vitamin]);

    useEffect(() => {
        const missing = [];
        const low = [];

        vitamin.vitamins.forEach(vitaminInfo => {
            const fdaValue = fdaVitaminValues[vitaminInfo.name];
            let name = vitaminInfo.name.toLowerCase();
            if ((vitaminInfo.amount && Number(vitaminInfo.amount) === 0) &&
                name !== "magnesium" &&
                name !== "calcium" &&
                name !== "added sugars") {
                missing.push({
                    name: vitaminInfo.name,
                    amount: vitaminInfo.amount,
                    unit: vitaminInfo.unit,
                    recommended: fdaValue
                });
            } else if (vitaminInfo.amount && Number(vitaminInfo.amount) < fdaValue &&
                name !== "magnesium" &&
                name !== "calcium" &&
                name !== "added sugars") {
                low.push({
                    name: vitaminInfo.name,
                    amount: vitaminInfo.amount,
                    unit: vitaminInfo.unit,
                    recommended: fdaValue
                });
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

    let totalVitamins = parseInt(vitamin.general_info.num_low_vitamins) + parseInt(vitamin.general_info.num_missing_vitamins) - 1;
    totalVitamins = totalVitamins < 0 ? 0 : totalVitamins;

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
                    'background-image': 'linear-gradient(to top, #00c6fb 0%, #005bea 100%)',
                    'overflowY': 'auto',
                }} >
                    <Box sx={{
                        'padding': '20px',
                        'borderRadius': '10px',
                        'width': '240px',
                        'textAlign': 'center'

                    }}>
                        <Typography variant="body2" fontSize={20} color={"white"} fontWeight={600}>
                            {vitamin.general_info.brand_name}
                            <hr />
                            {vitamin.general_info.product_name}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: 'white', width: '300px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                                <Typography
                                    variant="body1"
                                    padding={1}
                                    minWidth={30}
                                    height={25}
                                    fontWeight={700}
                                    backgroundColor={'#f9f9f9'}
                                    style={{
                                        backgroundColor: vitamin.general_info.num_low_vitamins <= 3 ? 'green' :
                                            vitamin.general_info.num_low_vitamins <= 8 ? '#ff8c00' :
                                                vitamin.general_info.num_low_vitamins <= 10 ? 'red' :
                                                    'red',
                                    }}
                                >
                                    {totalVitamins}</Typography>
                                <Typography variant="subtitle2" marginTop={2} fontWeight={700}>Warnings</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography
                                    variant="body1"
                                    padding={1}
                                    minWidth={30}
                                    height={25}
                                    fontWeight={700}
                                    backgroundColor={'#f9f9f9'}
                                    color={'black'}
                                    border={'2px solid lightcyan'}
                                >
                                    {vitamin.general_info.format} {formatToEmoji(vitamin.general_info.format)}</Typography>
                                <Typography variant="subtitle2" marginTop={2} fontWeight={700}>Format</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '20px', textAlign: 'center' }}>
                                <Typography
                                    variant="body1"
                                    padding={1}
                                    height={25}
                                    fontWeight={700}
                                    backgroundColor={'#f9f9f9'}
                                    color={'black'}
                                    border={'2px solid lightcyan'}
                                >
                                    {vitamin.general_info.serving_size}</Typography>
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
                    <Box>
                        {missingNutrients.length > 0 &&
                            <>
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
                                                            {nutrient.name} is missing
                                                            <br />
                                                            {nutrient.recommended} {nutrient.unit} recommended by FDA.
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </Alert>
                                </Collapse>
                            </>
                        }
                    </Box>
                    <Box sx={{ marginBottom: '20px', textAlign: 'center' }}>
                        {lowNutrients.length > 0 &&
                            <>
                                <Button variant="contained" size="small" color="warning" style={{ width: "300px" }} onClick={handleToggleLowNutrients}>
                                    Warning: {lowNutrients.length} Nutrients Very Low {openLowNutrients ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </Button>
                                <Collapse in={openLowNutrients}>
                                    <Alert severity="warning">
                                        <Table>
                                            <TableBody>
                                                {lowNutrients.map((nutrient, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell sx={{ border: 'none', fontSize: '8pt', padding: '5px' }}>
                                                            {nutrient.name.toLowerCase() === 'choline' ? (
                                                                <>
                                                                    Only {nutrient.amount} {nutrient.unit} of {nutrient.name}.
                                                                    <br />
                                                                    We are looking for 231 {nutrient.unit} of {nutrient.name} as the FDA recommends 550 {nutrient.unit} of {nutrient.name} per day, but studies show that pregnant women already consume 319 {nutrient.unit} via diet.
                                                                </>
                                                            ) : (
                                                                <>
                                                                    Only {nutrient.amount} {nutrient.unit} of {nutrient.name}.
                                                                    <br />
                                                                    {nutrient.recommended} {nutrient.unit} recommended by FDA.
                                                                </>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}

                                            </TableBody>
                                        </Table>
                                    </Alert>
                                </Collapse>
                            </>
                        }
                    </Box>
                    <Button variant="outlined" style={{ width: '300px', backgroundColor: '#fff', marginTop: '20px' }} onClick={handleToggleVitamins}>
                        {showVitamins ? 'Hide Nutrient List' : 'Show Full Nutrient List'}
                        {showVitamins ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Button>
                    <Collapse in={showVitamins}>
                        <Typography variant="h5" color="white" fontWeight={700} sx={{ textAlign: 'center', paddingY: '20px' }}>Vitamins</Typography>
                        <Table>
                            <TableBody>
                                {realValueVitamins.map((vitamin, index) => {
                                    if (index % 2 !== 0) {
                                        return null;
                                    }
                                    return (
                                        <TableRow key={index}>
                                            <TableCell sx={{ border: '2px solid lightcyan', padding: '5px' }}>
                                                <Alert sx={{ width: '100px', height: '60px', fontSize: '12px', justifyContent: 'center', alignItems: 'center' }} severity={Number(vitamin.amount) === 0 ? 'error' : Number(vitamin.amount) < fdaVitaminValues[vitamin.name] ? 'warning' : 'success'}>
                                                    {vitamin.name}
                                                    <br />
                                                    {vitamin.amount} {vitamin.unit}
                                                </Alert>
                                            </TableCell>
                                            {realValueVitamins[index + 1] &&
                                                <TableCell sx={{ border: '2px solid lightcyan', padding: '5px' }}>
                                                    <Alert sx={{ width: '100px', height: '60px', fontSize: '12px', justifyContent: 'center', alignItems: 'center' }} severity={Number(realValueVitamins[index + 1].amount) === 0 ? 'error' : Number(realValueVitamins[index + 1].amount) < fdaVitaminValues[realValueVitamins[index + 1].name] ? 'warning' : 'success'}>
                                                        {realValueVitamins[index + 1].name}
                                                        <br />
                                                        {realValueVitamins[index + 1].amount} {realValueVitamins[index + 1].unit}
                                                    </Alert>
                                                </TableCell>
                                            }
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Collapse>

                </CardContent >
            </Card >
        </Modal >
    );
}

export default VitaminCardDetails;
