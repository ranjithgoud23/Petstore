import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { login, clearErrors } from '../../actions/userActions'


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(state => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }

  /////////////////////////////////////////////

  let x = document.getElementById("hands");
  let y = document.getElementById("animcon");
  function closeye() {
    y.style.backgroundImage = "url(https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/monkey_pwd.gif)";
    x.style.marginTop = "0%";
  }
  function openeye() {
    y.style.backgroundImage = "url(https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/monkey.gif)";
    x.style.marginTop = "110%";
  }
  // eslint-disable-next-line no-restricted-globals
  const redirect = location.search ? location.search.split("=")[1] : "";
  /////////////////////////////////////////////////

  useEffect(() => {

    if (isAuthenticated) {
      navigate(`/${redirect}`)
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors)
    }

  }, [dispatch, alert, isAuthenticated, error, navigate])
  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Login'}></MetaData>
          {/* <div className="row">
          <div className="col-lg-3">
            <div className="dog">
              <div className="ears"></div>

              <div className="body">
                <div className="eyes"></div>
                <div className="beard">
                  <div className="mouth">
                    <div className="tongue"></div>
                  </div>
                </div>
                <div className="belt">
                  <div className="locket"></div>
                  <div className="dot dot1"></div>
                  <div className="dot dot2"></div>
                  <div className="dot dot3"></div>
                  <div className="dot dot4"></div>
                  <div className="tag"></div>
                </div>
                <div className="stomach">
                </div>
                <div className="legs">
                  <div className="left"></div>
                  <div className="right"></div>
                </div>
              </div>
              <div className="tail">
              </div>
            </div>
          </div> */}

          <div className="row wrapper">
            <div className="monkeylogin col-10 col-lg-5">
              <div className="animcon" id="animcon">
                <img id="hands"
                  src="https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/hands.png" />
              </div>
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3 heading-tile">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onClick={(e) => openeye()}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onClick={(e) => closeye()}
                  />
                </div>
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/register" className="float-right mt-3">New User?</Link>
              </form>
            </div>
          </div>
          {/* </div> */}
        </Fragment>
      )
      }
    </Fragment>
  )
}

export default Login
