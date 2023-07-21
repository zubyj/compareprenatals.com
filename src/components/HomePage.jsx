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
    const [selectedVitamin, setSelectedVitamin] = useState('');
    const [amount, setAmount] = useState('');
    const [filteredVitamins, setFilteredVitamins] = useState([]);
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1;
    const vitaminsPerPage = 5;

    const [filters, setFilters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const jsonFilePath = process.env.NODE_ENV === 'development' ? 'test/prenatal-vitamins.json' : 'prenatal_vitamins.json';
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

        filters.forEach(filter => {
            newFilteredVitamins = newFilteredVitamins.filter(vitamin => {
                const vitaminInfo = vitamin.vitamins.find(v => v.name === filter.vitamin);
                return vitaminInfo && parseFloat(vitaminInfo.amount) >= parseFloat(filter.amount);
            });
        });

        setFilteredVitamins(newFilteredVitamins);
    }, [vitamins, searchTerm, filters]);

    const addFilter = () => {
        if (selectedVitamin && amount) {
            setFilters(oldFilters => {
                const existingFilter = oldFilters.find(
                    filter => filter.vitamin === selectedVitamin && filter.amount === amount
                );
                if (!existingFilter) {
                    return [...oldFilters, { vitamin: selectedVitamin, amount }];
                }
                return oldFilters;
            });
        }
    };

    const handleFilterTagRemove = (removedFilter) => {
        setFilters(filters.filter(filter => filter !== removedFilter));
        setFilteredVitamins(vitamins);
    };

    const startIndex = (page - 1) * vitaminsPerPage;
    const selectedVitamins = filteredVitamins.slice(startIndex, startIndex + vitaminsPerPage);

    const vitaminOptions = [...new Set(vitamins.flatMap(vitamin => vitamin.vitamins.map(v => v.name)))];

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
                selectedVitamin={selectedVitamin}
                onVitaminChange={(e) => setSelectedVitamin(e.target.value)}
                amount={amount}
                onAmountChange={(e) => setAmount(e.target.value)}
                onFilterClick={addFilter}
                vitaminOptions={vitaminOptions}
                filters={filters}
                onFilterTagRemove={handleFilterTagRemove}
            />
            <VitaminList vitamins={selectedVitamins} selectedVitamin={selectedVitamin} />
            <Pagination totalVitamins={filteredVitamins.length} vitaminsPerPage={vitaminsPerPage} />
        </Box>
    );
}

export default HomePage;
