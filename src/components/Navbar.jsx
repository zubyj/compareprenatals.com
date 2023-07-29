import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';

const Navbar = ({ scrollToFAQ }) => {

    return (
        <AppBar position="fixed" color="inherit" >
            <Box display={"flex"} textAlign={"center"} alignItems={"center"} justifyContent={"center"}>

                <Toolbar>
                    <Typography variant="caption" fontSize={20} component="div" >
                        Compare Prenatals
                    </Typography>
                    <Button color="inherit" onClick={scrollToFAQ}>FAQ</Button>
                    <Button color="inherit" href="mailto:usersemail">Contact</Button> {/*Replace usersemail with actual email*/}
                </Toolbar>
            </Box>
        </AppBar >
    );
};

export default Navbar;
