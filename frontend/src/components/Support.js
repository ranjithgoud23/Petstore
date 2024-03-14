import React, { Fragment, useState} from 'react'

import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
    const navigate = useNavigate();
    const { user, loading } = useSelector(state => state.auth)
    const [subject,setSubject] = useState("");
    const [description,setDescription] = useState("");
    const [image,setImage] = useState(null);
    const submitHandler = (e) => {
        e.preventDefault();
         console.log("HIIIIIII");
        const formData = new FormData();
        // formData.set('subject', subject);
        formData.set('description', description);
        formData.append('image', image);
        // formData.set('name', user.name);
        // formData.set('email',user.email);
         
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios.post("/mohan",formData,config)
            .then((response) => {
                alert("Complaint Lodged Successfully");
                navigate("/");
            }).catch((error) => {
                console.log(error);
        });
        
    }

    return (
        <Fragment>


            <div className="row wrapper">
              </div>
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3 heading-tile">Lodge Complaint</h1>

                        <div className="form-group">
                           <input type="text" name="subject" id="subject" onChange={(e)=>{setSubject(e.target.value)}}/> 
                           <input type="text" name="description" id="description" onChange={(e)=>{setDescription(e.target.value)}}/> 
                           <input type="file" name="op" id="op" onChange={(e)=>{setImage(e.target.value)}}/>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            onSubmit={submitHandler}
                        >
                            LODGE COMPLAINT
                        </button>
                    </form>
               
         

        </Fragment>
    )
}

export default Register