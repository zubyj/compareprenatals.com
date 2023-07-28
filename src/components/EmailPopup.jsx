import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

function EmailPopup() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');

    // Function to handle email change
    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Submit the email to your server or service here
        console.log(`Submitted email: ${email}`);
        setOpen(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        }, 10000); // 10000 ms = 10 seconds. Adjust this value as needed.
        return () => clearTimeout(timer); // This will clear the timer if the component is unmounted before the timer ends.
    }, []);

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
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
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default EmailPopup;
