import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Prenatal Vitamins
                </Typography>
                <Button color="inherit" component={Link} to="/#faq">FAQ</Button>
                <Button color="inherit" href="mailto:usersemail">Contact</Button> {/*Replace usersemail with actual email*/}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
