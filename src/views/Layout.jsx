import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import todo_BN from '/src/assets/rhefZ3.png'
import main_BN from '/src/assets/tj3Bdk.png'


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

  export default Layout