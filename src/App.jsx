import { useCallback, useState, useEffect, useRef } from 'react'

function App() {
  let [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [specialCharsAllowed, setSpecialCharsAllowed] = useState(false)
  const [Password, setPassword] = useState('')

  // useRef is used to store the function so that it doesn't change on every render
  const PasswordGeneratorRef = useRef(null);

  const PasswordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numbersAllowed) str += "0123456789"
    if (specialCharsAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?/~`"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str[char]
    }
    setPassword(pass)
  }, [length, numbersAllowed, specialCharsAllowed, setPassword])

  const CopyPasswordToClipboard = useCallback(() => {
    PasswordGeneratorRef.current?.select();
    PasswordGeneratorRef.current?.setSelectionRange(0, 101); // For mobile devices
    window.navigator.clipboard.writeText(Password);
    alert("Password copied to clipboard!");
  }, [Password])

  useEffect(() => {
    PasswordGenerator()
  }, [length, numbersAllowed, specialCharsAllowed, PasswordGenerator])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={Password}
            className='=outline-none w-full px-3 py-1 bg-white'
            placeholder='Generated Password'
            readOnly
            ref={PasswordGeneratorRef}
          />
          <button
            className='outline-none px-3 py-0.5 bg-blue-700 text-white shrink-0 hover:bg-blue-800'
            onClick={CopyPasswordToClipboard}
          >
            Copy
          </button>

        </div>
        <div className="flex text-sm gap-x-2">
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer w-full'
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type='checkbox'
              defaultChecked={numbersAllowed}
              id='numberInput'
              onChange={() => {
                setNumbersAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type='checkbox'
              defaultChecked={specialCharsAllowed}
              id='specialCharsInput'
              onChange={() => {
                setSpecialCharsAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="specialCharsInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
