import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { Link } from 'react-router-dom';


export default function AutocompleteInput(props) {
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);


    const fetchResults = async () => {
        const response = await axios.get(`${props.apiUrl}?query=${inputValue}`);
        setResults(response.data);
    };

    useEffect(() => {
        fetchResults();
    }, [inputValue]);


    const onProductSelect = (event, value) => {
        setSelectedProduct(value);
    }

    return (
        <div>
            <Autocomplete
                id="src"
                autoHighlight
                getOptionLabel={(product) => product.productname || ""}
                options={results}
                onChange={onProductSelect}
                sx={{ width: 300 }}
                noOptionsText={"Not Found"}
                renderOption={(props, product) => (
                    <Box component="li" {...props} key={product.id}>
                        <Link to={`/products/${product.id}`} style={{ color: "black", textDecoration: "none" }}>{product.productname} </Link>
                    </Box>
                )}
                renderInput={(params) => <TextField {...params} lable="Search For Product" />}
            />

        </div>
    );
}

AutocompleteInput.propTypes = {
    apiUrl: PropTypes.string.isRequired,
    minCharacters: PropTypes.number.isRequired,
};

