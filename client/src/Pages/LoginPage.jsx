import React , {useEffect , useContext} from 'react'
import "./LoginPage.css"
import {Context} from "../App.jsx"
import {useForm} from "react-hook-form"
import { Link , useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {

    const {ShowModal , setShowModal} = useContext(Context)

    let display = {
        display : ShowModal ? "inline-flex" : "none"
    }

    var time;   
    const navigate = useNavigate()

    

    const {register, handleSubmit, formState: { errors }} = useForm()

    let onSubmit = (inputvals,event) =>{
        console.log('helloo')
        event.preventDefault();
        console.log(inputvals)
        toast.success('Logged in successfully!', {
            position: "top-center",
            autoClose: 1000
            });
        time = setTimeout(()=>{
            setShowModal(!ShowModal)
            window.location.reload()
        },1500)

    }

    // useEffect(()=>{
    //     console.log("Hello")
    //     showSuccessToast("Logged In Successfully..!!")
    // },[onsubmit])

    let handleCancel = ()=>{setShowModal(!ShowModal)}
    
  return (
    <div className='loginbody flex jus-cen align-cen' style={display}>
        <div className='login-container flex'>
            <div className='loginImg'>
                {/* <img src={LoginImg}/> */}
            </div>
            <div className='loginformcont flex jus-cen align-cen'>
                <div>
                    <h1>Welcome Back..!!</h1>

                    <h4>Rev Up Your Ride: <br /> Access Exclusive Bike Info Here!</h4>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>Email ID </label>
                            <input type="text" name="email" {...register("email" , {
                                required:"Email is required.!", 
                                pattern:{value: /^\S+@\S+$/i, 
                                message:"Invalid Email.!" 
                                }})} />
                            {errors.email && <p className='alert'>{errors.email.message}</p>}
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" name="password" {...register("password" , {
                                required:"Password is Required",
                                minLength: {
                                    value:5, 
                                    message:"Password must be more than 4 characters"},
                                maxLength:{
                                    value:20, 
                                    message:"Password cannot be more than 20 characters"}
                                })} />
                            {errors.password && <p className='alert'>{errors.password.message}</p>}
                        </div>

                        <div className='login-btndiv flex jus-cen'>
                            <input type="submit" value={"LOGIN"}/>
                            {/* <Link to={"/"}><button className='cancelbtn'>CANCEL</button></Link> */}
                            <button type="button" className='cancelbtn' onClick={handleCancel}>CANCEL</button>
                        </div>

                        <p className='registertext'>Don't have a Account ? <span>Register</span></p>
                    </form>
                </div>
            </div>
        </div>

        <ToastContainer />

    </div>
  )
}

export default LoginPage
