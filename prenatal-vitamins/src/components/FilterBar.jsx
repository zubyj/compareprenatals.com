import React from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';

function FilterBar({ searchTerm, onSearchChange, selectedVitamin, onVitaminChange, amount, onAmountChange, onFilterClick, vitaminOptions }) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            m: 2
        }}>
            <TextField label="Search" variant="outlined" value={searchTerm} onChange={onSearchChange} fullWidth />
            <FormControl variant="outlined" fullWidth>
                <InputLabel id="vitamin-label">Vitamin</InputLabel>
                <Select labelId="vitamin-label" value={selectedVitamin} onChange={onVitaminChange} label="Vitamin">
                    {vitaminOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField label="Amount" variant="outlined" type="number" value={amount} onChange={onAmountChange} fullWidth />
            <Button variant="contained" color="primary" onClick={onFilterClick} sx={{ mt: { xs: 2, sm: 0 } }}>Filter</Button>
        </Box>
    );
}

export default FilterBar;
