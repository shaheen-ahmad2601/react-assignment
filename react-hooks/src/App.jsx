import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Register } from './components/register/register'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/login/login'
import { Dashboard } from './components/dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      </Routes>
       
      
    </div>
  )
}

export default App
