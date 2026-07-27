import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminPage from './pages/adminPage'
import HomePage from './pages/homePage'
import ProductsPage from './pages/productsPage'


function App() {
  

  return (
    
    <div className='w-full h-screen border-[6px] flex justify-center items-center'>

     <Routes>

      <Route path='/' element={<HomePage />} />

      <Route path='/admin' element={<AdminPage />} />

      <Route path='/products' element={<ProductsPage />} />

     </Routes>
    
    </div>
    
  )
}

export default App
