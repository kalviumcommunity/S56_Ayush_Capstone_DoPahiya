import React, { useEffect , useState} from 'react'
import Navbar from '../Components/Navbar'
import "./Profile.css"
import { BsPencilFill } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";
import axios from 'axios';
import Loader from '../Components/Loader';
import { Link , useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Components/Footer';

const Profile = () => {

    const [userData, setUserData] = useState({})
    const [bikeDetails , setBikeDetails] = useState([])
    const [bikePhotos , setBikePhotos] = useState([])
    const [mergedData , setMergedData] = useState([])
    const [isLoading , setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://s56-ayush-capstone-dopahiya.onrender.com/getuser` , {
            headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` }
          })
            .then((res) => {
                setUserData(res.data[0])
            })
            .catch((err) => {   
                console.log(err)
                if (err.response.status == 401){
                    return toast.warning(err.response.data , {autoClose:1000 , hideProgressBar:true , theme:"colored"});
                }
            })
    },[])

    useEffect(()=>{
        Promise.all([
            axios.get("https://s56-ayush-capstone-dopahiya.onrender.com/getbikephotos"),
            axios.get("https://s56-ayush-capstone-dopahiya.onrender.com/getbikes")
        ]).then(([photosRes, bikesRes]) => {
            setBikePhotos(photosRes.data);
            setBikeDetails(bikesRes.data);
        }).catch(error => {
            console.error("Error fetching data:", error);
        })
    } , [userData])

    useEffect(()=>{
        mergeData()
    },[bikeDetails , bikePhotos])

    useEffect(()=>{
        setIsLoading(false) 
    },[mergedData])

    let mergeData = () => {
        const photoMap = {};
        bikePhotos.forEach((photo) => {
            photoMap[photo.name] = photo;
        });
    
        let merged = bikeDetails.map((detail) => {
            const matchingPhoto = photoMap[detail.name];
            if (matchingPhoto) {
                return { ...detail, ...matchingPhoto };
            } else {
                return detail;
            }
        });
        setMergedData(merged);
    };

    let handlefav = (e,id) =>{
        e.preventDefault()
        axios.post(`https://s56-ayush-capstone-dopahiya.onrender.com/handlefav` , {id : id} , {
            headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` }
          })
            .then((res)=>{
                let obj = {...userData , fav: res.data.arr}
                setUserData(obj)
                sessionStorage.setItem("fav" , JSON.stringify(res.data.arr))
            })
    }

    let handleDelete = () =>{
        let note = prompt("Are you sure you want to delete your account? This action is irreversible. If you are sure, type 'DELETE' in the box below.")
        if (note === "DELETE"){
            axios.delete(`https://s56-ayush-capstone-dopahiya.onrender.com/deleteuser` , {
                headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` }
              })
            .then((res)=>{
                sessionStorage.setItem("loggedin" , false)
                sessionStorage.setItem("curruser" , null)
                let cookies = document.cookie.split("; ")
                cookies.forEach((el)=>{
                    let cookie = el.split("=")[0]
                    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; Secure`
                })
                navigate("/")
                window.location.reload()
            })
            .catch((err)=>{
                if (err.response.status == 401){
                    return toast.update(note, {render: err.response.data , type: "warning", isLoading: false , autoClose:1000 , hideProgressBar:true , theme:"colored"});
                }
                console.log(err)
            })
        }else{
            return alert("Invalid input. Please try again.") 
        }
    }

    let handleSaveBio = () => {
        let bio = document.getElementById("bio-text").value
        let note = toast.loading("Updating Bio..!!" , {
            position: "top-center"
        })
        axios.put(`https://s56-ayush-capstone-dopahiya.onrender.com/updatebio` , {bio : bio.trim()} , {
            headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` }
          })
            .then((res)=>{
                let obj = {...userData , bio: bio}
                setUserData(obj)
                toast.update(note, {render: "Bio Updated Successfully", type: "success", isLoading: false , autoClose:1000 , hideProgressBar:true , theme:"colored"});
            })
            .catch((err)=>{
                if (err.response.status == 401){
                    return toast.update(note, {render: err.response.data , type: "warning", isLoading: false , autoClose:1000 , hideProgressBar:true , theme:"colored"});
                }
                console.log(err)
            })   
    }

    let handleSaveProfile = () => {
        let username = document.getElementById("recipient-name").value
        let email = document.getElementById("email").value
        let note = toast.loading("Updating Profile..!!" , {
            position: "top-center"
        })
        axios.put(`https://s56-ayush-capstone-dopahiya.onrender.com/updateprofile` , {username : username.trim() , email : email.trim()} , {
            headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` }
          })
            .then((res)=>{
                if (res.data == "Username Already Taken"){
                    return toast.update(note, {render: "Username Already Taken", type: "warning", isLoading: false , autoClose:1000 , hideProgressBar:true , theme:"colored"});
                }else if (res.data == "Email Already Taken"){
                    return toast.update(note, {render: "Email Already Taken", type: "warning", isLoading: false , autoClose:1000 , hideProgressBar:true , theme:"colored"});
                }else{
                    let obj = {...userData , username: username , email: email}
                    sessionStorage.setItem("curruser" , username)
                    sessionStorage.setItem("fav" , userData.fav)
                    setUserData(obj)
                    toast.update(note, {render: "Profile Updated Successfully", type: "success", isLoading: false , autoClose:1000 , hideProgressBar:true , theme:"colored"});
                }
            })
            .catch((err)=>{
                if (err.response.status == 401){
                    return toast.update(note, {render: err.response.data , type: "warning", isLoading: false , autoClose:1000 , hideProgressBar:true , theme:"colored"});
                }
                console.log(err)
            })   
    }

    let handleFileUpload = (e) => {
        console.log(e.target.value)
        let note = toast.loading("Uploading Image..!!" , {
            position: "top-center"
        })
        let file = e.target.files[0]
        let formData = new FormData()
        formData.append("image" , file)
        axios.post(`https://s56-ayush-capstone-dopahiya.onrender.com/upload` , formData , {
            headers: { Authorization: `Bearer ${document.cookie.split("=")[1]}` }
          })
            .then((res)=>{
                let obj = {...userData , profileImg: res.data.url}
                setUserData(obj)
                sessionStorage.setItem("profileImg" , res.data.url)
                toast.update(note, {render: "Image Uploaded Successfully", type: "success", isLoading: false , autoClose:1000 , hideProgressBar:true , theme:"colored"});
            })
            .catch((err)=>{
                if (err.response.status == 401){
                    return toast.update(note, {render: err.response.data , type: "warning", isLoading: false , autoClose:1000 , hideProgressBar:true , theme:"colored"});
                }
                console.log(err)
                toast.update(note, {render: "Error Uploading Image", type: "error", isLoading: false , autoClose:1000 , hideProgressBar:true , theme:"colored"});
            })
    }

    return (
        <div>
            <Navbar />
            {isLoading ? <Loader /> : 
                <div className="profile-body-main flex jus-cen">
                    <div className='profile-img-div flex'>
                        <div className='profile-img'>
                            <img src={userData.profileImg} alt="profile-img" />
                        </div>
                        <label>
                            Change Profile Picture
                            <input type="file" name="image" style={{display:"none"}} onChange={(e)=>handleFileUpload(e)}/>
                        </label>
                    </div>
                    <div className='profile-content-div'>
                        <div className='profile-userDetails'>
                            <div>
                                <h6>UserName</h6>
                                <h4>{userData.username}</h4>
                            </div>
                            <div>
                                <h6>Email</h6>
                                <h4>{userData.email}</h4>
                            </div>
                            <div className='profile-btn-div flex jus-end'>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal-2">Edit</button>
                                <button onClick={()=>handleDelete()}>Delete Account</button>
                            </div>
                        </div>

                        <div className="modal fade" id="exampleModal-2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form>Name
                                        <div className="mb-3">
                                            <label htmlFor="recipient-name" className="col-form-label">Username</label>
                                            <input type="text" defaultValue={userData.username} className="form-control" id="recipient-name"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="col-form-label">Email</label>
                                            <input type="email" defaultValue={userData.email} className="form-control" id="email"/>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={handleSaveProfile} data-bs-dismiss="modal">Save changes</button>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className='profile-fav'>
                            <h6>Favourites</h6>
                            <div className='profile-fav-cont'>
                                {mergedData.map((el,i)=>{
                                    if (userData.fav.includes(el._id)){
                                        return(
                                            <Link to={`/bike/${el.name}`} key={i}>
                                            <div key={i} className='fav-card flex jus-cen align-cen' style={
                                                {
                                                    flexDirection: "column",
                                                    gap: "10px",
                                                    position: "relative"
                                                }
                                            }>
                                                <div className="flex jus-cen">
                                                    <img src={el.banner} alt={"bike"} />
                                                </div>
                                                <div className='flex jus-spBet'>
                                                    <h6>{el.name}</h6>
                                                    <RiDeleteBin5Fill className='dustbin' onClick={(e)=>handlefav(e,el._id)}/>
                                                </div>
                                            </div></Link>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='profile-bio-div'>
                        <div className='bio-div'>
                            <div className='flex jus-spBet align-cen'>
                                <h6>BIO</h6>
                                <BsPencilFill style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#exampleModal"/>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Write new Bio</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">Name
                                                <textarea id="bio-text" defaultValue={userData.bio}></textarea>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" onClick={handleSaveBio} data-bs-dismiss="modal">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p>{userData.bio}</p>
                        </div>
                    </div>
                </div>
            }

            <Footer />

            <ToastContainer />
        </div>
    )
}

export default Profile
