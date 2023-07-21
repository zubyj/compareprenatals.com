import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Collapse, Grid, Box } from '@mui/material';

function VitaminCard({ vitamin, selectedVitamin }) {
    const [showVitamins, setShowVitamins] = useState(false);

    const handleToggleVitamins = () => {
        setShowVitamins(!showVitamins);
    };

    function extractFirstWordFromUrl(url) {
        try {
            let urlObject = new URL(url);
            let hostParts = urlObject.hostname.split('.');
            return hostParts.length > 1 ? hostParts[1].charAt(0).toUpperCase() + hostParts[1].slice(1) : hostParts[0];
        } catch (error) {
            console.warn(`Invalid URL: ${url}`);
            return url;  // Return the original string if it's not a valid URL
        }
    }

    return (
        <Card>
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Box display="flex" flexDirection="column" height="100%">
                            <Box mb="auto">
                                <Typography variant="h5">{vitamin.general_info.brand}</Typography>
                                {selectedVitamin && <Typography variant="subtitle1">{selectedVitamin}: {vitamin.vitamins.find(v => v.name === selectedVitamin).amount}</Typography>}
                            </Box>
                            <Box>
                                <Button variant="contained" onClick={handleToggleVitamins}>{showVitamins ? 'Hide Vitamins' : 'Show Vitamins'}</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} >
                        <Box display="flex" flexDirection="column" height="100%">
                            <Box mb="auto">
                                <Typography variant="subtitle1">Type: {vitamin.general_info.pill_type}</Typography>
                                <Typography variant="subtitle2">Serving Size: {vitamin.general_info.serving_size}</Typography>
                                <Typography variant="subtitle2">Price: ${vitamin.general_info.price}</Typography>
                                {/* Show the selected Vitamin */}
                                {/* <Typography variant="subtitle2">{vitamin.vitamin.</Typography> */}
                            </Box>
                            <Box>
                                <Button variant="contained" href={vitamin.general_info.url} target="_blank">Order From {extractFirstWordFromUrl(vitamin.general_info.url)}</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Collapse in={showVitamins}>
                    {vitamin.vitamins.map((vitaminInfo, index) => (
                        <Typography key={index} variant="body2">{vitaminInfo.name}: {vitaminInfo.amount}</Typography>
                    ))}
                </Collapse>
            </CardContent>
        </Card>
    );
}

export default VitaminCard;
