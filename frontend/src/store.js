import {createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,productDetailsReducer,productDeleteReducer,productCreateReducer,productUpdateReducer,productReviewCreateReducer,productTopRatedReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer,userListReducer,userDeleteReducer,userUpdateReducer} from './reducers/userReducers'
import { orderCreateReducers,orderDetailsReducer,orderPayReducer,orderListMyReducer,orderListReducer, orderDeliverReducer } from './reducers/orderReducers'
//combine reducers takes all reducers and combines into one and use it to apply to our store
//applyMiddleware for redux thunk
//store holds whole state tree of application. only way to change the state inside it is to dispatch an action on it
//store is not a class. its just an obj with a few methods in it
//to create it, pass ur root reducing func to createStore
//composerwithdevtools applies store to reduxdevtools
//Thunk middleware for Redux. It allows writing functions with logic inside that can interact
// with a Redux store's dispatch and getState methods.
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducers,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer,
    productReviewCreate:productReviewCreateReducer,
    productTopRated:productTopRatedReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')):[]

const userInfoFromStorage = localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
    JSON.parse(localStorage.getItem('shippingAddress')):{}

const initialState={
    cart:{cartItems:cartItemsFromStorage,
    shippingAddress:shippingAddressFromStorage},
    userLogin:{userInfo:userInfoFromStorage}
}

//we set products to initial state in productListReducer
//and because we put it in combinereducers, wetriggered first call of reducer
//reducer updated our state. has object of productList:{products:[]}


const middleware = [thunk]

const store = createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store