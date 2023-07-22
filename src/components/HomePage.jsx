import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import VitaminList from './VitaminList';
import Pagination from './Pagination';
import FilterBar from './FilterBar';

function HomePage() {
    const [vitamins, setVitamins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVitamins, setFilteredVitamins] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [vitaminSwitches, setVitaminSwitches] = useState({
        'choline': false,
        'omega-3': false,
        'iron': false,
        'folate, dfe': false,
    });
    const [format, setFormat] = useState('');
    const [showFilterBar, setShowFilterBar] = useState(false);
    const [servingSize, setServingSize] = useState([1, 3]);
    const page = parseInt(searchParams.get('page')) || 1;
    const vitaminsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            const jsonFilePath = process.env.NODE_ENV === 'development' ? 'test/prenatal-vitamins.json' : 'prenatal-vitamins.json';
            const response = await fetch(jsonFilePath);
            const data = await response.json();
            setVitamins(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        let newFilteredVitamins = vitamins;

        if (searchTerm) {
            newFilteredVitamins = newFilteredVitamins.filter(vitamin =>
                vitamin.general_info.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // apply filter based on serving size
        if (servingSize) {
            newFilteredVitamins = newFilteredVitamins.filter(vitamin =>
                vitamin.general_info.serving_size >= servingSize[0] &&
                vitamin.general_info.serving_size <= servingSize[1]
            );
        }

        // apply filter based on vitamin switches
        if (vitaminSwitches['choline']) {
            newFilteredVitamins = newFilteredVitamins.filter(vitamin =>
                vitamin.vitamins.some(v => v.name.toLowerCase() === 'choline' && parseInt(v.amount) > 300)
            );
        }
        if (vitaminSwitches['omega-3']) { // change 'omega3' to 'omega-3'
            newFilteredVitamins = newFilteredVitamins.filter(vitamin =>
                vitamin.vitamins.some(v => v.name.toLowerCase() === 'omega-3' && parseInt(v.amount) > 200)
            );
        }
        if (vitaminSwitches['iron']) {
            newFilteredVitamins = newFilteredVitamins.filter(vitamin =>
                vitamin.vitamins.some(v => v.name.toLowerCase() === 'iron' && parseInt(v.amount) > 18)
            );
        }
        if (vitaminSwitches['folate, dfe']) { // change 'folate' to 'folate, dfe'
            newFilteredVitamins = newFilteredVitamins.filter(vitamin =>
                vitamin.vitamins.some(v => v.name.toLowerCase() === 'folate, dfe' && parseInt(v.amount) > 600)
            );
        }

        // apply filter based on pill type
        if (format) {
            newFilteredVitamins = newFilteredVitamins.filter(vitamin =>
                vitamin.general_info.format.toLowerCase() === format.toLowerCase()
            );
        }

        setFilteredVitamins(newFilteredVitamins);

        // Reset the page to 1 when a filter changes
        setSearchParams({ page: 1 }, "push");
    }, [vitamins, searchTerm, vitaminSwitches, format, servingSize]); // add servingSize

    useEffect(() => {
        setSearchParams({ page: 1 }, "push");
    }, [searchTerm]);

    const startIndex = (page - 1) * vitaminsPerPage;
    const endIndex = startIndex + vitaminsPerPage;
    const displayedVitamins = filteredVitamins.slice(startIndex, endIndex);

    const handleSwitchChange = (event) => {
        setVitaminSwitches({
            ...vitaminSwitches,
            [event.target.name]: event.target.checked
        });
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            minHeight: '100vh',
            paddingTop: '10vh',
            paddingBottom: '10vh',
        }}>
            <Typography variant="h4">Prenatal Vitamins</Typography>
            <Button onClick={() => setShowFilterBar(!showFilterBar)} variant="contained">
                {showFilterBar ? 'Hide Filters' : 'Show Filters'}
            </Button>
            {showFilterBar ? (
                <>
                    <FilterBar
                        searchTerm={searchTerm}
                        onSearchChange={(e) => setSearchTerm(e.target.value)}
                        switches={vitaminSwitches} // Passed switches to FilterBar
                        onSwitchChange={handleSwitchChange} // Passed handleSwitchChange to FilterBar
                        format={format} // Passed format to FilterBar
                        onFormatChange={(e) => setFormat(e)} // Passed a function that sets format based on event value
                        servingSize={servingSize} // Passed servingSize to FilterBar
                        onServingSizeChange={(value) => setServingSize(value)}
                    />
                </>
            ) : null}
            <VitaminList vitamins={displayedVitamins} vitaminSwitches={vitaminSwitches} />
            <Pagination totalVitamins={filteredVitamins.length} vitaminsPerPage={vitaminsPerPage} />
        </Box>
    );
}

export default HomePage;
