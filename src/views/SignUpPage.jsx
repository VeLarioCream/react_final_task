import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
const { VITE_APP_HOST } = import.meta.env; 

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

export default SignUpPage