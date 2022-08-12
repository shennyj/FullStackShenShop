import React,{useEffect, useState} from 'react'
import './ProductPage.css'
import {useDispatch,useSelector} from 'react-redux'
import { Link,useHistory,useParams } from 'react-router-dom'
import Rating from '../../components/Product/Rating'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { listProductDetails,createProductReview } from '../../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'
import { Col, ListGroup, Row ,Form,Button} from 'react-bootstrap'
const ProductPage = () => {
  const [qty,setQty] = useState(1)
  const [rating,setRating] = useState(0)
  const [comment,setComment] = useState('')
  const productId = useParams().id

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(
      productId,{
        rating,
        comment
      }
    ))

  }

  const dispatch = useDispatch()
  const history = useHistory()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {
      loading: loadingProductReview,
      error: errorProductReview,
      success: successProductReview,
  } = productReviewCreate


  useEffect(()=>{
    if(successProductReview){
      setRating(0)
      setComment('')
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }

    dispatch(listProductDetails(productId))
  },[dispatch,productId,successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`)
  }

  return (
    <div className="productPage">
        <div className="backDiv">
          <div className="buttonDiv">
        <Link to="/" className="backButton">Go Back</Link>
        </div>
        {
          loading ?
            <Loader/>
            : error
              ? <Message variant="danger">{error}</Message>
            :(
              <div>
            <div className="product">
              <img className="productImage" src={product.image} alt="Product" />
              <div className="productDetails">
                <div className="productName">
                  {product.name}
                </div>
                <div className="productRating">
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} color={`#f8e825`}/>
                </div>
                <div className="productPrice">
                  Price: ${product.price}
                </div>
                <div className="productDesc">
                  Description: {product.description}
                </div>
              </div>
              <div className="productSummary">
                <div className="summaryPrice">
                  <span>Price</span>
                  <span>${product.price}</span>
                </div>
                <div className="stock">
                  <span>Status: </span>
                  <span>{product.countInStock>0?'In Stock':'Out of Stock'}</span>
                </div>
                {product.countInStock>0&&(
                  <div className="countStock">
                    <label htmlFor="stock">Qty</label>
                    <select name="stock" id="stock" onChange={(e)=>setQty(e.target.value)}>
                      {
                        [...Array(product.countInStock).keys()].map((x)=>(
                          <option key={x+1} value={x+1}>
                            {x+1}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                )}
                <div className="add">
                  <button disabled={product.countInStock===0}
                  onClick={addToCartHandler}>
                    <div  className="iclass">
                  <i className="fas fa-cart-plus"></i>
                </div>
                <div className="addcarttext">
                  ADD TO CART
                </div>
                </button>
                </div>
              </div>

            </div>
              <div className="reviewsDiv">
                      <h4>Reviews</h4>
                      {!product.reviews.length&&<Message variant='info'>No Reviews</Message>}
                      <div className="reviews">

                        {product.reviews.map((review)=>(
                          <ListGroup.Item key={review._id}>
                          <strong>{review.name}</strong>
                          <Rating value={review.rating} color='#f8e825' />
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                      </ListGroup.Item>
                        ))}

                      </div>
                    </div>
                    <ListGroup.Item className='listGroupItem'>
                        <h4>Write a review</h4>
                        {loadingProductReview&&<Loader/>}
                        {successProductReview&&<Message variant='success'>Review Submitted!</Message>}
                        {errorProductReview&&<Message variant='danger'>{errorProductReview}</Message>}
                        {userInfo?(
                          <Form
                          onSubmit={submitHandler}>
                            <Form.Group controlId='rating'>
                              <Form.Label>
                                Rating
                              </Form.Label>
                              <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                                <option value=''>Select a rating</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Great</option>
                                <option value='5'>5 - Excellent</option>
                              </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='comment' className='formArea'>
                              <Form.Label>Review</Form.Label>
                              <Form.Control as="textarea" row='5' value={comment}
                              onChange={(e)=>setComment(e.target.value)} >

                              </Form.Control>
                            </Form.Group>
                            <Button
                            disabled={loadingProductReview}
                            type="submit"
                            variant='primary'>
                              Comment
                            </Button>
                          </Form>
                        ):(
                          <Message variant='info'>Please <Link to="/login"style={{textDecoration:'none'}}>Login</Link> to write a review</Message>
                        )}
                    </ListGroup.Item>
                </div>
              )

        }
        </div>
    </div>
  )
}

export default ProductPage