import React,{useState} from 'react'
import './Shipping.css'
import {useHistory} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { saveShippingAddress } from '../../actions/cartActions'
const Shipping = () => {
    const history = useHistory()
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart

    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
    const [country,setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }

  return (
    <div className="login">
        <div className="loginWrapperShip">
        <h1 className="signIn">Shipping</h1>
        <form onSubmit={submitHandler} className="shippingForm">
            <label htmlFor="address">Address</label>
            <input
                type="text"
                placeholder="Enter Address"
                className="loginInput"
                required
                value={address?address:''}
                onChange={(e)=>setAddress(e.target.value)}
                id="address"/>
            <label htmlFor="city">City</label>
            <input
                type="text"
                placeholder="City"
                required
                value={city?city:''}
                className="loginInput"
                onChange={(e)=>setCity(e.target.value)}
                id="city"/>
            <label htmlFor="zipcode">Zip Code</label>
            <input
                type="text"
                placeholder="Zip Code"
                required
                className="loginInput"
                value={postalCode?postalCode:''}
                onChange={(e)=>setPostalCode(e.target.value)}
                id="zipcode"/>
            <label htmlFor="country">Country</label>
            <input
                type="text"
                placeholder="Country"
                required
                className="loginInput"
                value={country?country:''}
                onChange={(e)=>setCountry(e.target.value)}
                id="country"/>
            <button type="submit">
                Continue
            </button>
        </form>
        </div>

    </div>
  )
}

export default Shipping