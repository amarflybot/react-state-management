import React, {useEffect, useState} from "react";
import {useFetch} from "./services/useFetch";
import {Link, useParams} from "react-router-dom"
import {PageNotFound} from "./PageNotFound";
import Spinner from "./Spinner";

const Products = () => {

    const [filteredProducts, setFilteredProducts] = useState([]);

    const [size, setSize] = useState("");

    const {category} = useParams();

    const {data: products, error, isLoading} = useFetch(`products?category=${category}`);

    useEffect(() => {
        if (size === "") {
            setFilteredProducts(products);
        }
        const newLocal = Number.parseInt(size);
        if (newLocal > -1) {
            const filteredProducts = products.filter(
                (product1) =>
                    product1.skus.filter((sku) => sku.size === newLocal).length > 0
            );
            setFilteredProducts(filteredProducts);
        }
    }, [size, products]);

    const renderProduct = (p) => {
        return (
            <div key={p.id} className="product">
                <Link to={`${p.id}`}>
                    <img src={`/images/${p.image}`} alt={p.name}/>
                    <h3>{p.name}</h3>
                    <p>${p.price}</p>
                </Link>
            </div>
        );
    };

    if (error) throw error;

    if (isLoading) {
        return (
            <Spinner/>
        )
    }

    if (products.length === 0) {
        return <PageNotFound/>
    }
    return (
        <>
            <section id="filters">
                <label htmlFor="size">Filter by Size:</label>{" "}
                <select
                    id="size"
                    onChange={(event) => {
                        setSize(event.target.value);
                    }}
                >
                    <option value="">All sizes</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </select>
                {size && <h2>Found {filteredProducts.length} items</h2>}
            </section>
            <section id="products">{filteredProducts.map(renderProduct)}</section>
        </>

    );
};

export default Products;
