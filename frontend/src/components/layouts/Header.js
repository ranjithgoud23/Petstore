import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import '../../App.css'
import { logout } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

const Header = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart)
  const { user, loading } = useSelector(state => state.auth)
  const logoutHandler = () => {
    dispatch(logout());
    alert.success('Logged out successfully.')
  }
  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="/images/logo_h2rmiq.png" width="115"
                height="55" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-5 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-4 mt-4 mt-md-0 ">
          <Link to="/products" className="btn" id="prod_btn">Products</Link>
          <Link to="/cart" style={{ textDecoration: 'none' }} className="ml-4" >
          <Link to="/cart">
              <img src="https://res.cloudinary.com/dzigorjli/image/upload/v1665051546/petstore/cart_w8ihfq.png" width="30" height="30" />
            </Link>
            <span className="ml-1" id="cart_count">{cartItems.length}</span>
          </Link>
          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                <figure className="avatar avatar-nav">
                  <img
                    src={(user.avatar)?(user.avatar && user.avatar.url):('/images/default_avatar.jpg')}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>
              <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                {user && user.role === 'admin' && (
                  <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                )}
                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                <Link className="dropdown-item" to="/me">Profile</Link>
                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                  Logout
                </Link>

              </div>
            </div>

          ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}


        </div>
      </nav>
    </Fragment >
  )
}

export default Header
