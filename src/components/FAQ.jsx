import React, { forwardRef, useState } from 'react';
import { Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const FAQ = forwardRef((props, ref) => {
    const [expanded, setExpanded] = useState(null);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box id="faqSection" paddingTop="100px" display="flex" flexDirection="column" ref={ref}>
            <Typography variant="button" fontSize={30} marginBottom={3}>FAQ</Typography>
            <Typography variant="caption">
                Here are some frequently asked questions about prenatal vitamins.
            </Typography>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
                <AccordionSummary
                    expandIcon={expanded === 'panel1' ? <CloseIcon /> : <AddIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="body1" fontWeight={600} padding={2}>What nutrients should a prenatal vitamin contain?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        A good prenatal vitamin should contain folic acid, iron, and calcium. Additional nutrients such as iodine, vitamin D, and omega-3 fatty acids may also be beneficial.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={expanded === 'panel2' ? <CloseIcon /> : <AddIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant="body1" fontWeight={600} padding={2}>Why is the serving size important when choosing a prenatal vitamin?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        The serving size can affect how much of each nutrient you get. Some vitamins require multiple servings per day to achieve the stated nutrient amounts.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={expanded === 'panel3' ? <CloseIcon /> : <AddIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography variant="body1" fontWeight={600} padding={2}>How does the format (pill, gummy, liquid) affect the effectiveness of a prenatal vitamin?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        The format can affect how well your body absorbs the nutrients. Pills can contain more nutrients, but gummies and liquids can be easier to absorb. However, gummies often lack iron.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={expanded === 'panel4' ? <CloseIcon /> : <AddIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                >
                    <Typography variant="body1" fontWeight={600} padding={2}>What does the nutrition score indicate?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        The nutrition score is a measure of how well a prenatal vitamin meets the recommended daily intake for key nutrients. A higher score indicates a more nutritionally complete vitamin.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
});

export default FAQ;
