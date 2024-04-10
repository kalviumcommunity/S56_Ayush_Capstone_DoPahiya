import React , {useState , useEffect}from 'react'
import Navbar from '../Components/Navbar'
import "./fmpb.css"
import R15 from "../assets/r15.png"
import FmpbComp from '../Components/fmpbComp'
import Footer from '../Components/Footer'

let questions = [
    {
        ques : "Do you prefer a bike with gears or a single-speed bike ?",
        options : [
            "Bike with Gears",
            "Single Speed Bike",
            "Comfortable with both"
        ]
    },
    {
        ques : "What type of riding do you plan to do ?",
        options : [
            "Street Riding",
            "Touring",
            "Sports Riding",
            "Adventure Riding"
        ]
    },
    {
        ques : "Is Mileage a big concern for you ?",
        options : [
            "Yes",
            "No"
        ]
    },
    {
        ques : "What is your budget ?",
        options : [
            "Under 2 Lakh",
            "2-4 Lakh",
            "Flexible with Budget"
        ]
    }
]

const FindMyPerfectBike = () => {

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

    let handleFormBtn = ()=>{
        setCurrQues(currQues + 1)
    }

    let handleSubmit = () =>{
        setShowQues(!showQues)
        setShowList(!showBikeList)
        console.log(answers)
    }

    const handleOptionSelect = (option) => {
        const newAnswers = [...answers];
        newAnswers[currQues] = option;
        setAnswers(newAnswers);
    };

    console.log(currQues)

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

  return (
    <div className='fmpb-main-div'>
        <Navbar />
        
        <div className='fmpb-content flex jus-cen align-cen'>
            <div className='fmpb-head-content'>
                <h1>Welcome User, </h1>
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
                                        <input type="radio" key={index} name={questions[currQues].ques} value={ele} onChange={() => handleOptionSelect(ele)} checked={answers[currQues] === ele}/> 
                                        <label>{ele}</label>
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
                    <FmpbComp />
                    <FmpbComp />
                    <FmpbComp />
                    <FmpbComp />
                </div>
            </div>}

            { showFav && <div className='flex jus-cen align-cen fmpb-bikelist-maindiv'>
                <div>
                    <h2>Favourite Bikes </h2>
                    <FmpbComp />
                    <FmpbComp />
                    <FmpbComp />
                    <FmpbComp />
                </div>
            </div>}

        </div>

        <Footer />

    </div>
  )
}

export default FindMyPerfectBike
