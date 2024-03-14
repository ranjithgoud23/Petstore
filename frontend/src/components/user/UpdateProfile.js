import React, { Fragment, useState, useEffect } from 'react'

import MetaData from '../layouts/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [phone, setPhone] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user)
    

    
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
        if(phone.length === 10){
            return true;
        }
        else{
            return false;
        }
    }
    


    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            if (user.avatar) {
                setAvatarPreview(user.avatar.url)
            }   
            else {
                setAvatarPreview("https://res.cloudinary.com/dzigorjli/image/upload/v1667126506/avatars/default_avatar_mzcyda.jpg")
            }
            console.log("Password",user.password);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('User updated successfully')
            dispatch(loadUser());

            navigate('/me')


            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

    }, [dispatch, alert, error, isUpdated, user, navigate])


    const submitHandler = (e) => {
        e.preventDefault();
        let checkbox = document.getElementById("terms");
        if(!allLetter(name)){
            alert.error("Invalid Name");
        }
        else if(!EmailValidate(email)){
            alert.error("Invalid Email");
        }
        else if(!checkbox.checked){
            alert.error("Please Accept the terms and conditions");
   
        }
        else if(!checkPhone(phone)){
            alert.error("Please Enter Valid Phone Number")
        }
        else{

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('avatar', avatar);
        formData.set('phone', phone);

        dispatch(updateProfile(formData))
        }
    }
 
    
    


    const onChange = e => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        
        reader.readAsDataURL(e.target.files[0])

    }
    return (
        <Fragment>
            <MetaData title={'Update Profile'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5 heading-tile">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone Number</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                name='phone'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

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
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='image/*'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>
                        <input type="checkbox" id="terms" value="done"/>
                            <label htmlFor="terms"> I agree to terms and conditions </label><br/>
                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update</button>
                            </form>
                        </div>
                </div>
        </Fragment>
    )
}

export default UpdateProfile