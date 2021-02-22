import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useFetch} from "./services/useFetch";
import Spinner from "./Spinner";
import {PageNotFound} from "./PageNotFound";

export const ProductDetail = () => {
    const {id} = useParams();
    const {data: product, isLoading, error} = useFetch(`products/${id}`)

    const navigate = useNavigate();

    if (isLoading) {
        return (
            <Spinner/>
        )
    }
    if (error || !product) {
        return (
            <PageNotFound/>
        )
    }
    return (
        <div id="detail">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p id="price">${product.price}</p>
            <p>
                <button className="btn btn-primary" onClick={() => navigate('/cart')}>Add to Cart</button>
            </p>
            <img src={`/images/${product.image}`} alt={product.category}/>
        </div>
    )
}
