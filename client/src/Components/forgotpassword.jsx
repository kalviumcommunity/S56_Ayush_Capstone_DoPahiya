import React , {useState} from 'react'
import "./Forgotpassword.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";


const Forgotpassword = ({setforgotpass}) => {

  const [steps , setsteps] = useState(1)
  const [code , setcode] = useState(0)
  const [email , setemail] = useState("")
  const [emailerr , setemailerr] = useState(false)
  const [newPass , setnewPass] = useState("")
  const [inputCode , setInputCode] = useState("")
  const [showPassword,setShowPassword] = useState(false)

  let handleform1submit = (e) =>{
    e.preventDefault()

    if (!/^\S+@\S+$/i.test(email)){
      setemailerr(true) 
    }else{
      setemailerr(false)
      let note = toast.loading("Sending Mail ..." , {
        position: "top-center"
      })
      axios.post(`${API_URL}/forgotpassword`, {email : email} , {
        headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}`}
      })
      .then((res)=>{
        if (res.data == "User Not Found..!!"){
          toast.update(note, {render: "User Not found..!!", type: "error", isLoading: false , autoClose:1000 , hideProgressBar:true, theme:"colored"})
        }else{
          console.log(res.data)
          setcode(res.data.code)
          toast.update(note, {render: "Mail Sent Successfully", type: "success", isLoading: false ,          autoClose:1000 , hideProgressBar:true , theme:"colored"});
          setsteps(2)
        }
      })
      .catch((err)=>{
        console.log(err)
        if (err.response.status == 401){
          return toast.update(note , { render:err.response.data, type:"warning", isLoading: false , autoClose: 1500 , position: "top-center", hideProgressBar: true , theme: "colored"})
        }
        toast.update(note, {render: "Some Error Occured..!!", type: "error", isLoading: false , autoClose:1000 , hideProgressBar:true, theme:"colored"})
      })
    }
  }


  let handleform2submit = (e) =>{
    e.preventDefault()
    if (inputCode == code){
      setsteps(3)
    }else{
      toast.update(note, {render: "Wrong Code..!!", type: "error", isLoading: false , autoClose:1000 , hideProgressBar:true, theme:"colored"})
    }
  }


  let handleform3submit = (e) =>{
    e.preventDefault()
    let note = toast.loading("Updating Password..." , {
      position: "top-center"
    })
    
    axios.put(`${API_URL}/resetpass` , {email: email , new_pass: newPass} , {
      headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}`}
    })
    .then((res)=>{
      if (res.data == "Password Updated"){
        toast.update(note, {render: "Password Updated Successfully.!!", type: "success", isLoading: false , autoClose:1000 , hideProgressBar:true , theme:"colored"});
        setTimeout(()=>{
          setforgotpass(false)
        },1000)
      }
      else{
        toast.update(note, {render: "Some Error Occured..!!", type: "error", isLoading: false , autoClose:1000 , hideProgressBar:true, theme:"colored"})
      }
    })
    .catch((err)=>{
      console.log(err)
      if (err.response.status == 401){
        return toast.update(note , { render:err.response.data, type:"warning", isLoading: false , autoClose: 1500 , position: "top-center", hideProgressBar: true , theme: "colored"})
      }
      toast.update(note, {render: "Some Error Occured..!!", type: "error", isLoading: false , autoClose:1000 , hideProgressBar:true, theme:"colored"})
    })
  }

  
  return (
    <div className='forgot-pass-main flex jus-cen align-cen'>
      {steps == 1 ? 
      <div className='forgot-pass-content flex jus-cen align-cen'>
        <h2>RESET PASSWORD</h2>
        <h6>Enter your email to get the verification code</h6>
        <form onSubmit={handleform1submit}>
          <div>
              <input type="text" name="email" onChange={(e)=>setemail(e.target.value)}/>
              {emailerr && <p className='alert'>Enter valid email</p>}
          </div>
          <div className='btn-div flex jus-cen align-cen'>
            <button className='cancel-btn' onClick={()=>setforgotpass(false)}>CANCEL</button>
            <input type='submit' value={"SUBMIT"}/>
          </div>
        </form>
      </div>

      : steps == 2 ? 
      <div className='forgot-pass-content flex jus-cen align-cen'>
        <h2>RESET PASSWORD</h2>
        <h6>Enter verification code</h6>
        <form onSubmit={handleform2submit}>
          <div>
              <input type="number" name="code" onChange={(e)=>setInputCode(e.target.value)} />
          </div>
          <div className='btn-div flex jus-cen align-cen'>
            <button className='cancel-btn' onClick={()=>setforgotpass(false)}>CANCEL</button>
            <input type='submit' value={"SUBMIT"}/>
          </div>
        </form>
      </div>
      : 
      <div className='forgot-pass-content flex jus-cen align-cen'>
        <h2>RESET PASSWORD</h2>
        <h6>Enter New Password</h6>
        <form onSubmit={handleform3submit}>
          <div className='pass-inp'>
             <input className='forinp' type={showPassword ? "text" : "password"}  name="new_pass" onChange={(e)=>setnewPass(e.target.value)} />
            {showPassword ? <IoEyeOffOutline className='toggle-btns' onClick={()=>setShowPassword(!showPassword)}/> : <IoEyeOutline className='toggle-btns' onClick={()=>setShowPassword(!showPassword)}/>}
          </div>
          <div className='btn-div flex jus-cen align-cen'>
            <button className='cancel-btn' onClick={()=>setforgotpass(false)}>CANCEL</button>
            <input type='submit' value={"SUBMIT"}/>
          </div>
        </form>
      </div>
      }


      <ToastContainer />
    </div>
  )

}

export default Forgotpassword