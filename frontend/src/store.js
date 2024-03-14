import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
} from "redux";
  
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import { productsReducer,productReviewsReducer,reviewReducer,productReducer, productDetailsReducer,newReviewReducer,newProductReducer } from "./reducers/productsReducer";
import { cartReducer } from './reducers/cartReducer'
import { authReducer, userReducer,allUsersReducer,userDetailsReducer} from './reducers/userReducers'
import {newOrderReducer,myOrdersReducer,orderDetailsReducer, allOrdersReducer,orderReducer} from './reducers/OrderReducer'
const reducer = combineReducers({
    products: productsReducer,
    product: productReducer, 
    productDetails : productDetailsReducer,
    newProduct : newProductReducer,
    auth : authReducer,
    user : userReducer,
    cart : cartReducer,
    newOrder: newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails: orderDetailsReducer,
    allOrders: allOrdersReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    newReview: newReviewReducer,
    order : orderReducer,
    allUsers : allUsersReducer,
    userDetails: userDetailsReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}   
const middleware = [thunk];
const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;