// VitaminCardDetails.jsx
import React from 'react';
import { Card, CardContent, Typography, Button, Collapse, Grid, Box, Table, TableRow, TableCell, TableBody, Modal } from '@mui/material';

function VitaminCardDetails({ vitamin, showVitamins, handleToggleVitamins, open, handleClose }) {
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
                'flexDirection': 'column',
                'justifyContent': 'center',
                'alignItems': 'center',
                'borderRadius': '5px',
                'backgroundColor': 'rgba(0,0,0,0.5)',
            }}
        >
            <Card  >
                <CardContent sx={{
                    'display': 'flex',
                    'flexDirection': 'column',
                    'alignItems': 'center',
                    'justifyContent': 'center',
                    'gap': '40px',
                    'width': '80vw',
                    'height': '60vh',
                }} >
                    <Typography variant="h3" color="green">{vitamin.general_info.brand_name}</Typography>
                    <Typography variant="h5" color="green">{vitamin.general_info.product_name}</Typography>
                    <Box display="flex" flexDirection="column" gap={1} justifyContent="center" alignItems="center">
                        <Typography variant="subtitle2" color="white" >{vitamin.general_info.product_name}</Typography>
                        <Box display="flex" flexDirection="row" gap="20px">
                            <Card >
                                <Typography variant="h5">
                                    {vitamin.general_info.score || '-'}/10
                                </Typography>

                            </Card>
                            <Card>
                                <Typography variant="h5" >{vitamin.general_info.format}</Typography>
                            </Card>
                            <Card>
                                <Typography variant="h5">{vitamin.general_info.serving_size}</Typography>
                            </Card>
                        </Box>
                    </Box>
                    <Button variant="contained" color="secondary" href={vitamin.general_info.url} target='_blank'>Buy for ${vitamin.general_info.price}</Button>
                    <Button variant="contained" onClick={handleToggleVitamins}>{showVitamins ? 'Hide Vitamins' : 'Show Vitamins'}</Button>
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
