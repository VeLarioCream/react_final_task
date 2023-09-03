import { useEffect, useState } from 'react'
import todo_BN from './assets/rhefZ3.png'
import main_BN from './assets/tj3Bdk.png'
import './App.css'
import { HashRouter, NavLink, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'

// 取用環境變數的API URL
const { VITE_APP_HOST } = import.meta.env;

// 表單資料驗證
function formValidation(name, value, formData, errors, setErrors) {
  if (name === 'email') {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!value) {
      setErrors({ ...errors, [name]: '此欄位不可留空' })
    } else if (!emailRegex.test(value)) {
      setErrors({ ...errors, [name]: '請確認Email格式' })
    } else {
      setErrors({ ...errors, [name]: '' })
    }
  } else if (name === 'nickname') {
    if (!value) {
      setErrors({ ...errors, [name]: '此欄位不可留空' })
    } else {
      setErrors({ ...errors, [name]: '' })
    }
  } else if (name === 'password') {
    if (!value) {
      setErrors({ ...errors, [name]: '此欄位不可留空' })
    } else if (value.length < 6) {
      setErrors({ ...errors, [name]: '密碼至少需要6個字元' })
    } else if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
      setErrors({ ...errors, [name]: '密碼必須包含英文字母和數字' });
    } else {
      setErrors({ ...errors, [name]: '' })
    }
  } else if (name === 'password2') {
    if (!value) {
      setErrors({ ...errors, [name]: '此欄位不可留空' })
    } else if (value.length < 6) {
      setErrors({ ...errors, [name]: '密碼至少需要6個字元' })
    } else if (value !== formData.password) {
      setErrors({ ...errors, [name]: '請確認密碼輸入一致' })
    } else {
      setErrors({ ...errors, [name]: '' })
    }
  }
}

function Layout({ isLogin }) {
  let navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate('/login')
    }
  }, [isLogin])

  return (
    <>
      <div id="loginPage" className="bg-yellow">
        <div className="conatiner loginPage vhContainer ">
          <div className="side">
            {/* <a href="#/login"><img className="logoImg" src={todo_BN} alt="" /></a> */}
            <NavLink to="/login">
              <img className="logoImg" src={todo_BN} alt="" />
            </NavLink>
            <img className="d-m-n" src={main_BN} alt="workImg" />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

function LoginPage({ isLogin, setIsLogin }) {
  setIsLogin(false)
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // 呼叫表單資料驗證
    formValidation(name, value, formData, errors, setErrors)
  }

  function login() {

    const valueFilled = Object.values(formData).some(data => data === '') // 確認欄位是否都有填寫值
    const hasErrors = Object.values(errors).some(error => error != '') // 確認欄位資料皆正確

    if (valueFilled || hasErrors) {
      Swal.fire({
        title: '似乎發生了什麼事!',
        text: '請確認資料填寫正確性',
        icon: 'error',
        confirmButtonText: '確認',
        confirmButtonColor: '#333333'
      })
    }
    else {
      async function loginPost() {
        try {
          setIsLoading(true)
          const res = await axios.post(`${VITE_APP_HOST}/users/sign_in`, formData)
          Swal.fire({
            title: '登入成功',
            text: '頁面轉導中...',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })

          const { token } = res.data
          document.cookie = `token=${token}`
          setTimeout(() => {
            navigate('/todolist')
            setIsLogin(true)
          }, 1500)
          setIsLoading(false)
        }
        catch (e) {
          setIsLoading(false)
          setIsLogin(false)
          Swal.fire({
            title: '似乎發生了什麼事!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: '確認',
            confirmButtonColor: '#333333'
          })
        }
      }
      loginPost();
    }
  }

  return (
    <>
      <form className="formControls" action="index.html">
        <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
        <label className="formControls_label" htmlFor="email">Email</label>
        <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required onChange={handleChange} />
        <span>{errors.email}</span>
        <label className="formControls_label" htmlFor="pwd">密碼</label>
        <input className="formControls_input" type="password" name="password" id="pwd" placeholder="請輸入密碼" required onChange={handleChange} />
        <span>{errors.password}</span>
        <input className="formControls_btnSubmit" type="button" onClick={login} value="登入" disabled={isLoading} />
        {/* <a className="formControls_btnLink" href="#signUpPage">註冊帳號</a> */}
        <NavLink to="/signUp">
          <div className="formControls_btnLink">註冊帳號</div>
        </NavLink>
      </form>
    </>
  )
}

