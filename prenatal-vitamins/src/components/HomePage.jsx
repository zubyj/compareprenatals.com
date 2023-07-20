import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import VitaminList from './VitaminList';
import Pagination from './Pagination';

function HomePage() {
    const [vitamins, setVitamins] = useState([]);
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1;
    const vitaminsPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('prenatal-vitamins.json');
            const data = await response.json();
            setVitamins(data);
        };
        fetchData();
    }, []);

    const startIndex = (page - 1) * vitaminsPerPage;
    const selectedVitamins = vitamins.slice(startIndex, startIndex + vitaminsPerPage);

    return (
        <>
            <VitaminList vitamins={selectedVitamins} />
            <Pagination totalVitamins={vitamins.length} vitaminsPerPage={vitaminsPerPage} />
        </>
    );
}

export default HomePage;
