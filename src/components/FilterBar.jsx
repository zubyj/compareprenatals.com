import React from 'react';
import { TextField, Box, FormGroup, FormControlLabel, Switch, FormLabel, FormControl, Slider, RadioGroup, Radio } from '@mui/material';

function FilterBar({
    searchTerm,
    onSearchChange,
    switches, // New prop
    onSwitchChange, // New prop
    format, // New prop
    onFormatChange, // New prop
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

            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
                alignItems: { xs: 'center', md: 'flex-start' },
                width: '100%'
            }}>
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
                        sx={{ width: '100%' }}
                    />
                </FormControl>
                <FormControl component="fieldset" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <RadioGroup row name="format" value={format} onChange={(e, value) => onFormatChange(value)}>
                        <FormControlLabel value="pill" control={<Radio />} label="Pill" />
                        <FormControlLabel value="gummy" control={<Radio />} label="Gummy" />
                        <FormControlLabel value="powder" control={<Radio />} label="Powder" />
                    </RadioGroup>
                </FormControl>
            </Box>

            {/* Added VitaminSwitches functionality */}
            <FormGroup sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }
            }}>
                <FormControlLabel
                    control={<Switch checked={switches.choline} onChange={onSwitchChange} name="choline" />}
                    label="Choline > 300mg"
                />
                <FormControlLabel
                    control={<Switch checked={switches['omega-3']} onChange={onSwitchChange} name='omega-3' />}
                    label="Omega-3 > 200mg"
                />
                <FormControlLabel
                    control={<Switch checked={switches.iron} onChange={onSwitchChange} name="iron" />}
                    label="Iron > 18mg"
                />
                <FormControlLabel
                    control={<Switch checked={switches['folate, dfe']} onChange={onSwitchChange} name='folate, dfe' />}
                    label="Folate > 600mcg DFE"
                />
            </FormGroup>

            <TextField label="Search" variant="outlined" value={searchTerm} onChange={onSearchChange} fullWidth />
        </Box>
    );
}

export default FilterBar;
