import Header from './components/Header'
// import React from 'react'
import Tasks from './components/Tasks'
import {useState,useEffect} from 'react'
import AddTasks from './components/AddTasks' 

function App() {
  const [showAddTask,setShowAddTask] = useState(false)
  const [tasks,setTasks] = useState([])
  useEffect(()=>{
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks()
  },[])

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }
  // fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  // add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data= await res.json()
    setTasks([...tasks,data])
    // const id = Math.floor(Math.random()*10000) + 1
    // const newTask = {id, ...task}
    // setTasks([...tasks,newTask])
  }
  // for deleting purpose
  const deleteTask = async (id)=>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE',
    })
    setTasks(tasks.filter((task)=>task.id !== id))
  }
  // for toogling reminder
  const toggleReminder = async (id)=>{
    const taskToToggle = await fetchTask(id)
    const updtTask = {...taskToToggle,reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updtTask)
    })
      const data = await res.json()
    setTasks(tasks.map((task)=>task.id===id ? {...task,reminder : data.reminder} : task))
  }
  
  return (
    <div className='container'>
      <Header title='Task Tracker: ' onAdd= {() => setShowAddTask(!showAddTask)} showAdd={showAddTask} 
      text={showAddTask ? 'Close':'Add'} color={showAddTask ? 'red':'green'} />
      {showAddTask && <AddTasks onAdd = {addTask} />}
      <hr></hr>
      {tasks.length>0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle= {toggleReminder} /> 
      : 'No tasks to show'}
    </div>
  );
};

export default App;
