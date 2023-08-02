import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';

const Navbar = ({ scrollToFAQ }) => {

    return (
        <AppBar position="fixed" color="inherit" >
            <Box display={"flex"} textAlign={"center"} alignItems={"center"} justifyContent={"center"}>
                <Toolbar>
                    <Typography variant="caption" fontSize={16} paddingRight={2} component="div" >
                        ComparePrenatals.com
                    </Typography>
                    <Button color="inherit" onClick={scrollToFAQ}>FAQ</Button>
                    <Button color="inherit" href="mailto:compareprenatals@gmail.com">Contact</Button>
                </Toolbar>
            </Box>
        </AppBar >
    );
};

export default Navbar;
