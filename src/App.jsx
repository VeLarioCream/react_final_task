import { useEffect, useState } from 'react'
import './App.css'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Layout from './views/Layout'
import LoginPage from './views/LoginPage'
import SignUpPage from './views/SignUpPage'
import TodoListPage from './views/TodoListPage'


// 取用環境變數的API URL
const { VITE_APP_HOST } = import.meta.env;







function App() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout isLogin={isLogin} setIsLogin={setIsLogin} />} >
          <Route path='login' element={<LoginPage isLogin={isLogin} setIsLogin={setIsLogin} />} />
          <Route path='signup' element={<SignUpPage />} />
        </Route>
        <Route path='/todoList' element={<TodoListPage isLogin={isLogin} setIsLogin={setIsLogin} />} />
      </Routes>
    </>
  )
}

export default App
