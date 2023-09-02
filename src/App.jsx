import { useState } from 'react'
import todo_BN from './assets/rhefZ3.png'
import main_BN from './assets/tj3Bdk.png'
import './App.css'
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'



function LoginPage() {
  return (
    <>
      <div id="loginPage" className="bg-yellow">
        <div className="conatiner loginPage vhContainer ">
          <div className="side">
            <a href="#"><img className="logoImg" src={todo_BN} alt="" /></a>
            <img className="d-m-n" src={main_BN} alt="workImg" />
          </div>
          <div>
            <form className="formControls" action="index.html">
              <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
              <label className="formControls_label" htmlFor="email">Email</label>
              <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required />
              <span>此欄位不可留空</span>
              <label className="formControls_label" htmlFor="pwd">密碼</label>
              <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required />
              <input className="formControls_btnSubmit" type="button" onClick={() => { }} value="登入" />
              {/* <a className="formControls_btnLink" href="#signUpPage">註冊帳號</a> */}              
              <NavLink to="/signUp">
                <div className="formControls_btnLink">註冊帳號</div>
              </NavLink>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

function SignUpPage() {
  return (
    <>
      <div id="signUpPage" className="bg-yellow">
        <div className="conatiner signUpPage vhContainer">
          <div className="side">
            <a href="#"><img className="logoImg" src={todo_BN} alt="" /></a>
            <img className="d-m-n" src={main_BN} alt="workImg" />
          </div>
          <div>
            <form className="formControls" action="index.html">
              <h2 className="formControls_txt">註冊帳號</h2>
              <label className="formControls_label" htmlFor="email">Email</label>
              <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required />
              <label className="formControls_label" htmlFor="name">您的暱稱</label>
              <input className="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱" />
              <label className="formControls_label" htmlFor="pwd">密碼</label>
              <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required />
              <label className="formControls_label" htmlFor="pwd">再次輸入密碼</label>
              <input className="formControls_input" type="password" name="pwd" id="pwd2" placeholder="請再次輸入密碼" required />
              <input className="formControls_btnSubmit" type="button" onClick={() => { }} value="註冊帳號" />
              {/* <a className="formControls_btnLink" href="#loginPage">登入</a> */}
              <NavLink to="/login">
                <div className="formControls_btnLink">登入</div>
              </NavLink>
            </form>
          </div>
        </div>

      </div>
    </>
  )
}

function TodoListPage() {
  return (
    <>
      <div id="todoListPage" className="bg-half">
        <nav>
          <h1><a href="#">ONLINE TODO LIST</a></h1>
          <ul>
            <li className="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
            <li><a href="#loginPage">登出</a></li>
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


  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signUp' element={<SignUpPage />} />
          <Route path='/todoList' element={<TodoListPage />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
