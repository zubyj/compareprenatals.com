import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Collapse, Grid, Box, Table, TableRow, TableCell, TableBody } from '@mui/material';

function VitaminCard({ vitamin, vitaminSwitches }) {
    const [showVitamins, setShowVitamins] = useState(false);

    const handleToggleVitamins = () => {
        setShowVitamins(!showVitamins);
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

    // Divide vitamin array into chunks of 3
    const vitaminChunks = chunk(vitamin.vitamins, 3);

    return (
        <Card>
            <CardContent>
                <Grid container width="400px">
                    <Grid item xs={6}>
                        <Box display="flex" flexDirection="column" height="100%">
                            <Box mb="auto">
                                <Typography variant="h5">{vitamin.general_info.brand_name}</Typography>
                                {Object.keys(vitaminSwitches).map(key => {
                                    if (vitaminSwitches[key]) {
                                        const vitaminInfo = vitamin.vitamins.find(v => v.name.toLowerCase() === key);
                                        if (vitaminInfo) {
                                            return (
                                                <Button key={key} variant="text">
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}: {vitaminInfo.amount}
                                                </Button>
                                            );
                                        }
                                    }
                                    return null;
                                })}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} >
                        <Box display="flex" flexDirection="column" height="100%" gap={1}>
                            <Box mb="auto" display="flex" flexDirection="column" gap={1}>
                                <Button variant="contained" color="secondary">{vitamin.general_info.product_name}</Button>
                                <Button variant="text">Type: {vitamin.general_info.format}</Button>
                                <Button variant="text">Serving Size: {vitamin.general_info.serving_size}</Button>
                            </Box>
                            <Button variant="contained" onClick={handleToggleVitamins}>{showVitamins ? 'Hide Vitamins' : 'Show Vitamins'}</Button>
                        </Box>
                    </Grid>
                </Grid>
                <Collapse in={showVitamins}>
                    <Card sx={{ backgroundColor: 'white', border: '1px solid black', padding: '5px', marginTop: '10px' }}>
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
            </CardContent>
        </Card>
    );
}

export default VitaminCard;
