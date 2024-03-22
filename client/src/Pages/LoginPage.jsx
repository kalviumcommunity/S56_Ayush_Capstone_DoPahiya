import React from 'react'
import "./LoginPage.css"
import Logo from "../assets/Logo.png"
import LoginImg from "../assets/LoginImg.png"
import {useForm} from "react-hook-form"
import { Link , useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {

    const navigate = useNavigate()

    const showSuccessToast = (msg) => {
        toast.success(msg, {
          position: "top-center",
          autoClose:1000
        });
      };

    const {register, handleSubmit, formState: { errors }} = useForm()

    let onSubmit = (inputvals) =>{
        console.log(inputvals)
        showSuccessToast("Logged In Successfully..!!")
        setTimeout(()=>{
            navigate("/")
        },1000)
    }

  return (
    <div className='loginbody'>
      <img src={Logo} className='login-logo'/>

        <div className='login-main flex jus-cen align-cen'>
            <div className='login-container flex'>
                <div className='loginImg'>
                    <img src={LoginImg}/>
                </div>
                <div className='loginformcont'>
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
                            <Link to={"/"}><button className='cancelbtn'>CANCEL</button></Link>
                        </div>

                        <p className='registertext'>Don't have a Account ? <Link to={"/register"}><span>Register</span></Link></p>
                    </form>
                </div>
            </div>
        </div>

        <ToastContainer />

    </div>
  )
}

export default LoginPage
