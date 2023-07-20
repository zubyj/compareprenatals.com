import React from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function FilterBar({ searchTerm, onSearchChange, selectedVitamin, onVitaminChange, amount, onAmountChange, onFilterClick, vitaminOptions }) {
    return (
        <div>
            <TextField label="Search" variant="outlined" value={searchTerm} onChange={onSearchChange} />
            <FormControl variant="outlined">
                <InputLabel id="vitamin-label">Vitamin</InputLabel>
                <Select labelId="vitamin-label" value={selectedVitamin} onChange={onVitaminChange} label="Vitamin">
                    {vitaminOptions.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField label="Amount" variant="outlined" type="number" value={amount} onChange={onAmountChange} />
            <Button variant="contained" color="primary" onClick={onFilterClick}>Filter</Button>
        </div>
    );
}

export default FilterBar;
