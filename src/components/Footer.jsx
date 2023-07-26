import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            marginTop: 'auto',
        }}>
            <Typography variant="body2" color="text.secondary">
                Disclaimer: This is an example disclaimer. Information on this website is provided for informational purposes only and is not intended as a substitute for the advice provided by your physician or other healthcare professional.
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
            }}>
                <Link href="https://www.example.com" color="inherit">
                    Privacy Policy
                </Link>
                <Link href="https://www.example.com" color="inherit">
                    Terms and Conditions
                </Link>
            </Box>
        </Box>
    );
};

export default Footer;
