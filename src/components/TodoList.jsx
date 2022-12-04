import React from 'react'
import "../css/TodoList.css"
import {useState,useRef,useEffect,useCallback} from "react"
import { ReactDOM } from 'react'
import { render } from 'react-dom'
import timeUpSound from "../assets/sound/timeup1.wav"

function TodoList(props) {
  var checkInterval
  const {todoData,deleteTodo,updateTodo,setTodoData}=props
  const reftest=useRef(false)
  const [updateSetup,setUpdateSetup]=useState(false)
  const [timeUp,setTimeUp]=useState(false)
  const [todoId,setTodoId]=useState([])
  const[todoNewText,setTodoNewtext]=useState("")
  const[todoNewTime,setTodoNewTime]=useState("")
  const[todoTimer,setTodoTimer]=useState(new Audio(timeUpSound))
  const controlRef=useRef(new Audio(timeUpSound))
  const updateTimeEnable=useRef([])
  const updateTimeRepeat=useRef([])
  const updateTimeRef=useRef([])
  const updateTextRef=useRef([])
  const txtRef=useRef()
  const doneRef=useRef()
  const textUpdateError=useRef([])
  const timeUpdateError=useRef([])

  //console.log(todoData[2].text)
  const updateCheck =(id)=>{
        setTodoId([...todoId,id])
        console.log(todoId)
  }
  const updatedCheck =(id)=>{
    if(!updateTextRef.current[id].value){
      textUpdateError.current[id].classList.add("error")
      updateTextRef.current[id].classList.add("error")
      updateTextRef.current[id].value=""
    }else{
      textUpdateError.current[id].classList.remove("error")
      updateTextRef.current[id].classList.remove("error")
    }
    if(updateTimeEnable.current[id].checked===false &&!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(updateTimeRef.current[id].value)){
      timeUpdateError.current[id].classList.add("error")
      updateTimeRef.current[id].classList.add("error")
      updateTimeRef.current[id].value=""
    }else if(timeUpdateError.current[id].value || (updateTimeEnable.current[id].checked===true && !updateTimeRef.current[id].value)){
      timeUpdateError.current[id].classList.remove("error")
      updateTimeRef.current[id].classList.remove("error")
    }
    if((updateTextRef.current[id].value && updateTimeRef.current[id].value) || (updateTextRef.current[id].value && updateTimeEnable.current[id].checked===true)){
      setTodoId(todoId.filter(index=>index!==id))
    }
    console.log(todoId)
}
/*   const updateCheck =(id)=>{
    if(updateSetup===false){
        setUpdateSetup(true)
        setTodoId([...todoId,{id:id,update:true}])
        console.log(todoId)
    }else if(updateSetup===true){
      setUpdateSetup(false)
      setTodoId(todoId.filter(index=>index.id!==id))
    }
  } */
  const newText =(e,id)=>{
    //setTodoNewtext(e.target.value)
    updateTextRef.current[id].value=e.target.value
    if(updateTextRef.current[id].validity.valueMissing===false){
      textUpdateError.current[id].classList.remove("error")
      updateTextRef.current[id].classList.remove("error")
    }
  }
  const newTime=(e,id)=>{
    //setTodoNewTime(e.target.value)
    updateTimeRef.current[id].value=e.target.value
    if(updateTimeRef.current[id].validity.valueMissing===false){
      timeUpdateError.current[id].classList.remove("error")
      updateTimeRef.current[id].classList.remove("error")
    }
  }
  const timeEnabler =(id)=>{
    if(updateTimeEnable.current[id].checked===false){
      updateTimeRepeat.current[id].disabled=false
      updateTimeRef.current[id].disabled=false
      updateTimeRef.current[id].classList.toggle("disabled")
  }else if(updateTimeEnable.current[id].checked===true){
        updateTimeRepeat.current[id].disabled=true
        updateTimeRepeat.current[id].checked=false
        updateTimeRef.current[id].value=""
        updateTimeRef.current[id].disabled=true
        updateTimeRef.current[id].classList.toggle("disabled")
    } 
  }

  const setTimer=(x)=>{
    if(todoData.length>0){

      console.log(todoTimer)
      //setTimeout(()=>setTodoTimer(todoTimer[x]?todoTimer[x]-1:[todoData[x].time-1,...todoTimer]),1000)
     //setTodoTimer([todoData[x].time-1,...todoTimer])
    }
  }
  function controlLoop(x){
    controlRef.current=x
    console.log(todoEnd.loop)
    controlRef.current=false
  }
  const countFormat=(x)=>{
      let xx=x
      for(let i=0;xx.length>i;i++){
        if(x[i].time && x[i].counter!=="time up"){
          console.log(xx)
          console.log(todoData)
        let todoEnd=todoTimer
        let timerCount
        let actualDate=new Date()
        let newTimer =x[i].time.split(":");
        let hh=actualDate.getHours(),mm=actualDate.getMinutes(),h=parseInt(newTimer[0]),m=parseInt(newTimer[1]),hhh,mmm,timeDif
        timeDif=(h*60+m)>=(hh*60+mm)?(h*60+m)-(hh*60+mm):(h*60+m+1440)-(hh*60+mm)
        console.log(hh,h,mm,m)
        if(timeDif===0){
          hhh=0
          mmm=0        
          timerCount="time up"
          console.log(x[i].repeat)
          reftest.current=true
          console.log(timeDif)
          console.log(hhh,mmm)
          setTimeUp(true)

          if(x[i].done===false && x[i].repeat===false){
            controlRef.current.play()
            controlRef.current.loop=true
/*             setTodoTimer(todoTimer=>{todoTimer.play();todoTimer.loop=true})*/
            setTimeout(()=>controlRef.current.loop=false,5000)
          }else if(x[i].done===false && x[i].repeat===true){
            controlRef.current.play()
            controlRef.current.loop=true
          }
          console.log("time up?"+timeUp)
        }else if(hh<=h && timeDif<60){
          hhh=0
          mmm=timeDif
        }else {
          hhh=parseInt(timeDif/60)
          mmm=timeDif%60
          console.log(timeDif)
          console.log(hhh,mmm)
          //hh<=h?hhh=h-hh:hhh=hh-h 
          //mm<=m?mmm=m-mm:mmm=mm-m
        }
        hhh=hhh<10?"0"+hhh:hhh
        mmm=mmm<10?"0"+mmm:mmm
        if(timerCount!=="time up")timerCount=hhh+":"+mmm
        let aa =xx[i].counter===timerCount
         xx[i].counter=timerCount
         console.log(xx[i].counter===timerCount)
         if(aa===false){
          setTodoData(xx=>[...xx])
          xx=[]
         }
         
        }
      }
    }
  
  function todoDone(x){
    let currentData=todoData
    for(let i=0;i<todoData.length;i++){
      if(todoData[i].id===x){
        currentData[i].done=!currentData[i].done
      }
    }
    setTodoData([...currentData])
    console.log(todoData)
  }

/*     let actualDate=new Date()
    let newTimer =xx[0].time.split(":");
    let hh=actualDate.getHours(),mm=actualDate.getMinutes(),h=parseInt(newTimer[0]),m=praseInt(newTimer[1])
    console.log(hh,h,mm,m)
    hh<=h?hh=h-hh:hh=hh-h 
    mm<=m?mm=m-mm:mm=mm-m
    hh=hh<10?"0"+hh:hh
    mm=mm<10?"0"+mm:mm
    let timerCount= mm>0 || hh>0?hh+":"+mm:"it's time"
    console.log(timerCount) */
    
    //return mm>0 || hh>0?hh+":"+mm:"it's time"
  
  useEffect(()=>{
    if(todoData.length>0){
      //setInterval(setTodoData(todoData),1000)
      //setTodoTimer(timerCount)
      checkInterval=0
      checkInterval=setInterval(()=>countFormat(todoData),1000)   
    }


  },[todoData])
  console.log(updateTimeEnable)
 console.log(updateTimeRepeat)
  return (
    <div>
        {
          todoData.map((value, index)=>{
            
  /*           let newTimer =value.time.split(":");
            var timerX=countFormat(parseInt(newTimer[0]),parseInt(newTimer[1]),value.id)
            setInterval(()=>{
              countFormat(parseInt(newTimer[0]),parseInt(newTimer[1]),value.id)
            },1000)
            console.log( setInterval(()=>{
              countFormat(parseInt(newTimer[0]),parseInt(newTimer[1]),value.id)
              timerX=countFormat(parseInt(newTimer[0]),parseInt(newTimer[1]),value.id)
            },1000)) */
/*          
              
              if(!todoTimer.id)setTimeout(setTodoTimer([{id:index,timer:(hh*60)},...todoTimer]),1000) */
              /* if(mm>0)setTimeout(setTodoTimer(mm--),1000)
              if(hh>0 && mm===0)setTimeout(hh--,1000)  */       
             //if(todoTimer.some(x=>x[index]!==value.time))setTodoTimer([value.time,...todoTimer])
           // if(!todoTimer.some(index=>index===value.time))setTodoTimer([value.time,...todoTimer])
          // setTimer(index)
           return (
           timeUp===true && value.counter==="time up"?
            <div className='todo_now' key={value.id}>
              <a>{value.text}</a>
              <a className="todo_now_btn" onClick={()=>{controlRef.current.loop=false;deleteTodo(value.id)}}>Done</a>
            </div>
            :(todoId.some(index=>index===value.id))?
            <div className='todo_update' key={value.id}>
              <div ref={index=>textUpdateError.current[value.id]=index} className='text_updated_wrapper'>
                <input
                  ref={index=>updateTextRef.current[value.id]=index}       
                  onChange={(e)=>newText(e,value.id)}
                  className='text_updated'
                  defaultValue={value.text}
                  required
                />
              </div>
              <div ref={index=>timeUpdateError.current[value.id]=index} className='time_updated_wrapper'>
              <input
                  ref={index=>updateTimeRef.current[value.id]=index}
                  defaultValue={value.time!=="no timer"&& value.time}
                  type="time"
                  onChange={(e)=>newTime(e,value.id)}
                  className="time_updated"
                  required
                />
              </div>
              <div className='update_timer_options'>
                <span className='update_enable_wrapper'>
                  <input
                    ref={index=>updateTimeEnable.current[value.id]=index}
                    type="checkBox"
                    onChange={()=>timeEnabler(value.id)}
                    className="time_check_enable"
                  />
                </span>
                <span className='update_repeat_wrapper'>
                  <input
                    ref={index=>updateTimeRepeat.current[value.id]=index}
                    type="checkBox"
                    className="time_check_repeat"
                  />
                </span>
              </div>
              <button className='updated_btn' onClick={()=>{updateTodo(value.id,updateTextRef.current[value.id].value,updateTimeRef.current[value.id].value,updateTimeRepeat.current[value.id],updateTimeEnable.current[value.id]);updatedCheck(value.id)}}>Update</button>
            </div>
            :
            <div className={value.done===true?'todo_info done':'todo_info'} key={value.id}>
              <a className={value.done===true?'todo_text done':'todo_text'}>{value.text}</a>
              <span className={value.repeat===true?'repeat_sound':value.time==="no timer"?'no_sound':null}><a>{value.time==="no timer"?"":value.time}</a></span>
              <div className='todo_info_options'>
                <a ref={doneRef} className={value.done===true?'todo_info_done done':'todo_info_done'} onClick={()=>todoDone(value.id)}></a>
                <a id="todo_info_delete"onClick={()=>deleteTodo(value.id)}></a>
                <a id="todo_info_update"onClick={()=>updateCheck(value.id)}></a>
              </div>
            </div>
          )
        })  
        }
    </div>
  )
}


export default TodoList