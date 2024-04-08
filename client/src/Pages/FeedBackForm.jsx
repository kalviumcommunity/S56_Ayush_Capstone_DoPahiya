import React , {useState}from 'react'
import Navbar from '../Components/Navbar'
import "./FeedBack.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedBackForm = () => {

    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [email , setEmail] = useState("")
    const [message , setMessage] = useState("")

    let handleSubmit = (e) =>{
        e.preventDefault()
        if (firstName == "" || lastName == "" || email == "" || message == ""){
            toast.error("Enter valid Data..!" ,{
                position:"top-center",
                autoClose : 1000
            })
        }else if (!/^\S+@\S+$/i.test(email)){
            toast.error("Enter valid Email..!" ,{
                position:"top-center",
                autoClose : 1000
            })
        }
        else{

            toast.success("We will get back to you soon..!!" , {
                position:"top-center",
                autoClose : 1000
            })
            setFirstName("")
            setLastName("")
            setEmail("")
            setMessage("")
        }
    }

  return (
    <div className='feedback-main'>
        <Navbar />
        <div className='feedback-content-main flex jus-cen align-cen'>
            <div className='feedback-content'>
                <h1>We'd love to hear you thoughts</h1>
                <p>Please fill out the form below to submit your feedback. We appreciate any comments, suggestions, or concerns you may have.</p>
                <div className='flex jus-spBet align-cen'>
                    <div>
                        <h4>EMAIL</h4>
                        <p>ghodkeayush22@gmail.com</p>
                    </div>
                    <div>
                        <h4>Phone</h4>
                        <p>9067469535</p>
                    </div>
                </div>
            </div>
            <div className='feedback-form-div'>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={firstName} placeholder='Enter First Name' onChange={(e)=>setFirstName(e.target.value)}/>
                    <input type="text" value={lastName} placeholder='Enter Last Name' onChange={(e)=>setLastName(e.target.value)}/>
                    <input type="email" value={email} placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)} />
                    <textarea value={message} cols="30" rows="8" placeholder='Enter Message'onChange={(e)=>setMessage(e.target.value)}></textarea>
                    <div className='flex jus-end align-cen'>
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </div>

        <ToastContainer />

    </div>
  )
}

export default FeedBackForm
