import React, { useRef, useState } from 'react'
import "./Quiz.css"
import "../Global.css"
import {data} from "../Assets/data.js"


const Quiz = () => {
  let [index,setIndex]=useState(0)
  let [question,setQuestion]=useState(data[index])
  let [lock,setLock]=useState(false)
  let [score,setScore]=useState(0)
  let [result,setResult]=useState(false)
  let Option1=useRef(null)
  let Option2=useRef(null)
  let Option3=useRef(null)
  let Option4=useRef(null)

  let opt_arr=[Option1,Option2,Option3,Option4]
  let checkAns=(ele,ans)=>{
    if(lock===false){
      if(question.ans===ans){
        ele.target.classList.add("correct")
        setLock(true)
        setScore(prev=>prev+1)
      }else{
        ele.target.classList.add("wrong")
        setLock(true)
        opt_arr[question.ans-1].current.classList.add("correct")
      }
    }
  }

  let next=()=>{
    if (lock===true) {
      if (index===data.length-1) {
        setResult(true)
        return 0
      }
      setIndex(++index)
      setQuestion(data[index])
      setLock(false)
      opt_arr.map((option)=>{
        option.current.classList.remove("wrong")
        option.current.classList.remove("correct")
        return null
      })
    }
  }
  let reset =()=>{
    setIndex(0)
    setQuestion(data[0])
    setScore(0)
    setLock(false)
    setResult(false)
  }
  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr/>
        {result?<></>:<><h2>{index+1}. {question.question}</h2>
        <ul>
            <li ref={Option1} onClick={(ele)=>{checkAns(ele,1)}}>{question.option1}</li>
            <li ref={Option2} onClick={(ele)=>{checkAns(ele,2)}}>{question.option2}</li>
            <li ref={Option3} onClick={(ele)=>{checkAns(ele,3)}}>{question.option3}</li>
            <li ref={Option4} onClick={(ele)=>{checkAns(ele,3)}}>{question.option4}</li>
            
        </ul>
        <button onClick={next}>Next</button>
        <div className="index">
            {index+1} of {data.length} Questions
        </div></>}
        {result?<><h2>You Scored {score} out of {data.length}</h2>
        <button onClick={reset}>Reset</button></>:<></>}
        
        
      
    </div>
  )
}

export default Quiz
