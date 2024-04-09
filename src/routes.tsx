import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Pass from './pages/pass'



export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to={"/auth/login"} />} />
            <Route path='/auth/login' element={<Login/>}/>
            <Route path='/auth/login/password' element={<Pass/>}/>
            
        </Routes>
    </BrowserRouter>
  )
}