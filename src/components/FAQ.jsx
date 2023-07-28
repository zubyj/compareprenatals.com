import React, { forwardRef } from 'react';
import { Typography, Box } from '@mui/material';

const FAQ = forwardRef((props, ref) => {
    return (
        <Box id="faqSection" paddingTop="100px" ref={ref}>
            <Typography variant="h4">FAQ</Typography>
            <Typography variant="h6" marginTop="20px">Question 1?</Typography>
            <Typography variant="body1">Answer 1</Typography>
            <Typography variant="h6" marginTop="20px">Question 2?</Typography>
            <Typography variant="body1">Answer 2</Typography>
            {/* Add more questions and answers */}
        </Box>
    );
});

export default FAQ;
