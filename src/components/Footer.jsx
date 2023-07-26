import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '5px',
            justifyContent: 'center',
            width: '100%',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            marginTop: 'auto',
        }}>
            <Typography variant="body2" color="text.secondary">
                Please consult with your physician before starting any new dietary supplement, including prenatal vitamins.
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Regardless of the score, any prenatal vitamin will always be better than no prenatal vitamin
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
                <Link href="mailto:usersemail" color="inherit">
                    Contact
                </Link>
            </Box>
        </Box >
    );
};

export default Footer;
