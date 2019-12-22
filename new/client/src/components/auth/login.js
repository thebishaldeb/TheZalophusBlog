import React,{ useState } from 'react';
import './Auth.css';
import { Alert, message,Button } from 'antd';


const Login=(props)=>{

    const [ email, setEmail ]=useState('');
    const [password, setPassword]=useState('');

    const setInfo=(setter,e)=>{
        setter(e.target.value);
    }

    const success = () => {
      const hide = message.loading('Loading...', 0);
      // Dismiss manually and asynchronously
      setTimeout(hide,100);
    };

    const submit=(e)=>{
        e.preventDefault();          
        success();
        let requestBody = {
            query: `
              query {
                login(email: "${email}", password: "${password}") {
                  userId
                  token
                  tokenExpiration
                }
              }
            `
        };
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
      .then(res => {
        console.log(res);
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then(resData => {
           console.log(resData);
        if(resData.data.login){
            // alert('Loggedin');
          props.changeState(true);
          const { token, userId }=resData.data.login;
          localStorage.setItem("token", token);
          localStorage.setItem("uid", userId);
          props.history.push("/");
        }else{
          message.error('user not found');
        }
      })
      .catch(err => {
        message.error('' + err);
        console.log(err);
      });
    }

    return(
        <React.Fragment>
            <form onSubmit={ submit } className="auth-form">
                <div className="form-control mt-1">
                    <label htmlFor="email">E-Mail</label>
                    <input type="email" id="email" required onChange={(e)=>{ setInfo(setEmail,e) }} />
                </div>
                <div className="form-control mt-1">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" required onChange={(e)=>{ setInfo(setPassword,e) }} />
                </div>
                <div className="form-actions">
                <button className="btn btn-sm btn-warning">Login</button>
                </div>
            </form>
        </React.Fragment>
    )
}


export default Login;