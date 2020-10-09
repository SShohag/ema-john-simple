import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {

    const [cart, setCart] = useState([]);

    const [orderPlaced, setOrderPlaced] = useState(false);

    const history = useHistory()

    const handleProceedCheckout = ()=>{
       history.push('/shipment');
    }

    const removeProduct = (productKey)=>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{

        const saveCart = getDatabaseCart ();
        const productKeys = Object.keys(saveCart);

        fetch('https://warm-spire-92462.herokuapp.com/productsByKeys', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(productKeys)
        })

        .then( res => res.json())
        .then( data => setCart(data))

    },[]);

     let thankYou;
     if(orderPlaced){
         thankYou = <img src={happyImage} alt=""/>
     }

    return (
        <div className="twin-container">
          <div className="product-container">
            {
                cart.map(pd => <ReviewItem
                    removeProduct ={removeProduct}
                    product= {pd} key={pd.key} 
                    >
                    </ReviewItem>)
                }

                {
                    thankYou
                }

          </div>
          <div className="cart-container">
            <Cart cart={cart}>
                <button onClick={handleProceedCheckout}className="main-button">CheckOut</button>
            </Cart>
          </div>
        </div>
    );
};

export default Review;