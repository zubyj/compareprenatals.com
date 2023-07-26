import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Collapse, Grid, Box, Table, TableRow, TableCell, TableBody, ButtonGroup, Modal } from '@mui/material';

function VitaminCard({ vitamin, vitaminSwitches }) {
    const [showVitamins, setShowVitamins] = useState(false);
    const [open, setOpen] = useState(false);

    const handleToggleVitamins = () => {
        setShowVitamins(!showVitamins);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const VitaminCardDetails = (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                'paddingY': 3,
                'container': true,
                'display': 'flex',
                'flexDirection': 'column',
                'justifyContent': 'center',
                'alignItems': 'center',
                'borderRadius': '5px',
            }}
        >
            <Card  >
                <Button variant="contained" color="primary">
                    <CardContent >
                        <Grid
                        >
                            <Box display="flex" flexDirection="row">
                                <Box mb="auto">
                                    <Button variant="contained" color="primary">{vitamin.general_info.brand_name}</Button>
                                    <Button variant="contained" color="secondary">{vitamin.general_info.product_name}</Button>
                                </Box>
                            </Box>
                        </Grid>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            paddingY: '10px',
                        }}>

                            <Button variant="contained" color="success" href={vitamin.general_info.url} target='_blank'>Buy for ${vitamin.general_info.price}</Button>
                            <Button variant="contained" onClick={handleToggleVitamins}>{showVitamins ? 'Hide Vitamins' : 'Show Vitamins'}</Button>
                        </Box>
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
                </Button>
            </Card >
        </Modal>
    );

    return (
        <>
            <Card>
                <Button onClick={handleOpen} variant="contained" color="success" sx={{
                    'width': '95vw',
                    'paddingY': '10px',
                    'marginY': '10px',
                    'height': '200px',
                    'borderRadius': '20px',
                }}>
                    <CardContent >
                        <Grid>
                            <Box sx={{
                                'display': 'flex',
                                'flexDirection': 'row',
                                'justifyContent': 'center',
                                'alignItems': 'center',
                                'gap': '20px',
                            }}>
                                <Typography variant="h5" fontSize={"25px"} >{vitamin.general_info.brand_name}</Typography>
                                <Box display="flex" flexDirection="column" gap={1}>
                                    <Typography variant="subtitle2" color="white" >{vitamin.general_info.product_name}</Typography>
                                    <Card>
                                        <Box display="flex" flexDirection="row" gap={2}>
                                            <Typography variant="subtitle2" >{vitamin.general_info.score || '-'}</Typography>
                                            <Typography variant="subtitle2" >{vitamin.general_info.format}</Typography>
                                            <Typography variant="subtitle2">{vitamin.general_info.serving_size}</Typography>
                                        </Box>
                                    </Card>
                                </Box>
                            </Box>
                        </Grid>
                    </CardContent >
                </Button >
                {VitaminCardDetails}
            </Card >
        </>
    )
}
export default VitaminCard;
