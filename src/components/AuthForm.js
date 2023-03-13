import React, {useRef, useState} from 'react';
import {useLoginMutation, useRegisterMutation} from "../store/api/authApi";
import {useDispatch} from "react-redux";
import {login} from "../store/reducer/authSlice";
import {useLocation, useNavigate} from "react-router-dom"
const AuthForm = () => {

    const [isLoginForm,setIsLoginForm]=useState(true);
    const [regFn,{error:regError}]=useRegisterMutation();
    const [loginFn,{error:loginError}]=useLoginMutation();

    const usernameInp=useRef();
    const pwdInp=useRef();
    const emailInp=useRef();
    const dispatch=useDispatch();
    const navigate= useNavigate();
    const location=useLocation();
    const from=location.state?.preLocation?.pathname||"/";
    const submitHandler=(e)=>{
        e.preventDefault();
        const username=usernameInp.current.value;
        const password=pwdInp.current.value;
        if(isLoginForm){
            loginFn({
                identifier:username,
                password
            }).then(res=> {

                if(!res.error){
                    dispatch(login(
                        {token:res.data.jwt,
                        user:res.data.user}
                    ));
                    navigate(from,{replace:true})
                }
            })
           // console.log('登录-->',username,password);
        }else {
            const email=emailInp.current.value;
            regFn({
                username,
                password,
                email
            }).then(res=> {
                if(!res.error){
                    setIsLoginForm(true);
                }
            });
        }

    }


    return (
        <div>
            <p style={{color:'red'}}>
                {regError&&regError.data.error.message}

            </p>
            <p style={{color:'red'}}>
                {loginError&&loginError.data.error.message}

            </p>
            <h2>{isLoginForm?"登录":"注册"}</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input ref={usernameInp} type="text" placeholder={"用户名"}/>
                </div>
                {
                    !isLoginForm&&
                        <div>
                            <input ref={emailInp} type="email" placeholder={"电子邮件"}/>
                        </div>
                }
                <div>
                    <input ref={pwdInp} type="password" placeholder={"密码"}/>
                </div>
                <div>
                    <button>{isLoginForm?"登录":"注册"}</button>
                    <a href="#" onClick={
                        event => {
                            event.preventDefault();
                            setIsLoginForm(prevState => !prevState);
                        }
                    }>
                        {
                            isLoginForm?"没有账号？点击注册":"已有账号？点击登录"
                        }
                    </a>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
