import {FaBell, FaTimes} from 'react-icons/fa'
function Task({task, onDelete, onToggle}) {
    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`}>
        <h3> {task.text} 
        <FaTimes style={{float:'right',color:'red',cursor:'pointer'}} onClick={()=>
            onDelete(task.id)}/>
        <FaBell style={{float:'right',color:'rgb(48, 173, 173)',cursor:'pointer'}} onClick={()=>
            onToggle(task.id)}/> 
           </h3>
        <p>{task.day}</p>
        </div>
    )
}

export default Task
