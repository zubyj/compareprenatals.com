import React from 'react';
import { useState } from 'react';

import { Box, FormGroup, FormControlLabel, Switch, FormLabel, FormControl, Checkbox, RadioGroup, Radio, Button, Autocomplete, TextField } from '@mui/material';

function FilterBar({
    switches,
    onSwitchChange,
    format,
    onFormatChange,
    servingSize,
    onServingSizeChange,
    onSaveFilters,
    onCancelChanges,
    handleResetFilters,
    vitamins,
    setFilteredVitamins,
}) {

    const [searchText, setSearchText] = useState(""); // Hold the current value of the search textfield

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleResetFilters();
            setFilteredVitamins(vitamins.filter(vitamin =>
                vitamin.general_info.brand_name.toLowerCase().includes(searchText.toLowerCase()) ||
                vitamin.general_info.product_name.toLowerCase().includes(searchText.toLowerCase())
            ));
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column' },
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingY: '30px',
            marginY: '30px',
            border: '1px solid black',

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
                    <FormGroup row >
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
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingY: '20px',
            }}
            >
                <Button onClick={onSaveFilters} variant="contained" color="success">
                    Save
                </Button>
                <Button onClick={onCancelChanges} variant="contained" color="error">
                    Cancel
                </Button>
            </Box>
            <Autocomplete
                id="vitamin-search"
                options={vitamins}
                getOptionLabel={(option) => option.general_info.brand_name + ' ' + option.general_info.product_name}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Vitamin Search" variant="outlined"
                    onKeyDown={handleKeyDown}
                    onChange={(event) => setSearchText(event.target.value)} // Update searchText when the textfield value changes
                />}
                onChange={(event, newValue) => {
                    // newValue is the selected vitamin
                    if (newValue) {
                        // clear any existing filters
                        handleResetFilters();
                        // filter vitamins by the selected vitamin's brand_name and product_name
                        setFilteredVitamins(vitamins.filter(vitamin =>
                            vitamin.general_info.brand_name === newValue.general_info.brand_name &&
                            vitamin.general_info.product_name === newValue.general_info.product_name
                        ));
                    }
                }}
            />
        </Box >
    );
}

export default FilterBar;
