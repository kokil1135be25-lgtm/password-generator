import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAll, setNumAll] = useState(false)
  const [charAll, setCharAll] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  const passworRef = useRef(null)

  const passGenerator = useCallback(() => {
    
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAll) str += "0123456789"
    if(charAll) str += "!@#$%^&*()~{}[]"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAll, charAll])

  const copyPasswordToClip = useCallback(() => {
        passworRef.current.select()
        window.navigator.clipboard.writeText(password)

  setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }, [password])

  useEffect(() => {
    passGenerator()
  }, [length, numAll, charAll, passGenerator])

  return (
    <div>

      <div className="flex justify-center mt-20">

        <div className='w-200 bg-gray-700 p-4 rounded-lg'>

          <h1 className='text-white text-center text-3xl mb-6'>
            Password Generator
          </h1>

          <div className='flex overflow-hidden mb-4'>

            <input
              type="text"
              value={password}
              className='outline-none w-full py-4 px-3 bg-white rounded-l-lg placeholder-gray-400'
              placeholder='Password'
              readOnly
              ref={passworRef}
            />

            <button 
              onClick={copyPasswordToClip}
              className='bg-yellow-700 text-white px-4 rounded-r-lg'>
              {copied ? "Copied!" : "Copy"}
            </button>

          </div>

          <div className='flex items-center gap-x-4'>

            <div className='flex text-sm gap-x-2'>

              <input 
                type="range" 
                min={6}
                max={100}
                value={length}
                className='cursor-pointer'
                onChange={(e) => {
                  setLength(Number(e.target.value))
                }}
              />

              <label className='text-white text-lg'>
                Length: {length}
              </label>

            </div>

            <div className='flex items-center gap-x-1'>

              <input 
                type="checkbox"
                checked={numAll}
                id='numberInput'
                onChange={() => {
                  setNumAll((prev) => !prev)
                }}
              />

              <label htmlFor="numberInput" className='text-white text-lg'>
                Numbers
              </label>

            </div>

            <div className='flex items-center gap-x-1'>

              <input 
                type="checkbox"
                checked={charAll}
                id='charInput'
                onChange={() => {
                  setCharAll((prev) => !prev)
                }}
              />

              <label htmlFor="charInput" className='text-white text-lg'>
                Characters
              </label>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default App