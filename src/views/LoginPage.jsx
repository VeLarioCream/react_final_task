import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const { VITE_APP_HOST } = import.meta.env;

function LoginPage({ isLogin, setIsLogin }) {

    useEffect(() => {
        setIsLogin(false)
    }, [])
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
                        title: '正在驗證帳號密碼',
                        text: '頁面轉導中...',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1450
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

export default LoginPage