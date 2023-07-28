// EmailPopup.jsx

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

function EmailPopup({ open, onClose }) { // Accept open and onClose as props
    const [email, setEmail] = useState('');

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Submitted email: ${email}`);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Stay Connected</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button> {/* Call onClose when the Cancel button is clicked */}
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default EmailPopup;
