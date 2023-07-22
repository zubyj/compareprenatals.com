import React from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import FilterTag from './FilterTag';
import ServingSizeSlider from './ServingSizeSlider'; // Import the new component

function FilterBar({
    searchTerm,
    onSearchChange,
    selectedVitamin,
    onVitaminChange,
    amount,
    onAmountChange,
    onFilterClick,
    vitaminOptions,
    filters,
    onFilterTagRemove,
    onServingSizeChange // Add a new prop to handle serving size changes
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
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'row' },
                gap: 3
            }} >
                <FormControl variant="outlined" fullWidth>
                    <InputLabel id="vitamin-label">Vitamin</InputLabel>
                    <Select labelId="vitamin-label" value={selectedVitamin} onChange={onVitaminChange} label="Vitamin">
                        {vitaminOptions.map((option) => (
                            <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField label="Amount" variant="outlined" type="number" value={amount} onChange={onAmountChange} fullWidth />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 5,
            }}>
                <ServingSizeSlider onServingSizeChange={onServingSizeChange} />
                <Button variant="contained" color="primary" onClick={onFilterClick} sx={{ mt: { xs: 2, sm: 0 } }}>Filter</Button>
            </Box>
            <TextField label="Search" variant="outlined" value={searchTerm} onChange={onSearchChange} fullWidth />
            <Box>
                {filters.map((filter, index) => (
                    <FilterTag key={index} filter={filter} onRemove={onFilterTagRemove} />
                ))}
            </Box>
        </Box >
    );
}

export default FilterBar;
