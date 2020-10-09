import React, { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
   
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('https://warm-spire-92462.herokuapp.com/products?search='+search)
        .then( res => res.json())
        .then( data => setProducts(data))
    }, [search])

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://warm-spire-92462.herokuapp.com/productsByKeys', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(productKeys)
        })

        .then( res => res.json())
        .then( data => setCart(data))
    },[]);

    const handleSearch = event => {
        setSearch(event.target.value)
    }

    const handleAddProduct = (product)=>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity+1;
            sameProduct.quantity = count;
            const others = cart.filter (pd => pd.key!== toBeAddedKey);
            newCart = [...others, product];
        }else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);

        addToDatabaseCart(product.key, count);
    }
    return (
        <div className='twin-container'>
            <div className="product-container">
                <input type="text" onBlur ={handleSearch} className="product-search" placeholder="Search"/>
                {
                    products.map(pd=> <Product
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct} 
                        product={pd}
                        ></Product> )
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} >
                    <Link to="/review">
                        <button className="main-button"> Review Order</button>
                    </Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;