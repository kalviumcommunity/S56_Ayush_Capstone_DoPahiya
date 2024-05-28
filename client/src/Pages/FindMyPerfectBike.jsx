import React , {useState , useEffect, useContext}from 'react'
import Navbar from '../Components/Navbar'
import "./fmpb.css"
import FmpbComp from '../Components/fmpbComp'
import Footer from '../Components/Footer'
import { Context } from '../App'

let questions = [
    {
        ques : "Do you prefer a bike with gears or a single-speed bike ?",
        options : [
            ["Bike with Gears", ["6 Speed","5 Speed","4 Speed"]],
            ["Single Speed Bike", ["CVT","Automatic"]],
            ["Comfortable with both", ["6 Speed","5 Speed","4 Speed","CVT","Automatic"]]
        ]
    },
    {
        ques : "What type of riding do you plan to do ?",
        options : [
            ["Street Riding", ["Street" , "Naked"]],
            ["Touring", ["Tourer" , "Cruiser"]],
            ["Sports Riding", ["Sports", "Naked"]],
            ["Adventure Riding", ["Adventure" , "Adventure"]]
        ]
    },
    {
        ques : "Is Mileage a big concern for you ?",
        options : [
            ["Yes",40],
            ["No",5]
        ]
    },
    {
        ques : "What is your budget ?",
        options : [
            ["Under 2 Lakh", [0,170000]],
            ["2-4 Lakh",[170000,370000]],
            ["Flexible with Budget",[0,1000000]]
        ]
    }
]

const FindMyPerfectBike = ({mergedData}) => {

    useEffect(()=>{
        window.scrollTo({
          top:0
        }) 
      },[])

    const [showQues , setShowQues] = useState(false)
    const [showBikeList , setShowList] = useState(false)
    const [showFav , setshowFav] = useState(false)
    const [currQues , setCurrQues] = useState(0)
    const [answers , setAnswers] = useState([])
    const [bikeListData , setBikeListData] = useState([])
    const [favs , setFavs] = useState([])
    const {completeData} = useContext(Context)

    let handleFormBtn = ()=>{
        setCurrQues(currQues + 1)
    }

    let handleSubmit = () =>{
        setShowQues(!showQues)
        setShowList(!showBikeList)
        console.log(answers)
        let filteredData = completeData.filter((el,i)=>{
            if(answers[0].includes(el.gearBox) && (answers[0].length == 2 ? el.bodyType.includes("Scooter") : (el.bodyType.includes(answers[1][0]) || el.bodyType.includes(answers[1][1]))) && parseInt(el.cityMileage.split(" ")[0]) >= answers[2] && el.exShowroomPrice > answers[3][0] && el.exShowroomPrice < answers[3][1]){
                return el
            }
        })
        setBikeListData(filteredData)
    }

    const handleOptionSelect = (option) => {
        const newAnswers = [...answers];
        newAnswers[currQues] = option;
        setAnswers(newAnswers);
    };

    let handleClick = () =>{
        setShowQues(true)
        setShowList(false)
        setshowFav(false)
        setCurrQues(0)
    }

    let handlefav = () =>{
        setShowQues(false)
        setShowList(false)
        setshowFav(true)
    }

    let handleBack = () =>{
        if (currQues > 0){
            setCurrQues(currQues-1)
        }
    }

    useEffect(()=>{
        if (sessionStorage.getItem("fav")){
            setFavs(JSON.parse(sessionStorage.getItem("fav")))
        }
    },[showFav])

  return (
    <div className='fmpb-main-div'>
        <Navbar />
        
        <div className='fmpb-content flex jus-cen align-cen'>
            <div className='fmpb-head-content'>
                <h1>Welcome {localStorage.getItem("curruser")}, </h1>
                <h4>Embark on a personalized journey to discover your perfect bike with our FindMyPerfectBike section. Answer a few simple questions about your preferences, riding style, and desired features, and let us guide you to the bike that suits you best.</h4>
                <button onClick={handleClick} className='ques-btn'>Take Questions</button><br />
                <button className='fav' onClick={handlefav}>Favourites</button>
            </div>
            <hr />
            { showQues && <div id='ques-cont-main flex jus-cen'>
                <form className='fmpb-ques-cont' id='form'>
                    {
                        <div className='ques-div'>
                            <p className='ques' key={currQues}>{currQues + 1}. {questions[currQues].ques}</p>
                            <div className='options-div flex'>
                                {questions[currQues].options.map((ele,index)=>{
                                    return <div className='flex align-cen' key={index}>
                                        <input type="radio" key={index} name={questions[currQues].ques} value={ele[1]} onChange={() => handleOptionSelect(ele[1])} checked={answers[currQues] === ele[1]}/> 
                                        <label>{ele[0]}</label>
                                    </div>
                                })}
                            </div>
                        </div>
                    }
                    
                    <button className='nextbtn' style={{marginRight:"20px"}} onClick={handleBack}>Back</button>
                    {
                        currQues == questions.length - 1 ? <input type="button" className='nextbtn' value={"SUBMIT"} onClick={handleSubmit}/> : <input onClick={handleFormBtn} className='nextbtn' value="Next" type="button"/>
                    }
                </form>
            </div>}

            { showBikeList && <div className='flex jus-cen align-cen fmpb-bikelist-maindiv'>
                <div>
                    <h2>BikeList</h2>
                    <div className='flex jus-cen align-cen' style={{flexDirection: "column"}}>
                        {bikeListData.length == 0 ? <h6>Bike Not Found</h6> : bikeListData.map((el,i)=>{
                            return <FmpbComp key={i} el={el} setshowFav={setshowFav}/>
                        })}
                    </div>
                </div>
            </div>}

            { showFav && <div className='flex jus-cen align-cen fmpb-bikelist-maindiv'>
                <div>
                    <h2>Favourite Bikes </h2>
                    {mergedData.map((el,i)=>{
                        if (favs.includes(el._id)){
                            return <FmpbComp key={i} el={el}/>
                        }
                    })}
                </div>
            </div>}

        </div>

        <Footer />

    </div>
  )
}

export default FindMyPerfectBike
