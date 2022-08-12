import React,{useState} from 'react'
import './Payment.css'
import {useHistory} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import Checkout from '../../components/Checkout'
import { savePaymentMethod } from '../../actions/cartActions'
const Payment = () => {

  const history = useHistory()
  const cart = useSelector(state=>state.cart)
  const {shippingAddress} = cart

  const [paymentMethod,setPaymentMethod] = useState('PayPal')


  const dispatch = useDispatch()
  if(!shippingAddress.address){
    history.push('/shipping')
  }


  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(savePaymentMethod(paymentMethod))
      history.push('/placeorder')
  }

return (
  <div className="login">
      <div className="loginWrapper">
      <Checkout step1 step2 step3/>
      <h2 className="signIn">Select Payment Method</h2>
      <form onSubmit={submitHandler}>
        <div className="payment">
          <label htmlFor="paypal">Paypal or Credit Card</label>
          <input
              type="radio"
              required
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e)=>setPaymentMethod(e.target.value)}
              />
              </div>
         <button className="loginButton" type="submit">
              Continue
          </button>
      </form>
      </div>

  </div>
)
}

export default Payment