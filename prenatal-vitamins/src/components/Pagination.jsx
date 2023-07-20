import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Pagination({ totalVitamins, vitaminsPerPage }) {
    const navigate = useNavigate();
    const totalPages = Math.ceil(totalVitamins / vitaminsPerPage);

    const handleChange = (event, value) => {
        navigate(`/?page=${value}`);
    };

    return <MuiPagination count={totalPages} onChange={handleChange} />;
}

export default Pagination;
