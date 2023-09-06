import axios from "axios";
import todo_BN from '/src/assets/rhefZ3.png'
import empty_BN from '/src/assets/empty1.png'
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const { VITE_APP_HOST } = import.meta.env;

function TodoListPage({ isLogin, setIsLogin }) {
  let navigate = useNavigate();
  const [todo, setTodo] = useState([])
  const [subTodo, setSubTodo] = useState([])
  const [nickname, setNickName] = useState('')
  const [newCentent, setNewCentent] = useState('')
  const [tabStatus, setTabStatus] = useState('all')
  const [count, setCount] = useState(0)


  useEffect(() => {
    getTodoList()
  }, [isLogin])

  useEffect(() => {
    setTabStatus('all')
  }, [])

  // 依據filter濾出對應的Todo事項子集合
  useEffect(() => {    
    if (tabStatus === 'hasTodo') {
      setSubTodo(todo.filter(item => item.status === false))
    } else if (tabStatus === 'finished') {
      setSubTodo(todo.filter(item => item.status === true))
    } else {
      setSubTodo(todo)
    }
    // 更新待完成項目個數
    setCount(todo.filter(item => item.status === false).length)
  }, [todo, tabStatus])

  // 取得cookie中的token
  function getCookieToken() {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
  }

  // 驗證token有效性
  async function checkOut() {
    const cookieValue = getCookieToken()
    try {
      const res = await axios.get(`${VITE_APP_HOST}/users/checkout`, {
        "headers": {
          authorization: cookieValue
        }
      })

      setNickName(res.data.nickname)

      // 以isLogin紀錄登入狀態，避免使用者透過直接修改網址路徑的方式繞過帳密驗證
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
    checkOut()
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

  function handleAddTodo() {
    async function addTodo() {
      const cookieValue = getCookieToken()
      checkOut()
      try {
        const res = await axios.post(
          `${VITE_APP_HOST}/todos/`,
          {
            "content": newCentent
          },
          {
            "headers": {
              authorization: cookieValue
            }
          }
        )
        setNewCentent('')
        getTodoList()
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
    addTodo()
  }

  function handleDelete(id) {
    async function deleteTodo(id) {
      const cookieValue = getCookieToken()
      checkOut()
      try {
        const res = await axios.delete(
          `${VITE_APP_HOST}/todos/${id}`, {
          "headers": {
            authorization: cookieValue
          }
        }
        )
        getTodoList()
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
    deleteTodo(id)
  }

  function handleToggle(id) {
    async function toggleTodo(id) {
      const cookieValue = getCookieToken()
      checkOut()
      try {
        const res = await axios.patch(
          `${VITE_APP_HOST}/todos/${id}/toggle`, {}, {
          "headers": {
            authorization: cookieValue
          }
        }
        )
        getTodoList()
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
    toggleTodo(id)
  }

  function handleClearFinished() {
    if (todo.length === count) {
      Swal.fire({
        title: '無須清除!',
        text: '沒有發現已完成事項',
        showConfirmButton: false,
        timer: 1000
      })
    }
    else {
      try {
        todo.map((item) => item.status === true ? handleDelete(item.id) : null)
        Swal.fire({
          title: '清除完成!',
          text: '成功清除已完成事項',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
      }
      catch {
        Swal.fire({
          title: '似乎發生了什麼事!',
          text: 刪除失敗,
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }

  }

  function Notodo() {
    return (
      <div className="emptyList">
        <h4 className="emptytext">目前尚無待辦事項</h4>
        <img
          className="emptypic"
          src={empty_BN}
          alt="無待辦事項"
        />
      </div>
    )
  }

  return (
    <>
      <div id="todoListPage" className="bg-half">
        <nav>
          <NavLink to="/login">
            <img className="logoImg" src={todo_BN} alt="" onClick={logOut} />
          </NavLink>
          <ul>
            <li className="todo_sm">
              <NavLink to="/todolist" onClick={() => { setTabStatus('all') }}>
                <span>{nickname} 的待辦</span>
              </NavLink>
            </li>
            <li><NavLink to="/login" onClick={logOut}>登出</NavLink></li>
          </ul>
        </nav>
        <div className="conatiner todoListPage vhContainer">
          <div className="todoList_Content">
            <div className="inputBox">
              <input type="text"
                placeholder="請輸入待辦事項"
                value={newCentent}
                onChange={(e) => {
                  setNewCentent(e.target.value.trim())
                }}
                onKeyDown={(e) => {
                  e.key === 'Enter' ? handleAddTodo() : null
                }}
              />
              <a href="#" onClick={(e) => {
                e.preventDefault()
                handleAddTodo()
              }}>
                <i className="fa fa-plus"></i>
              </a>
            </div>

            {todo.length === 0
              ? (
                <Notodo />                
              )
              : (
                <div className="todoList_list">
                  <ul className="todoList_tab">
                    <li>
                      <a href="#" className={tabStatus === 'all' ? "active" : null} onClick={(e) => {
                        e.preventDefault()
                        setTabStatus('all')
                      }}>
                        全部
                      </a>
                    </li>
                    <li>
                      <a href="#" className={tabStatus === 'hasTodo' ? "active" : null} onClick={(e) => {
                        e.preventDefault()
                        setTabStatus('hasTodo')
                      }}>
                        待完成
                      </a>
                    </li>
                    <li>
                      <a href="#" className={tabStatus === 'finished' ? "active" : null} onClick={(e) => {
                        e.preventDefault()
                        setTabStatus('finished')
                      }}>
                        已完成
                      </a>
                    </li>
                  </ul>
                  <div className="todoList_items">
                    <ul className="todoList_item">
                      {subTodo.map((item) => {
                        return (
                          <li key={item.id}>
                            <label className="todoList_label">
                              <input className="todoList_input" type="checkbox" checked={item.status} onChange={(e) => {
                                handleToggle(item.id)
                              }} />
                              <span>{item.content}</span>
                            </label>
                            <a
                              href="#" onClick={(e) => {
                                e.preventDefault()
                                handleDelete(item.id)
                              }}
                            >
                              <i className="fa fa-times"></i>
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="todoList_statistics">
                      <p> {count} 個待完成項目</p>
                      <a href="#" onClick={(e) => {
                        e.preventDefault()
                        handleClearFinished()
                      }}>清除已完成項目</a>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default TodoListPage