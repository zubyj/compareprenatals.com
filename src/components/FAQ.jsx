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
            <Typography variant="h2" fontWeight={800} fontSize={25}>
                FAQ
            </Typography>
            <Typography variant="caption" padding={3}>
                Here are some frequently asked questions about prenatal vitamins.
            </Typography>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
                <AccordionSummary
                    expandIcon={expanded === 'panel1' ? <CloseIcon /> : <AddIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="body1" fontWeight={600} padding={2}>Is there such a thing as too much Vitamin A?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        There are two types of Vitamin A, preformed Vitamin A (which includes retinols & retinyls) and carotenoids (which includes beta carotenes). The FDA has set an upper limit of 3000 mcg of preformed Vitamin A during pregnancy, but there is no limit set for carotenoids. It is very rare to find a prenatal vitamin that comes close to this upper limit of preformed Vitamin A.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={expanded === 'panel2' ? <CloseIcon /> : <AddIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant="body1" fontWeight={600} padding={2}>What are the most important nutrients to check for in my prenatal vitamin?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Folate 600 mcg DFE, Iron 27 mg, Omega-3 (DHA & EPA) 200mg+, Choline 300mg
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={expanded === 'panel3' ? <CloseIcon /> : <AddIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography variant="body1" fontWeight={600} padding={2}>Why are so many prenatal vitamins missing calcium?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Calcium can inhibit the absorption of iron. Since calcium is much easier to get from diet than iron is, most prenatals leave out calcium. Avoid ingesting dairy or calcium products within 2 hours of taking an iron containing supplement, to ensure highest possible absorption of iron.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={expanded === 'panel4' ? <CloseIcon /> : <AddIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                >
                    <Typography variant="body1" fontWeight={600} padding={2}>Why is my prenatal vitamin making me nauseous or constipated?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Prenatal vitamins can make people nauseous for a few reasons, but the most common reason is due to the iron. Iron can cause nauseating or constipating effects, however, iron is a critical building block to make red blood cells and prevent anemia. Look for a prenatal with an iron in a chelated form such as ferrous bisglycinate or iron chelate. Nauseating symptoms can also be caused by poor smells, tastes, or size of pills.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary
                    expandIcon={expanded === 'panel5' ? <CloseIcon /> : <AddIcon />}
                    aria-controls="panel5a-content"
                    id="panel5a-header"
                >
                    <Typography variant="body1" fontWeight={600} padding={2}>How are the nutrient thresholds & warnings defined?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Almost all of our nutrient thresholds are defined by the FDA’s daily value’s set for pregnant & lactating women. However, we have chosen to not include low warnings for Calcium as Calcium is very rare to find in prenatal vitamins as it can inhibit iron absorption and no prenatal vitamin can provide a full daily amount of Calcium. Also, we did not include warnings for Magnesium as no prenatal vitamin provides a full daily amount of Magnesium. We set the threshold for Choline to 231 mg because the FDA recommends an intake 550 mg of Choline per day when pregnant or lactating, but studies show that pregnant women already consume 319 mg of Choline via diet.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
});

export default FAQ;
