import axios from "axios";
import todo_BN from '/src/assets/rhefZ3.png'
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const { VITE_APP_HOST } = import.meta.env;

function TodoListPage({ isLogin, setIsLogin }) {
    let navigate = useNavigate(); 
    const [todo, setTodo] = useState([])
  
    // 取得cookie中的token
    function getCookieToken() {
      return document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    }
  
    // 驗證token有效性
    async function checkOut(token) {
      try {
        const res = await axios.get(`${VITE_APP_HOST}/users/checkout`, {
          "headers": {
            authorization: token
          }
        })
        // 以isLogin紀錄登入狀態，避免使用者透過直接修改網址路徑的方式繞過帳密驗證
        if (isLogin) {
          Swal.fire({
            title: '歡迎!',
            text: '已登入',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
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
      }
      catch {
        Swal.fire({
          title: '登入狀態已逾期',
          text: '請重新登入',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      }
    }
  
    useEffect(() => { 
      getTodoList()
    }, [isLogin])
  
    // 登出
    function logOut() {
      const cookieValue = getCookieToken()
  
      async function signOut() {
        try {
          const res = await axios.post(`${VITE_APP_HOST}/users/sign_out`, {}, {
            "headers": {
              authorization: cookieValue
            }
          })
          Swal.fire({
            title: '離開!',
            text: '已登出',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
        }
        catch (e) {
          Swal.fire({
            title: '似乎發生了什麼事!',
            text: e.response.data.message,
            icon: 'error',
            confirmButtonText: '確認',
            confirmButtonColor: '#333333'
          })
        }
        setTimeout(() => {
          navigate('/login')
          setIsLogin(false)
        }, 1500)
  
      }
      signOut()
    }
  
    // 取得代辦清單
    async function getTodoList() {
      const cookieValue = getCookieToken()
      checkOut(cookieValue)
      try {
        const res = await axios.get(`${VITE_APP_HOST}/todos/`, {
          "headers": {
            authorization: cookieValue
          }
        })
        // console.dir(res)
        setTodo(res.data.data)
      } catch (error) {
        Swal.fire({
          title: '似乎發生了什麼事!',
          text: error.response.data.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
      }
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
                    {todo.map((item) => {
                      return (
                        <li key={item.id}>
                          <label className="todoList_label">
                            <input className="todoList_input" type="checkbox" value="true" />
                            <span>{item.content}</span>
                          </label>
                          <a href="#">
                            <i className="fa fa-times"></i>
                          </a>
                        </li>
                      )
                    })}
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

  export default TodoListPage