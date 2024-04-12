import React , {useState}from 'react'
import Navbar from '../Components/Navbar'
import "./FeedBack.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const FeedBackForm = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    let handleSubmit = (e) =>{
        e.preventDefault();
        const validationErrors = {};

        if (!firstName.trim()) {
            validationErrors.firstName = 'First name is required';
        } else if (/\d/.test(firstName)) {
            validationErrors.firstName = 'First name must not contain number';
        }

        if (!lastName.trim()) {
            validationErrors.lastName = 'Last name is required';
        } else if (/\d/.test(lastName)) {
            validationErrors.lastName = 'Last name must not contain number';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!emailPattern.test(email)) {
            validationErrors.email = 'Invalid email address';
        }

        if (!message.trim()) {
            validationErrors.message = 'Message is required';
        }

        // If there are validation errors, set them and prevent form submission
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        let note = toast.loading("Please Wait ..." , {
            position: "top-center"
        })

        axios.post("http://localhost:3200/feedback" , {firstName : firstName , lastName : lastName , email : email , message : message})
            .then((res)=>{
                if (res.data == "FeedBack taken.!!"){
                    toast.update(note , {render : "We will get back to you soon..!!" , 
                    type: "success", isLoading: false , autoClose: 1000 , hideProgressBar:true, theme:"colored"
                    })
                    setFirstName("")
                    setLastName("")
                    setEmail("")
                    setMessage("")
                    setErrors({})
                }else{
                    toast.update(note , {
                        render : "Some Error Occurred",
                        type: "error", isLoading: false , autoClose: 1000 , hideProgressBar:true, theme:"colored"
                    })
                }
            })
            .catch((err)=>{
                console.log(err)
                toast.update(note , {
                    render : "Some Error Occurred",
                    type: "error", isLoading: false , autoClose: 1000 , hideProgressBar:true, theme:"colored"
                })
            })

        
        console.log({firstName : firstName , lastName : lastName , email : email , message : message})
        
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
                        <p>dopahiya.feedback@gmail.com</p>
                    </div>
                    <div>
                        <h4>Phone</h4>
                        <p>9067469535</p>
                    </div>
                </div>
            </div>
            <div className='feedback-form-div'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" value={firstName} placeholder='Enter First Name' onChange={(e) => setFirstName(e.target.value)} />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>
                    <div>
                        <input type="text" value={lastName} placeholder='Enter Last Name' onChange={(e) => setLastName(e.target.value)} />
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>
                    <div>
                        <input type="text" value={email} placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div>
                        <textarea value={message} cols="30" rows="8" placeholder='Enter Message' onChange={(e) => setMessage(e.target.value)}></textarea>
                        {errors.message && <span className="error">{errors.message}</span>}
                    </div>
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
