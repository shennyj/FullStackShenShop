import React from 'react'
import './Product.css'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
  return (
    <div className="productItem">
         <Link to={`/product/${product._id}`} style={{textDecoration:'none'}}>
            <div className="productImageDiv">
            <img src={product.image} className="productImage" alt="Product"/>
            </div>
        <div className="productDetails">
                <p className="name">{product.name}</p>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={`#f8e825`}/>
            <p className="price">${product.price}</p>
        </div>
        </Link>
    </div>
  )
}

export default Product