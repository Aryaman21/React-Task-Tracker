import {useState} from 'react'

const AddTasks = ({onAdd}) => {
    const [text,setText] = useState('')
    const [day,setDay] = useState('')
    const [reminder,setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        if(!text){
            alert('Please add task')
            return
        }
        onAdd({text, day, reminder})
        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit} >
            <div className='form-control'>
                <label><b>Task</b><br></br></label>
                <input type = 'text' placeholder='Add Task' value={text} onChange={(e)=>setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label><b>Day & Time</b><br></br></label>
                <input type = 'text' placeholder='Add Date & Time' value={day} onChange={(e)=>setDay(e.target.value)}></input>
            </div>
            <div className='form-control form-control-check'>
                <label><b>Set Reminder</b></label>
                <input type = 'checkbox' checked = {reminder}
                value={reminder} onChange={(e)=>setReminder(e.currentTarget.checked)} ></input>
            </div>
            <input type='submit' value='Save Task' className='btn-block'></input>
        </form>
    )
}

export default AddTasks
