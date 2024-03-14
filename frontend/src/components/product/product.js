/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import {Link} from 'react-router-dom'
// We use link to prevent the refresh of the page

const product = ({ product , size }) => {
    return (
       
            <div className ={`col-sm-12 col-md-6 col-lg-${size} my-3`}>
                <div className="card p-3 rounded">
                    <img
                        className="card-img-top mx-auto"
                        src={product.images[0]?product.images[0].url:"https://images.unsplash.com/photo-1612178537253-bccd437b730e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}
                    />
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">
                            <Link to={`/product/${product._id}`}>{product.name}</Link>
                        </h5>
                        <div className="ratings mt-auto">
                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                            </div>
                            {/* <span id="no_of_reviews">({product.numofReviews} Reviews)</span> */}
                        </div>
                        <p className="card-text">₹{product.price}</p>
                        <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                    </div>
                </div>
            </div>

 
    )
}

export default product
