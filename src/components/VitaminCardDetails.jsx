// VitaminCardDetails.jsx
import React from 'react';
import { Card, CardContent, Typography, Button, Collapse, Grid, Box, Table, TableRow, TableCell, TableBody, Modal } from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';

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
                    <Typography variant="h4" color="green">{vitamin.general_info.brand_name}</Typography>
                    <Typography variant="h5" color="secondary">{vitamin.general_info.product_name}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>

                        <Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'green', padding: '10px', borderRadius: '10px', color: 'white' }}>
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
