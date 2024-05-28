import React , {useState , useContext} from 'react'
import "./LoginPage.css"
import {Context} from "../App.jsx"
import {useForm} from "react-hook-form"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { GoogleOAuthProvider } from "@react-oauth/google"
import { GoogleLogin } from "@react-oauth/google"
const { VITE_LocalURL , VITE_DeployedURL } = import.meta.env;

const LoginPage = ({setforgotpass}) => {

    const {LoginModal , setLoginModal , RegisterModal , setRegisterModal} = useContext(Context)
    const [showPassword, setShowPassword] = useState(false);

    let display = {
        display : LoginModal ? "inline-flex" : "none"
    }
    const {register, handleSubmit, formState: { errors }} = useForm()

    let handleforgotpass = () =>{
        setLoginModal(!LoginModal)
        setforgotpass(true)
    }

    let onSubmit = (inputvals,event) =>{
        event.preventDefault();
        console.log(inputvals)
        let note = toast.loading("Please Wait ..." , {
            position: "top-center"
        })
        axios.post(`https://s56-ayush-capstone-dopahiya.onrender.com/login` , inputvals)
            .then((res)=>{
                console.log(res)
                if (res.data == "User Does not exist"){
                    toast.update(note, {render: "User Does not Exist", type: "warning", isLoading: false , autoClose: 1000 , hideProgressBar:true, theme:"colored"})
                }else if (res.data == "Wrong Password"){
                    toast.update(note, {render: "Wrong Password..!", type: "error", isLoading: false , autoClose:1000 , hideProgressBar:true, theme:"colored"})
                }else{
                    toast.update(note, {render: "Logged in Successfully", type: "success", isLoading: false , autoClose:1000 , hideProgressBar:true , theme:"colored"});
                    setTimeout(()=>{
                        sessionStorage.setItem("loggedin" , true)
                        sessionStorage.setItem("curruser" , res.data.username)
                        sessionStorage.setItem("fav", JSON.stringify(res.data.fav))
                        sessionStorage.setItem("profileImg" , res.data.profileImg)
                        document.cookie = `token=${res.data.token}; expires=Sun, 1 January 9999 12:00:00 UTC; path=/; Secure; HttpOnly'`
                        setLoginModal(!LoginModal)
                    },1500)
                }
            })
            .catch((err)=>{
                console.log(err)
            })

        

    }
    let handleCancel = ()=>{setLoginModal(!LoginModal)}

    let handleRegisterClick = () =>{
        setLoginModal(!LoginModal)
        setRegisterModal(!RegisterModal)
    }

    let handleGoogleLogin = (res) =>{
        let note = toast.loading("Please Wait ..." , {position:"top-center"})
        axios.post("http://localhost:3200/googlelogin",res)
            .then((resp)=>{
                console.log(resp)
                if (resp.data == "User Does not exist"){
                    toast.update(note, {render: "User Does not Exist", type: "warning", isLoading: false , autoClose: 1000 , hideProgressBar:true, theme:"colored"})
                }else{
                    toast.update(note, {render: "Logged in Successfully", type: "success", isLoading: false , autoClose:1000 , hideProgressBar:true , theme:"colored"});
                    setTimeout(()=>{
                        sessionStorage.setItem("loggedin" , true)
                        sessionStorage.setItem("curruser" , resp.data.username)
                        sessionStorage.setItem("fav", JSON.stringify(resp.data.fav))
                        sessionStorage.setItem("profileImg" , resp.data.profileImg)
                        document.cookie = `token=${resp.data.token}; expires=Sun, 1 January 9999 12:00:00 UTC; path=/; Secure; HttpOnly'`
                        setLoginModal(!LoginModal)
                    },1500)
                }
            })
            .catch((err)=>{
                console.log(err)
            })

    }
    
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
                            <div className='pass-inp'>
                                <input type={showPassword ? "text" : "password"} name="password" {...register("password" , {
                                    required:"Password is Required",
                                    minLength: {
                                        value:5, 
                                        message:"Password must be more than 4 characters"},
                                        maxLength:{
                                            value:20, 
                                            message:"Password cannot be more than 20 characters"}
                                        })} />
                                {showPassword ? <IoEyeOffOutline className='toggle-btn' onClick={()=>setShowPassword(!showPassword)}/> : <IoEyeOutline className='toggle-btn' onClick={()=>setShowPassword(!showPassword)}/>}
                                
                            </div>
                            {errors.password && <p className='alert'>{errors.password.message}</p>}
                            <h6 onClick={handleforgotpass}>Forgot Password ?</h6>
                        </div>

                        <div className='login-btndiv flex jus-cen'>
                            <input type="submit" value={"LOGIN"}/>
                            <button type="button" className='cancelbtn' onClick={handleCancel}>CANCEL</button>
                        </div>

                        <p className='registertext'>Don't have a Account ? <span onClick={handleRegisterClick}>Register</span></p>
                        <div className='flex jus-cen align-cen googlelogin-btn' style={{marginBottom:0}}>
                            <GoogleOAuthProvider clientId='702578085661-04kerhil3rakkbn7m8ve9lr716joojo7.apps.googleusercontent.com'>
                                <GoogleLogin onSuccess={handleGoogleLogin} onError={()=>{
                                    toast.error("Google Login Failed..!")
                                }} />
                            </GoogleOAuthProvider>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <ToastContainer />
        
        

    </div>
  )
}

export default LoginPage
