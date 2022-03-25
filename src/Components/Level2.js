import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../App.css';
import axios from "axios";
function Level2(props) {
    //console.log(props.dataToNext)
    const [questions,setquestions]=useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [option, setoption] = useState("");
        const getquestions=()=>
        {
            useEffect(() => {
                axios.get("http://localhost:5001/questions/"+props.dataToNext+"/2").then((res)=>
                {   
                   
                    setquestions(res.data.questions);
                }
                )
            }, [])
           
        }
    getquestions();
    // console.log(questions);
    const check = () => {
        const answer = option
        if (answer == questions[currentQuestion]["answers"][0]["text"]) {
            setScore(score + 1)
        }
        // console.log(currentQuestion)
        if (currentQuestion + 1 < questions.length)
            setCurrentQuestion(currentQuestion + 1);
        else 
            setShowScore(true);

    }
    const setCurrentOption = (e) => {
        setoption(e.target.value)
        //console.log(e.target.value);
    }
    return (<>
        <div>
            {showScore ? (<div className='score-section'>
                You scored {score} out of {questions.length}
            </div>) : (
                <>
                    <h2>Welcome to {props.dataToNext} quiz Level 2 </h2>
                        {questions.map(function(d, idx){
                            if(idx==currentQuestion) return (
                        <>
                            <div className='question-section'>
                                    <div className='question-count'>
                                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                                    </div>
                            <div className='question-text'>{d.question}</div>
                            </div>

                            { d["options"].map((o, index) => (
                                <> <div className="form-check">
                                    <input className="form-check-input" onChange={setCurrentOption} type="radio" name="radio" value={o.text}></input>
                                    <label className="form-check-label" for={index} >{o.text}</label>
                                </div>
                                </>
                            ))}
                        </>
                        )
                        })}
                    <button ClassName="btn btn-primary" onClick={check}>Next</button>
                </>
            )
            }
        </div>
    </>
    )
}

export default Level2