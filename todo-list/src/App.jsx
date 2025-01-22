import { useState } from 'react';
import './App.css';



export default function App() {
  const [activeButton, setActiveButton] = useState('0');

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div className='flex justify-between mt-12 mr-32'>
      <div className="flex flex-col gap-10 h-screen justify-center ml-32 w-96">
        <div className='text-5xl'>Let's make today a productive day.</div>
        <button className='bg-purple-900 rounded-full text-white w-32 h-10'>Create Task</button>
      </div>
      <div className='flex flex-col w-6/12 gap-16'>
        <div className='ml-auto text-xl'>Jan 21th 2025 12:16 PM</div>
        <div className='grid grid-cols-2 divide-x divide-black outline outline-black rounded-full text-center'>
          <button style={{backgroundColor: activeButton === '0' ? '#f3e8ff' : 'white'}} 
          onClick={() => handleButtonClick('0')}>
            In Progress
          </button>
          <button style={{backgroundColor: activeButton === '1' ? '#f3e8ff' : 'white'}} 
          onClick={() => handleButtonClick('1')}>
            Completed
          </button>
        </div>
        <div className='h-96 rounded-3xl outline-none bg-purple-100'>
          <div className='flex justify-between p-8'>
            <input placeholder='Enter Task' disabled={true} onKeyDown={e => {
              if(e.key === 'Enter') {
                
            }
            }}></input>
            <div className='flex gap-12'>
            <div className='text-xl'>&#10003;</div>
            <div className='text-xl'>&times;</div>
            <div className='text-xl'>	&#128393;</div>
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}
