import React from 'react';
import { Chip } from '@mui/material';

function ActiveFilterTag({ filter, onClose }) {
    return (
        <Chip
            label={`${filter.name} > ${filter.value}`}
            onDelete={onClose}
            color="primary"
            variant="outlined"
        />
    );
}

export default ActiveFilterTag;
