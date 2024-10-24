import React , {useContext , useState} from 'react'
import "./LoginPage.css"
import "./Register.css"
import {Context} from "../App.jsx"
import {useForm} from "react-hook-form"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'

const Register = () => {

    const {LoginModal , setLoginModal , RegisterModal , setRegisterModal} = useContext(Context)
    const [showPassword, setShowPassword] = useState(false);

    let display = {
        display : RegisterModal ? "inline-flex" : "none"
    }

    const {register, handleSubmit, formState: { errors } , watch} = useForm()

    let onSubmit = (inputvals,event) =>{
        event.preventDefault();
        console.log(inputvals)
        inputvals = {...inputvals , profileImg : "https://res.cloudinary.com/dvvfavgey/image/upload/v1714982148/Profile%20Pictures/profile-picture_hnqliq.jpg" , bio: "Hello, I am Bike Entusiast.!!" , fav: []}

        let note = toast.loading("Please Wait ..." , {position:"top-center"})
        axios.post(`${API_URL}/register` , inputvals)
          .then((res)=>{
            if (res.data == "User already Exists"){
              toast.update(note, {render: "User Already Exists.!!", type: "warning", isLoading: false , autoClose: 1000 , hideProgressBar:true , theme:"colored"})
            }else if (res.data == "Username Already Taken"){
              toast.update(note , {render: "Username already Taken.!!", type: "warning", isLoading: false , autoClose: 1000 , hideProgressBar:true , theme:"colored"})
            }
            else{
              toast.update(note, {render: "Registration Successful..! Login to Continue", type: "success", isLoading: false , autoClose: 1000 , hideProgressBar:true, theme:"colored"});
              setTimeout(()=>{
                setRegisterModal(!RegisterModal)
                setLoginModal(!LoginModal)
              },1500)
            }
          })
          .catch((err)=>{
            console.log(err)
          })

        
    }

    let handleCancel = ()=>{
      setRegisterModal(!RegisterModal)
    }
    
    let handleLoginClick = () =>{
      setRegisterModal(!RegisterModal)
      setLoginModal(!LoginModal)
    }

    let handleGoogleRegister = (data) =>{
      console.log(data)
      let note = toast.loading("Please Wait ..." , {position:"top-center"})
      axios.post(`${API_URL}/googleregister` , data)
        .then((res)=>{
          if (res.data == "User already Exists"){
            toast.update(note, {render: "User Already Exists.!!", type: "warning", isLoading: false , autoClose: 1000 , hideProgressBar:true , theme:"colored"})
          }else if (res.data == "Username Already Taken"){
            toast.update(note , {render: "Username already Taken.!!", type: "warning", isLoading: false , autoClose: 1000 , hideProgressBar:true , theme:"colored"})
          }
          else{
            toast.update(note, {render: "Registration Successful..! Login to Continue", type: "success", isLoading: false , autoClose: 1000 , hideProgressBar:true, theme:"colored"});
            setTimeout(()=>{
              setRegisterModal(!RegisterModal)
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
            <div className='registerImg'>
                {/* <img src={LoginImg}/> */}
            </div>
            <div className='loginformcont flex jus-cen align-cen registerformcont'>
                <div>
                  <div className='headings'>
                    <h4>Welcome to</h4>
                    <h1 style={{color:"#FF8A00"}}>DoPahiya</h1>
                  </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label>Username</label>
                            <input type='text' name='username' {...register("username", {
                                required: true,
                                pattern:{value: /^[^\d]*$/i, 
                                message:"Username should not have number.!"
                              }})}
                              />
                            {errors.username && <p className='alert'>{errors.username.message}</p>}
                        </div>
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
                        </div>

                        <div className='login-btndiv flex jus-cen'>
                            <input type="submit" value={"REGISTER"}/>
                            {/* <Link to={"/"}><button className='cancelbtn'>CANCEL</button></Link> */}
                            <button type="button" className='cancelbtn' onClick={handleCancel}>CANCEL</button>
                        </div>

                        <p className='registertext'>Already a User ? <span onClick={handleLoginClick}>Login</span></p>
                        <div className='flex jus-cen align-cen'>
                          <GoogleOAuthProvider clientId={THIRD_PARTY_API_CLIENT_ID}>
                            <GoogleLogin onSuccess={handleGoogleRegister} text='signup_with'/>
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

export default Register
