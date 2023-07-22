import React, { useState } from 'react';
import { Slider, Typography } from '@mui/material';

function ServingSizeSlider({ onServingSizeChange }) {
    const [servingSize, setServingSize] = useState(1);

    const handleSliderChange = (event, newValue) => {
        setServingSize(newValue);
        onServingSizeChange(newValue);
    };

    return (
        <div>
            <Typography id="serving-size-slider" gutterBottom>
                Serving Size
            </Typography>
            <Slider
                min={1}
                max={3}
                step={1}
                value={servingSize}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                aria-labelledby="serving-size-slider"
            />
        </div>
    );
}

export default ServingSizeSlider;
