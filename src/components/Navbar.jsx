import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = ({ scrollToFAQ }) => {

    return (
        <AppBar position="fixed" color="inherit">
            <Toolbar >
                <Typography variant="caption" fontSize={20} component="div" sx={{ flexGrow: 1 }} >
                    Compare Prenatals
                </Typography>
                <Button color="inherit" onClick={scrollToFAQ}>FAQ</Button>
                <Button color="inherit" href="mailto:usersemail">Contact</Button> {/*Replace usersemail with actual email*/}
            </Toolbar>
        </AppBar >
    );
};

export default Navbar;
