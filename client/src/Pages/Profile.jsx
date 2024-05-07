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

const Profile = () => {

    const [userData, setUserData] = useState({})
    const [bikeDetails , setBikeDetails] = useState([])
    const [bikePhotos , setBikePhotos] = useState([])
    const [mergedData , setMergedData] = useState([])
    const [isLoading , setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://s56-ayush-capstone-dopahiya.onrender.com/getuser/${sessionStorage.getItem("curruser")}`)
            .then((res) => {
                console.log(res.data)
                setUserData(res.data[0])
            })
            .catch((err) => {   
                console.log(err)
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
        axios.post(`https://s56-ayush-capstone-dopahiya.onrender.com/handlefav` , {id : id , user: sessionStorage.getItem("curruser")})
            .then((res)=>{
                let obj = {...userData , fav: res.data.arr}
                setUserData(obj)
                sessionStorage.setItem("fav" , JSON.stringify(res.data.arr))
            })
    }

    let handleDelete = (id) =>{
        let note = prompt("Are you sure you want to delete your account? This action is irreversible. If you are sure, type 'DELETE' in the box below.")
        if (note === "DELETE"){
            axios.delete(`https://s56-ayush-capstone-dopahiya.onrender.com/deleteuser/${id}`)
            .then((res)=>{
                console.log(res.data)
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
        axios.put(`https://s56-ayush-capstone-dopahiya.onrender.com/updatebio/${userData._id}` , {bio : bio.trim()})
            .then((res)=>{
                let obj = {...userData , bio: bio}
                setUserData(obj)
                toast.update(note, {render: "Bio Updated Successfully", type: "success", isLoading: false , autoClose:1000 , hideProgressBar:true , theme:"colored"});
            })
            .catch((err)=>{
                console.log(err)
            })   
    }

    let handleSaveProfile = () => {
        let username = document.getElementById("recipient-name").value
        let email = document.getElementById("email").value
        let note = toast.loading("Updating Profile..!!" , {
            position: "top-center"
        })
        axios.put(`https://s56-ayush-capstone-dopahiya.onrender.com/updateprofile/${userData._id}` , {username : username.trim() , email : email.trim()})
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
                console.log(err)
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
                        <button>
                            Change Profile Picture
                        </button>
                        <button>
                            Remove Profile Picture
                        </button>
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
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal-2">Edit</button>
                                <button onClick={()=>handleDelete(userData._id)}>Delete Account</button>
                            </div>
                        </div>

                        <div class="modal fade" id="exampleModal-2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label">Username</label>
                                            <input type="text" defaultValue={userData.username} class="form-control" id="recipient-name"/>
                                        </div>
                                        <div class="mb-3">
                                            <label for="email" class="col-form-label">Email</label>
                                            <input type="email" defaultValue={userData.email} class="form-control" id="email"/>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={handleSaveProfile} data-bs-dismiss="modal">Save changes</button>
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

                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Write new Bio</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <textarea id="bio-text" defaultValue={userData.bio}></textarea>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary" onClick={handleSaveBio} data-bs-dismiss="modal">Save changes</button>
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

            <ToastContainer />
        </div>
    )
}

export default Profile
