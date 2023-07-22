import React from 'react';
import { TextField, Box, FormGroup, FormControlLabel, Switch, FormLabel, FormControl, Slider, RadioGroup, Radio } from '@mui/material';

function FilterBar({
    searchTerm,
    onSearchChange,
    switches, // New prop
    onSwitchChange, // New prop
    pillType, // New prop
    onPillTypeChange, // New prop
    servingSize, // New prop
    onServingSizeChange, // New prop
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

            {/* Added VitaminSwitches functionality */}
            <FormGroup row>
                <FormControlLabel
                    control={<Switch checked={switches.choline} onChange={onSwitchChange} name="choline" />}
                    label="Choline > 300mg"
                />
                <FormControlLabel
                    control={<Switch checked={switches.omega3} onChange={onSwitchChange} name="omega3" />}
                    label="Omega-3 > 200mg"
                />
                <FormControlLabel
                    control={<Switch checked={switches.iron} onChange={onSwitchChange} name="iron" />}
                    label="Iron > 18mg"
                />
                <FormControlLabel
                    control={<Switch checked={switches.folate} onChange={onSwitchChange} name="folate" />}
                    label="Folate > 600mcg DFE"
                />
            </FormGroup>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <FormControl component="fieldset" sx={{ width: '45%' }}>
                    <FormLabel component="legend">Max Vitamins per day</FormLabel>
                    <Slider
                        value={servingSize}
                        min={1}
                        max={3}
                        step={1}
                        onChange={(_, value) => onServingSizeChange(value)}
                        valueLabelDisplay="auto"
                        getAriaValueText={value => `${value[0]} - ${value[1]} servings`}
                        sx={{ width: '60%' }} // Set width to 100%
                    />
                </FormControl>
                <FormControl component="fieldset" sx={{ width: '45%' }}>
                    <RadioGroup row name="pillType" value={pillType} onChange={(e, value) => onPillTypeChange(value)}>
                        <FormControlLabel value="pill" control={<Radio />} label="Pill" />
                        <FormControlLabel value="gummy" control={<Radio />} label="Gummy" />
                        <FormControlLabel value="powder" control={<Radio />} label="Powder" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Box>
    );
}

export default FilterBar;
