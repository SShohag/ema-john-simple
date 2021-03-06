import React from 'react';

const ReviewItem = (props) => {
    const removeProduct = props.removeProduct;
    const {name, price, quantity, key} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightGray',
        marginBottom:'5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    }
    console.log(props);
    return (
        <div style={reviewItemStyle}>
            <h4 className='product-name'> {name} </h4>
            <p>Quantity: {quantity}</p>
            <p><small>Price :$ {price}</small> </p>
            <br/>
            <button 
            className='main-button'
            onClick={()=>removeProduct(key)}
            > Remove </button>
            
            
        </div>
    );
};

export default ReviewItem;