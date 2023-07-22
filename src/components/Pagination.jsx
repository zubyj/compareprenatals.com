import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function Pagination({ totalVitamins, vitaminsPerPage }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1;
    const totalPages = Math.ceil(totalVitamins / vitaminsPerPage);

    const handleChange = (event, value) => {
        navigate(`/?page=${value}`);
    };

    return <MuiPagination count={totalPages} page={page} onChange={handleChange} />;
}

export default Pagination;
