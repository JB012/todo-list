import { useState, useRef } from 'react';
import './App.css';



function Input() {
  const [isDisabled, setDisabled] = useState(false);
  const inputRef = useRef();

  function handleDisabled(bool) {
    setDisabled(bool);
  }

  function handleInput() {
    inputRef.current.focus();
  }

  return(
        <input placeholder='Enter Task' ref={inputRef} disabled={isDisabled} onKeyDown={(e) => {
          if(e.key === 'Enter') {
            handleDisabled(true);
          }
        }} style={{backgroundColor: '#f3e8ff'}} />
  )
}

export default function App() {
  const [activeButton, setActiveButton] = useState('0');
  const [tasks, setTasks] = useState([]);

  function handleButtonClick(buttonId) {
    setActiveButton(buttonId);
  }

  function handleDelete(id) {
    console.log(id);
    const progressTasks = tasks.filter((task) => 
      task["id"] !== id);
    console.log(progressTasks);
    setTasks(progressTasks);
    console.log(tasks);
  }

  function handleTask(task) {
    setTasks([...tasks, task]);
  }

  
  return (
    <div className='flex justify-between mt-12 mr-32'>
      <div className="flex flex-col gap-10 h-screen justify-center ml-32 w-96">
        <div className='text-5xl'>Let's make today a productive day.</div>
        <button onClick={() => {
          handleTask({taskState:"In progress", id: Date.now(), element: <Input/>});
        }}className='bg-purple-900 rounded-full text-white w-32 h-10'>Create Task</button>
      </div>
      <div className='flex flex-col w-6/12 gap-16'>
        <div className='ml-auto text-xl'>Jan 21th 2025 12:16 PM</div>
        <div className='grid grid-cols-2 divide-x divide-black outline outline-black rounded-full text-center'>
          <button style={{backgroundColor: activeButton === '0' ? '#f3e8ff' : 'white'}} 
          onClick={() => {
            handleButtonClick('0');
            const progressTasks = tasks.filter((task) => task["taskState"] === "In progress");
            setTasks(progressTasks);
            }}>
            In Progress
          </button>
          <button style={{backgroundColor: activeButton === '1' ? '#f3e8ff' : 'white'}} 
          onClick={() => {
            handleButtonClick('1');
            const completedTasks = tasks.filter((task) => task["taskState"] === "Completed");
            setTasks(completedTasks);
          }}>
            Completed
          </button>
        </div>
        <div className='h-96 rounded-3xl outline-none bg-purple-100'>
          <ul>
            {
            tasks.map((task) => (
              
    <div key={task["id"]} className='flex justify-between p-8'>
        <li>{task["element"]}</li>
        <div className='flex gap-12'>
          <div className='text-lg cursor-pointer'>&#10003;</div>
          <div className='text-xl cursor-pointer' onClick={() => {
            handleDelete(task["id"]);
          }}>&times;</div>
          <div onClick={() => 
          {
            setDisabled(false);
            handleInput();
          }} className='text-xl cursor-pointer'>&#128393;</div>
        </div>
      </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
