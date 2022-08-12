import React, {useEffect} from 'react'
import {Link, useHistory, useLocation, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from 'react-bootstrap'
import Message from '../../components/Message'
import {addToCart, removeFromCart} from '../../actions/cartActions'
import './CartPage.css'
const CartPage = () => {

    const history = useHistory()
    let productId = useParams().id
    let query = useLocation().search
    const qty = query ? Number(query.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkOutHandler = () => {
        //if theyre logged in redirect to shipping page
        history.push(`/login?redirect=shipping`)
    }

    return (
        <div className="cartPage">
            <div className="shoppingCart">
                <h1>Shopping Cart</h1>
                {
                cartItems.length === 0 ? (
                    <Message variant="info" style={{textDecoration:'none'}}>
                        Your cart is empty <Link to="/" style={{textDecoration:'none'}}>Go Back</Link>
                    </Message>
                ) : (
                    <>
                        <div className="items">
                            <div> {
                                cartItems.map(item => (
                                    <div className="cartDiv" key={item.product}>
                                        <div className="cartItem">
                                            <div className="itemImgDiv">
                                                <img src={
                                                        item.image
                                                    }
                                                    alt={
                                                        item.name
                                                    }
                                                    className="itemImg"/>
                                            </div>
                                            <div className="itemNameDiv">
                                                <Link to={
                                                        `/products/${
                                                            item.product
                                                        }`
                                                    }
                                                    style={
                                                        {textDecoration: 'none'}
                                                }>
                                                    {
                                                    item.name
                                                }</Link>
                                            </div>
                                            <div className="itemPriceDiv">
                                                ${
                                                item.price
                                            } </div>
                                        </div>
                                        <div className="countInStock">
                                            <select name="stock" id="stock" value={qty}
                                                onChange={
                                                    (e) => dispatch(addToCart(item.product, Number(e.target.value)))
                                            }>
                                                {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={
                                                            x + 1
                                                        }
                                                        value={
                                                            x + 1
                                                        }
                                                      >
                                                        {
                                                        x + 1
                                                    } </option>
                                                ))
                                            } </select>
                                            <Button type="button" variant='light'
                                                onClick={
                                                    () => removeFromCartHandler(item.product)
                                                }
                                                className="removeButton">
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </div>

                                    </div>
                                ))
                            }
                             </div>
                        <div className="cartSummary">
                            <div className="subtotal">
                                <h2>Subtotal ({
                                    cartItems.reduce((acc, item) => acc + item.qty, 0)
                                }) Items</h2>
                                <h6 className="itemTotal">${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}</h6>
                            </div>
                            <div className="checkoutButton">
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cartItems.length===0}
                                    onClick={checkOutHandler}
                                >
                                    Proceed to Checkout
                                </Button>
                            </div>

                        </div>
                        </div>
                    </>
                )
            } </div>

        </div>
    )
}

export default CartPage
