import React from 'react';
import { TextField, Box } from '@mui/material';

function FilterBar({
    searchTerm,
    onSearchChange,
}) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            m: 2
        }}>
            <TextField label="Search" variant="outlined" value={searchTerm} onChange={onSearchChange} fullWidth />
        </Box >
    );
}

export default FilterBar;
