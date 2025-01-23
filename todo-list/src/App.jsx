import { useState, useRef, useEffect } from 'react';
import './index.css';



function Input({taskId, tasks, setTasks}) {
  const [inputTask, setInputTask] = useState('');

  return(
      <input className='bg-purple-100' placeholder='Update Task' value={inputTask} onChange={(e) => setInputTask(e.target.value)} 
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const updatedTasks = tasks.map((task) => task["id"] === taskId ? {...task, inputValue: inputTask, editable: false} : task);
            setTasks(updatedTasks);
          }
        }}
      />
  ) 
}


export default function App() {
  const [activeButton, setActiveButton] = useState('0');
  const [input, setInput] = useState('');
  const [placeholder, setPlaceholder] = useState('What would you like to do?');
  const [progressTodos, setProgressTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [editable, setEditable] = useState(false);
  const [time, setTime] = useState(new Date());


  useEffect(() => {
    setInterval(() => {setTime(new Date())}, 60000);
  }, []);

  function handleTime(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    let time = date.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
});

    return (
      <div className='flex ml-auto text-xl gap-4'>
        <div>{`${month} ${day} ${year}`}</div>
        <div>{`${time}`}</div>
      </div>
    )

  }

  function handleButtonClick(buttonId) {
    setActiveButton(buttonId);
  }

  function handleDelete(id) {
    let updatedProgressTodos = progressTodos.filter((task) => task["id"] != id);
    setProgressTodos(updatedProgressTodos);
  }

  function handleCompleted(task) {
    handleDelete(task["id"]);
    setCompletedTodos([...completedTodos, task]);
  }

  function handleEditable(id, newEditValue) {
    setEditable(newEditValue);
    const updatedProgressTodos = progressTodos.map((todo) => todo["id"] === id ? 
    {...todo, editable: editable} : todo);
    setProgressTodos(updatedProgressTodos); 
  }
  
  return (
    <div className='flex justify-between mt-12 mr-32'>
      <div className="flex flex-col gap-10 h-screen justify-center ml-32 w-96">
        <div className='text-5xl'>Let's make today a productive day.</div>
        <div className='flex gap-8'>
        <input className='w-60' placeholder={placeholder} value={input}
          onChange={(e) => setInput(e.target.value)} />  
          <button onClick={() => {
            if (input === '') {
              setPlaceholder("Please type in a task first");
            }
            else {
              let task = {taskState:"In progress", id: Date.now(), inputValue:input, editable: editable};
              setInput('');
              setPlaceholder('What would you like to do?');
              setProgressTodos([...progressTodos, task]);
            }
          }}className='bg-purple-900 rounded-full text-white w-32 h-10'>Create Task</button>
        </div>
      </div>
      <div className='flex flex-col w-6/12 gap-16'>
        {handleTime(time)}
        <div className='grid grid-cols-2 divide-x outline-none rounded-full text-center'>
          <button style={{backgroundColor: activeButton === '0' ? '#f3e8ff' : 'white'}} 
          onClick={() => {
            handleButtonClick('0');
            }}>
            In Progress
          </button>
          <button style={{backgroundColor: activeButton === '1' ? '#f3e8ff' : 'white'}} 
          onClick={() => {
            handleButtonClick('1');
          }}>
            Completed
          </button>
        </div>
        <div className='h-96 rounded-3xl outline-none bg-purple-100 overflow-auto'>
            { 
              activeButton === '0' &&
              progressTodos.map((task) => (
              <div key={task["id"]} className='flex justify-between p-8'>
                  {
                    task["editable"] && <Input taskId={task["id"]} tasks={progressTodos} setTasks={setProgressTodos}/> 
                  }

                  {
                    !task["editable"] && <div>{task["inputValue"]}</div>
                  }
                  <div className='flex gap-12'>
                    <div className='text-lg cursor-pointer' onClick={() => handleCompleted(task)}>&#10003;</div>
                    <div className='text-xl cursor-pointer' onClick={() => handleDelete(task["id"])}>&times;</div>
                    <div onClick={() => handleEditable(task["id"], true)} className='text-xl cursor-pointer'>&#128393;</div>
                  </div>
              </div>
              ))
            }

            {activeButton === '1' && completedTodos.map((task) => (
              <div key={task["id"]} className='flex justify-between p-8'>
                  {task["inputValue"]}
              </div>
            ))}
          
        </div>
      </div>
    </div>
  )
}
