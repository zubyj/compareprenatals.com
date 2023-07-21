import React from 'react';
import { Chip } from '@mui/material';

function FilterTag({ filter, onRemove }) {
    const handleRemove = () => {
        onRemove(filter);
    };

    return (
        <Chip
            label={`${filter.vitamin}: ${filter.amount}`}
            onDelete={handleRemove}
            color="primary"
            variant="outlined"
        />
    );
}

export default FilterTag;
