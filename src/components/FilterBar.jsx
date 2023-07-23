import React from 'react';
import { TextField, Box, FormGroup, FormControlLabel, Switch, FormLabel, FormControl, Checkbox, RadioGroup, Radio } from '@mui/material';

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
                justifyContent: { xs: 'center' },
                alignItems: { xs: 'center', md: 'flex-start' },
                width: '100%',
                gap: 1,
            }}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Max Daily Serving Size</FormLabel>
                    <RadioGroup row name="servingSize" value={servingSize} onChange={(e, value) => onServingSizeChange(value)}>
                        <FormControlLabel value={1} control={<Radio />} label="1" />
                        <FormControlLabel value={2} control={<Radio />} label="2" />
                        <FormControlLabel value={3} control={<Radio />} label="3" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Format</FormLabel>
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox checked={format.includes('pill')} onChange={onFormatChange} name='pill' />}
                                label="Pill"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={format.includes('gummy')} onChange={onFormatChange} name='gummy' />}
                                label="Gummy"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={format.includes('powder')} onChange={onFormatChange} name='powder' />}
                                label="Liquids & Powders"
                            />
                        </FormGroup>
                    </FormControl>
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