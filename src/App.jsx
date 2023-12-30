import { useCallback, useEffect, useRef, useState } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const[numAllowed, setNumALLowed] = useState(false);
  const[charAllowed, setCharALLowed] = useState(false);
  const[password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const PasswordGenerator = useCallback(() => {
    let pswd = '';
    let pswdString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if(numAllowed) pswdString += "0123456789" ;
    if(charAllowed) pswdString += "!@#$%^&*()-_+=[]{}~`" ;

    for(let i =1; i<= length; i++){
      var randomNumber=Math.floor(Math.random() * pswdString.length + 1);
      // pswd += pswdString[randomNumber];
      pswd += pswdString.charAt(randomNumber)
    }

    setPassword(pswd);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, numAllowed, charAllowed])

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  }
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
      <h1 className='text-center text-white my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly />
          <button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' ref={passwordRef}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 py-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range' min={6} max={50} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}} />
            <label >Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={numAllowed} id='numberInput' onChange={() => {setNumALLowed((prev) => !prev);
            }} />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox' defaultChecked={charAllowed} id='charInput' onChange={() => {setCharALLowed((prev) => !prev);
            }} />
            <label htmlFor='charInput'>Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
