import React from 'react';
import { FormGroup, FormControlLabel, Switch } from '@mui/material';

function VitaminSwitches({ switches, onSwitchChange }) {
    return (
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
    );
}

export default VitaminSwitches;
