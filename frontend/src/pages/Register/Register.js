import React,{useEffect, useRef, useState} from 'react'
import './Register.css'
import {Link, useHistory, useLocation} from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useDispatch,useSelector } from 'react-redux'
import { register } from '../../actions/userActions'

const Register = () => {
    const name = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const [message,setMessage] = useState('')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if (confirmPassword.current.value !== password.current.value) {
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name.current.value,email.current.value,password.current.value))
        }
    }

    const history = useHistory()
    let redirect = useLocation().search
    redirect = redirect ? redirect.split('=')[1] : '/'

    const userRegister = useSelector(state=>state.userRegister)
    const {error,loading,userInfo} = userRegister

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

  return (
    <div className="registerDiv">
        <div className="registerWrapper">
        <h1 className="signIn">Sign Up</h1>
        {message&&<Message variant='danger'>{message}</Message>}
        {error&&<Message variant='danger'>{error}</Message>}
        {loading&&<Loader/>}
        <form onSubmit={submitHandler}>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                placeholder="Name"
                className="registerInput"
                ref={name}
                required
                id="name"/>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                placeholder="Email"
                required
                className="registerInput"
                ref={email}
                id="email"/>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                placeholder="Password"
                required
                className="registerInput"
                ref={password}
                id="password"/>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                type="password"
                placeholder="Confirm Password"
                required
                className="registerInput"
                ref={confirmPassword}
                id="confirmPassword"/>
            <button className="registerButton" type="submit">
                Register
            </button>
            <div className="register">
                <span>Have an Account? <Link style={{textDecoration:'none'}}
                to={redirect ? `/login?redirect=${redirect}`:'/login'}
                ><span className="registerText">Sign In</span>
                </Link></span>
            </div>
        </form>

        </div>

    </div>
  )
}

export default Register