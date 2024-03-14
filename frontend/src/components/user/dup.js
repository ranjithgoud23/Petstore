import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../../actions/userActions'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    })

    const { name, email, password,phone} = user;

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);
    ///////////////////////////////

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


  function allLetter(name) {
    var letters = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
    let inputtxt = name;
    console.log(inputtxt);
    if (inputtxt.match(letters)) {
        return true;
    } else {
        return false;
    }
}


function EmailValidate(email) {
    let inputtxt = email;
    console.log(inputtxt);
    if (inputtxt.includes("@gmail.com")) {
        return true;
    } else {
        return false;
    }
}


function checkPhone(phone){
    // console.log(phone);
    const validatePhoneNumberRegex = /^\+?[1-9][0-9]{7,14}$/;
    if(phone.length === 10&&validatePhoneNumberRegex.test(phone)){
        return true;
    }
    else{
        return false;
    }
}

    /////////////////////////////
    useEffect(() => {

        if (isAuthenticated) {
            navigate('/') 
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, isAuthenticated, error,navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        if(!allLetter(name)){
            alert.error("Invalid Name");
        }
        else if(!EmailValidate(email)){
            alert.error("Invalid Email");
        }
        else if(!checkPhone(phone)){
            alert.error("Please Enter Valid Phone Number")
        }
        else{
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('phone',phone)
        formData.set('avatar', avatar);

        dispatch(register(formData))
        }
    }

    const onChange = e => {
        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <Fragment>

            <MetaData title={'Register User'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5 monkeylogin">
                <div className="animcon" id="animcon">
                <img id="hands"
                  src="https://raw.githubusercontent.com/naaficodes/Monkey-Login/master/images/hands.png" />
              </div>
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3 heading-tile">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={onChange}
                                onClick={(e) => openeye()}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={onChange}
                                required
                                
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={onChange}
                                onClick={(e) => closeye()}
                                required
                                minlength="8"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone_field">Phone Number</label>
                            <input
                                type="tel"
                                id="phone_field"
                                className="form-control"
                                name='phone'
                                value={phone}
                                onChange={onChange}
                                onClick={(e) => openeye()}
                                required
                            />
                        </div>
                        <input type="file" name = "image" />
                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='image'
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Register