function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    password2: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    nickname: '',
    password: '',
    password2: ''
  })

  // 更新表單數據
  function handleChange(e) {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })

    // 呼叫表單資料驗證
    formValidation(name, value, formData, errors, setErrors)
  }

  function signUp() {
    const valueFilled = Object.values(formData).some(data => data === '') // 確認欄位是否都有填寫值
    const hasErrors = Object.values(errors).some(error => error != '') // 確認欄位資料皆正確

    if (valueFilled || hasErrors) {
      Swal.fire({
        title: '似乎發生了什麼事!',
        text: '請確認資料填寫正確性',
        icon: 'error',
        confirmButtonText: '確認',
        confirmButtonColor: '#333333'
      })
    }
    else {
      const { password2, ...postFormData } = formData // 從formData中移除password2後淺拷貝到postFormData中
      // console.log(VITE_APP_HOST);
      // console.dir(postFormData)
      async function signUpPost() {
        try {
          setIsLoading(true)
          const res = await axios.post(`${VITE_APP_HOST}/users/sign_up`, postFormData)
          Swal.fire({
            title: '註冊成功',
            text: '請重新登入',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            navigate('/login')
          }, 1500)
          setIsLoading(false)
        }
        catch (e) {
          setIsLoading(false)
          Swal.fire({
            title: '似乎發生了什麼事!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: '確認',
            confirmButtonColor: '#333333'
          })
        }
      }
      signUpPost();
    }
  }

  return (
    <>
      <form className="formControls" action="index.html">
        <h2 className="formControls_txt">註冊帳號</h2>
        <label className="formControls_label" htmlFor="email">Email</label>
        <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required onChange={handleChange} />
        <span>{errors.email}</span>
        <label className="formControls_label" htmlFor="name">您的暱稱</label>
        <input className="formControls_input" type="text" name="nickname" id="name" placeholder="請輸入您的暱稱" onChange={handleChange} />
        <span>{errors.nickname}</span>
        <label className="formControls_label" htmlFor="pwd">密碼</label>
        <input className="formControls_input" type="password" name="password" id="pwd" placeholder="請輸入密碼" required onChange={handleChange} />
        <span>{errors.password}</span>
        <label className="formControls_label" htmlFor="pwd">再次輸入密碼</label>
        <input className="formControls_input" type="password" name="password2" id="pwd2" placeholder="請再次輸入密碼" required onChange={handleChange} />
        <span>{errors.password2}</span>
        <input className="formControls_btnSubmit" type="button" onClick={signUp} value="註冊帳號" disabled={isLoading} />
        {/* <a className="formControls_btnLink" href="#loginPage">登入</a> */}
        <NavLink to="/login">
          <div className="formControls_btnLink">登入</div>
        </NavLink>
      </form>
      {/* {JSON.stringify(formData)}
      {JSON.stringify(errors)} */}
    </>
  )
}

function TodoListPage({ isLogin, setIsLogin }) {
  let navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      Swal.fire({
        title: '尚未登入',
        text: '請重新登入',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    }
  }, [isLogin])

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    // console.log(cookieValue)
  }, [isLogin])

  function logOut() {    
    Swal.fire({
      title: '離開，並登出!',
      text: '正在將您的帳號登出',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(() => {
      navigate('/login')
      setIsLogin(false)
    }, 1500)
  }

  return (
    <>
      <div id="todoListPage" className="bg-half">
        <nav>
          {/* <a href="/"><img className="logoImg" src={todo_BN} alt="" /></a> */}
          <NavLink to="/login">
            <img className="logoImg" src={todo_BN} alt="" onClick={logOut} />
          </NavLink>
          <ul>
            <li className="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
            {/* <li><a href="#loginPage">登出</a></li> */}
            <li><NavLink to="/login" onClick={logOut}>登出</NavLink></li>
          </ul>
        </nav>
        <div className="conatiner todoListPage vhContainer">
          <div className="todoList_Content">
            <div className="inputBox">
              <input type="text" placeholder="請輸入待辦事項" />
              <a href="#">
                <i className="fa fa-plus"></i>
              </a>
            </div>
            <div className="todoList_list">
              <ul className="todoList_tab">
                <li><a href="#" className="active">全部</a></li>
                <li><a href="#">待完成</a></li>
                <li><a href="#">已完成</a></li>
              </ul>
              <div className="todoList_items">
                <ul className="todoList_item">
                  <li>
                    <label className="todoList_label">
                      <input className="todoList_input" type="checkbox" value="true" />
                      <span>把冰箱發霉的檸檬拿去丟</span>
                    </label>
                    <a href="#">
                      <i className="fa fa-times"></i>
                    </a>
                  </li>
                  <li>
                    <label className="todoList_label">
                      <input className="todoList_input" type="checkbox" value="true" />
                      <span>打電話叫媽媽匯款給我</span>
                    </label>
                    <a href="#">
                      <i className="fa fa-times"></i>
                    </a>
                  </li>
                  <li>
                    <label className="todoList_label">
                      <input className="todoList_input" type="checkbox" value="true" />
                      <span>整理電腦資料夾</span>
                    </label>
                    <a href="#">
                      <i className="fa fa-times"></i>
                    </a>
                  </li>
                  <li>
                    <label className="todoList_label">
                      <input className="todoList_input" type="checkbox" value="true" />
                      <span>繳電費水費瓦斯費</span>
                    </label>
                    <a href="#">
                      <i className="fa fa-times"></i>
                    </a>
                  </li>
                  <li>
                    <label className="todoList_label">
                      <input className="todoList_input" type="checkbox" value="true" />
                      <span>約vicky禮拜三泡溫泉</span>
                    </label>
                    <a href="#">
                      <i className="fa fa-times"></i>
                    </a>
                  </li>
                  <li>
                    <label className="todoList_label">
                      <input className="todoList_input" type="checkbox" value="true" />
                      <span>約ada禮拜四吃晚餐</span>
                    </label>
                    <a href="#">
                      <i className="fa fa-times"></i>
                    </a>
                  </li>
                </ul>
                <div className="todoList_statistics">
                  <p> 5 個已完成項目</p>
                  <a href="#">清除已完成項目</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


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