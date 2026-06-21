import { useState } from 'react'
import FetchApidata from './Component/FetchApidata'

function App() {
  
  const [count, setCount] = useState(0)

  return (
    <>
      <div> 
          <FetchApidata/>
      </div>
    </>
  )
}

export default App
