import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import {getProducts} from "./services/productService";

const App = () => {

  const [products, setProducts] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [size, setSize] = useState("");

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const shoes = await getProducts('shoes');

      setProducts(shoes);
      setFilteredProducts(shoes);
    };

    fetchData().finally(() => setIsLoading(false)).catch((e) => setError(e));

  },[])

  useEffect(() => {
    const fun1 = () => {
      const newLocal = Number.parseInt(size);
      if (newLocal > -1) {
        const filteredProducts = products.filter(
          (product1) =>
            product1.skus.filter((sku) => sku.size === newLocal).length > 0
        );
        setFilteredProducts(filteredProducts);
      }
    };
    return fun1();
  }, [size]);

  const renderProduct = (p) => {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  };

  if (error) throw error;

  if (isLoading) {
    return  (
        <div className="content">
          <Header />
          <main>
          Loading....
          </main>
        </div>
    )
  }
  return (
    <>
      <div className="content">
        <Header />
        <main>
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
        </main>
      </div>
      <Footer />
    </>
  );
};

export default App;
