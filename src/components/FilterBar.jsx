import React from 'react';

import { Box, FormGroup, FormControlLabel, Switch, FormLabel, FormControl, Checkbox, RadioGroup, Radio, Button } from '@mui/material';

function FilterBar({
    switches,
    onSwitchChange,
    format,
    onFormatChange,
    servingSize,
    onServingSizeChange,
    onSaveFilters,
    handleResetFilters,
}) {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column' },
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginY: '30px',
            border: '1px solid black',
            padding: '20px 5px',
            gap: '20px',
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
                    <FormLabel component="legend">Prenatal Format Filters</FormLabel>
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
            <FormLabel component="legend">Prenatal Nutrient Filters</FormLabel>
            <FormGroup sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
            }}>

                <FormControlLabel
                    control={<Switch checked={switches.choline} onChange={onSwitchChange} name="choline" />}
                    label="Choline > 300mg"
                    backgroundColor="red"
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
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '20px',
            }}
            >
                <Button onClick={onSaveFilters} variant="contained">
                    Save
                </Button>
                <Button onClick={handleResetFilters} variant="contained" color="error">
                    Reset
                </Button>
            </Box>

        </Box >
    );
}

export default FilterBar;
