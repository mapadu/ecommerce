import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    return (
        <div>
            <Link to={`/products/${product.id}`}>
                <img src={`${process.env.REACT_APP_API_URL}/${product.image}`} alt={product.name} width="200" loading="lazy" />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
            </Link>
        </div>
    );
};

export default Product;