import React, {useRef} from 'react';

const AuthForm = () => {

    const usernameInp=useRef();
    const pwdInp=useRef();

    const submitHandler=(e)=>{
        e.preventDefault();
    }
    return (
        <div>
            <h2>登录/注册</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input ref={usernameInp} type="text" placeholder={"用户名"}/>
                </div>
                <div>
                    <input ref={pwdInp} type="password" placeholder={"密码"}/>
                </div>
                <div>
                    <button>登录</button>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
