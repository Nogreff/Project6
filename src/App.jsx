import { useState ,useEffect,useCallback} from 'react'
import './App.css'
import TodoList from "./components/TodoList"
import TodoSubmit from "./components/TodoSubmit"

function App() {
  const [todoData, setTodoData] = useState([])
  var checkInterval
  const newTodo = (todo,timeDisabled) =>{
    
    if(!todo.text || /^\s*$/.test(todo.text) || (!todo.time && timeDisabled.checked===false)){
      return;
    }
    console.log(todo)
    const newRegister =[todo,...todoData]
    setTodoData(newRegister)
    console.log(todoData)
  }
  const deleteTodo = (todo)=>{
    setTodoData(todoData.filter(index=>index.id!==todo))
  }
  const updateTodo=(todoId,newTxt,newTime,newRepeat,updateCheck)=>{
    if(!newTxt || /^\s*$/.test(newTxt) || (!newTime && updateCheck.checked===false)){
      return;
    }
    console.log(updateCheck)
    let todoUpdate=todoData
    for(let i = 0;i<todoData.length;i++){
      if(todoData[i].id===todoId){
        todoUpdate[i].text=newTxt
        todoUpdate[i].time=!newTime || updateCheck.checked==true?"no timer":newTime
        todoUpdate[i].counter="00:00"
        todoUpdate[i].repeat=newRepeat.checked
        console.log("update")
        setTodoData(todoUpdate)
      }
    }
  }
/*   const testt =(x)=>{
    setTimeout(()=>setTodoData(x),500)   
    console.log("33?")
   } */

  console.log(todoData)
/*   useEffect(()=>{
    var x=todoData
    console.log("1?")
    if(todoData.length>0){
      for(let i=0;x.length>i;i++){
        console.log("2?")
        if(x[i].time){
          console.log("3?")
          console.log(x[i].time)
         x[i].time=x[i].time-1  
         console.log(x[i].time)
        }
        if((i+1)>=x.length){
          console.log("4?")
          
        }
      } */
      //setTimeout(()=>setTodoData(todoData=>todoData=x),1000)
      //setTimeout(()=>testt(x),1000)
/*       if(x){
        console.log("4?")
        testt(x) 
      }
      function testt(z){
        setTimeout(()=>setTodoData(todoData=>todoData=z),1000) 
        console.log("33?")
       } */
/*     }
    
  },[todoData]) */

/*   const updateTodo=(new)=>{

  } */
  return (
    <div className="App">
      <h1>ToDo List</h1>
      <TodoSubmit newTodo={newTodo}/>
      <TodoList 
        todoData={todoData}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        setTodoData={setTodoData}
        checkInterval={checkInterval}
      />
    </div>
  )
}

export default App
