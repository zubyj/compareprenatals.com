import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Button, Typography, Autocomplete, TextField } from '@mui/material';

import VitaminList from './VitaminList';
import Pagination from './Pagination';
import FilterBar from './FilterBar';

function HomePage() {
    const [vitamins, setVitamins] = useState([]);
    const [filteredVitamins, setFilteredVitamins] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [vitaminSwitches, setVitaminSwitches] = useState({
        'choline': false,
        'omega-3': false,
        'iron': false,
        'folate, dfe': false,
    });
    const [format, setFormat] = useState(['pill', 'gummy', 'powder']);
    const [servingSize, setServingSize] = useState(3);
    const [savedFilters, setSavedFilters] = useState({ vitaminSwitches, format, servingSize });

    const [showFilterBar, setShowFilterBar] = useState(false);
    const page = parseInt(searchParams.get('page')) || 1;
    const vitaminsPerPage = 5;

    const [searchText, setSearchText] = useState(""); // Hold the current value of the search textfield


    const handleSaveFilters = () => {
        setSavedFilters({
            vitaminSwitches: { ...vitaminSwitches },
            format: [...format],
            servingSize: servingSize
        });
        setShowFilterBar(false);
    };

    const handleCancelChanges = () => {
        const { vitaminSwitches, format, servingSize } = savedFilters;
        setVitaminSwitches(vitaminSwitches);
        setFormat(format);
        setServingSize(servingSize);
        setShowFilterBar(false);
    };

    const handleResetFilters = () => {
        setVitaminSwitches({
            'choline': false,
            'omega-3': false,
            'iron': false,
            'folate, dfe': false,
        });
        setFormat(['pill', 'gummy', 'powder']);
        setServingSize(3);
        setFilteredVitamins(vitamins); // Reset the filteredVitamins to the original vitamins
        setShowFilterBar(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleResetFilters();
            setFilteredVitamins(vitamins.filter(vitamin =>
                vitamin.general_info.brand_name.toLowerCase().includes(searchText.toLowerCase()) ||
                vitamin.general_info.product_name.toLowerCase().includes(searchText.toLowerCase())
            ));
        }
    };

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
        const { vitaminSwitches, format, servingSize } = savedFilters;

        // apply filter based on serving size
        if (servingSize) {
            newFilteredVitamins = newFilteredVitamins.filter(vitamin =>
                vitamin.general_info.serving_size >= servingSize);
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

        if (format.length) {
            newFilteredVitamins = newFilteredVitamins.filter(vitamin =>
                format.some(f => vitamin.general_info.format.toLowerCase() === f)
            );
        }

        setFilteredVitamins(newFilteredVitamins);

        // Reset the page to 1 when a filter changes
        setSearchParams({ page: 1 }, "push");
    }, [vitamins, savedFilters]);

    const startIndex = (page - 1) * vitaminsPerPage;
    const endIndex = startIndex + vitaminsPerPage;
    const displayedVitamins = filteredVitamins.slice(startIndex, endIndex);

    const handleSwitchChange = (event) => {
        setVitaminSwitches({
            ...vitaminSwitches,
            [event.target.name]: event.target.checked
        });
    };

    const handleFormatChange = (event) => {
        if (event.target.checked) {
            setFormat(prevFormat => [...prevFormat, event.target.name]);
        } else {
            setFormat(prevFormat => prevFormat.filter(f => f !== event.target.name));
        }
    };



    return (
        <Box sx={{
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0',
            margin: 'auto',
            marginTop: '5vh',
            marginBottom: '5vh',
            fontFamily: "'Arial Black', 'Helvetica Bold', sans-serif",
        }}>
            <Typography variant="h4" paddingBottom="20px">Prenatal Vitamins</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingY: '20px',
            }}>
                <Button onClick={() => setShowFilterBar(!showFilterBar)} variant="contained" >
                    {showFilterBar ? 'Hide Filters' : 'Filter'}
                </Button>
                <Button onClick={handleResetFilters} variant="contained" color="error">
                    Reset
                </Button>

            </Box>
            {showFilterBar ? (
                <>
                    <FilterBar
                        switches={vitaminSwitches} // Passed switches to FilterBar
                        onSwitchChange={handleSwitchChange} // Passed handleSwitchChange to FilterBar
                        format={format} // Passed format to FilterBar
                        onFormatChange={handleFormatChange} // Passed handleFormatChange to FilterBar
                        servingSize={servingSize} // Passed servingSize to FilterBar
                        onServingSizeChange={(value) => setServingSize(value)}
                        handleResetFilters={handleResetFilters} // Passed handleResetFilters to FilterBar
                        onSaveFilters={handleSaveFilters}
                        onCancelChanges={handleCancelChanges}
                        vitamins={vitamins}
                        setFilteredVitamins={setFilteredVitamins} // Newly added

                    />
                </>
            ) : null}
            <Autocomplete
                id="vitamin-search"
                options={vitamins}
                getOptionLabel={(option) => option.general_info.brand_name + ' ' + option.general_info.product_name}
                style={{ width: '300px', textAlign: 'center', margin: 'auto', marginTop: '20px' }}
                renderInput={(params) => <TextField {...params} label="Vitamin Search" variant="outlined"
                    onKeyDown={handleKeyDown}
                    onChange={(event) => setSearchText(event.target.value)} // Update searchText when the textfield value changes
                />}
                onChange={(event, newValue) => {
                    // newValue is the selected vitamin
                    if (newValue) {
                        // clear any existing filters
                        handleResetFilters();
                        // filter vitamins by the selected vitamin's brand_name and product_name
                        setFilteredVitamins(vitamins.filter(vitamin =>
                            vitamin.general_info.brand_name === newValue.general_info.brand_name &&
                            vitamin.general_info.product_name === newValue.general_info.product_name
                        ));
                    }
                }}
            />
            <br />
            <VitaminList vitamins={displayedVitamins} vitaminSwitches={vitaminSwitches} />
            <Pagination totalVitamins={filteredVitamins.length} vitaminsPerPage={vitaminsPerPage} />
        </Box>
    );
}

export default HomePage;
