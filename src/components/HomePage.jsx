import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Box } from '@mui/material';
import { Typography } from '@mui/material';

import VitaminList from './VitaminList';
import Pagination from './Pagination';
import FilterBar from './FilterBar';

function HomePage() {
    const [vitamins, setVitamins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVitamins, setFilteredVitamins] = useState([]);
    const [searchParams] = useSearchParams();
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
            newFilteredVitamins = newFilteredVitamins.filter(vitamin => vitamin.general_info.brand.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        setFilteredVitamins(newFilteredVitamins);
    }, [vitamins, searchTerm]);

    // calculate starting and ending index for pagination
    const startIndex = (page - 1) * vitaminsPerPage;
    const endIndex = startIndex + vitaminsPerPage;
    const displayedVitamins = filteredVitamins.slice(startIndex, endIndex);

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
            <FilterBar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
            />
            <VitaminList vitamins={displayedVitamins} />
            <Pagination totalVitamins={filteredVitamins.length} vitaminsPerPage={vitaminsPerPage} />
        </Box>
    );
}

export default HomePage;
