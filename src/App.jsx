import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import {Route, Routes} from "react-router-dom";
import {ProductDetail} from "./ProductDetail";
import {Cart} from "./Cart";
import {Box, Container, Typography} from "@material-ui/core";

const App = () => {

    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    <div className="content">
                        <Header/>
                        <main>
                            <Routes>
                                <Route path='/' element={<h1>Welcome to Carved Rock Fitness</h1>}/>
                                <Route path='/:category' element={<Products/>}/>
                                <Route path='/:category/:id' element={<ProductDetail/>}/>
                                <Route path='/cart' element={<Cart/>}/>
                            </Routes>
                        </main>
                    </div>
                    <Footer/>
                </Typography>
            </Box>
        </Container>
    );
};

export default App;
