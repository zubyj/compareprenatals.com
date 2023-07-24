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

    // Divide vitamin array into chunks of 2
    const vitaminChunks = chunk(vitamin.vitamins, 2);

    return (
        <Card >
            <CardContent>
                <Grid container paddingY={3}>
                    <Grid item xs={6}>
                        <Box display="flex" flexDirection="column" height="100%">
                            <Box mb="auto">
                                <Button variant="text" color="primary">{vitamin.general_info.brand_name}</Button>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',

                                }}>
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
                        </Box>
                    </Grid>
                    <Grid item xs={6} >
                        <Box display="flex" flexDirection="column" height="100%" gap={1}>
                            <Box mb="auto" display="flex" flexDirection="column" gap={1}>
                                <Button variant="text" color="secondary">{vitamin.general_info.product_name}</Button>
                                <Button variant="outlined">Type: {vitamin.general_info.format}</Button>
                                <Button variant="outlined">Serving Size: {vitamin.general_info.serving_size}</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    paddingY: '10px',
                }}>
                    <Button variant="contained" color="success" href={vitamin.general_info.url} target='_blank'>Add to Cart</Button>
                    <Button variant="contained" onClick={handleToggleVitamins}>{showVitamins ? 'Hide Vitamins' : 'Show Vitamins'}</Button>
                </Box>
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
                <hr />
            </CardContent>
        </Card >
    );
}

export default VitaminCard;
