import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage'
import HomePage from './pages/homePage'
import TestPage from './pages/test'



function App() {
  

  return (
    
    <div className='w-full h-screen flex justify-center items-center bg-primary text-secondary'>

     <Routes>

      <Route path='/' element={<HomePage />} />

      <Route path='/admin/*' element={<AdminPage />}  />

      <Route path='/test' element={<TestPage />} />

     </Routes>
    
    </div>
    
  )
}

export default App
