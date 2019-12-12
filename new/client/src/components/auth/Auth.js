import React, { Component } from 'react';
import './Auth.css';

class AuthPage extends Component {
  state = {
    isLogin: true,
    profilepic:'',
    fname:'',
    lname:'',
    username:'',
    dpas:''
  };

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  updateInfo=(e)=>{
    this.setState({ [e.target.name]:e.target.value })
  }

  submitHandler = event => {
    event.preventDefault();
    const { fname, lname,username,profilepic, dpas }=this.state;
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    if(dpas!==password){
      return;
    }

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

    if (!this.state.isLogin) {

      requestBody = {
        query: `
          mutation {
            createUser(userInput: { fname:"${fname}", lname:"${lname}", username:"${username}", email: "${email}", password: "${password}",profilepic:"${profilepic}"}) {
              fname
            }
          }
        `
      };
    }
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
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData);
        if(resData.data.login){
          const { token, userId }=resData.data.login;
          localStorage.setItem("token", token);
          localStorage.setItem("uid", userId);
          this.props.history.push("/home");
        }
        else if(resData.data.createUser){
          alert("Registered");
        }else{
          alert("Error");
        }
      })
      .catch(err => {
        alert("Error");
        console.log(err);
      });
  };

  uploadFile=async (e)=>{
    const convertTobase64=(file)=>{
      return new Promise((resolve, reject)=>{
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=function()
        {
          resolve(reader.result);
        }
        reader.onerror=function()
        {
          reject("Error");
        }
      })
    }

    convertTobase64(e.target.files[0])
    .then((res)=>{
      console.log(res);
      this.setState({ profilepic:res })
    })
  }

  // upload=()=>{
  //   let requestBody = {
  //     query: `
  //       mutation {
  //         uploadFile( file:"${this.state.file}" )
  //       }
  //     `
  //   };
  //   fetch("http://localhost:8000/graphql",{
  //     method: 'POST',
  //     body: JSON.stringify(requestBody),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then((res)=>{ return res.json() })
  //   .then((res)=>{
  //     console.log(res);
  //     this.setState({ url:res.data.uploadFile })
  //   }).catch((err)=>{ console.log(err); })
  // }
  render() {
    return (
      <>
        <form className="auth-form" onSubmit={this.submitHandler}>
          <div className="form-control" style={{ display:this.state.isLogin ? 'none' : 'inline' }}>
            <label htmlFor="fname">First Name</label>
            <input type="text" id="fname" name="fname" onChange={this.updateInfo} />
          </div>
          <div className="form-control mt-1" style={{ display:this.state.isLogin ? 'none' : 'inline' }}>
            <label htmlFor="lname">Last Name</label>
            <input type="text" id="lname" name="lname" onChange={this.updateInfo} />
          </div>
          <div className="form-control mt-1" style={{ display:this.state.isLogin ? 'none' : 'inline' }}>
            <label htmlFor="uname">User Name</label>
            <input type="text" id="uname" name="username" onChange={this.updateInfo} />
          </div>
          <div className="form-control mt-1">
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" ref={this.emailEl} />
          </div>
          <div className="form-control mt-1">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={this.passwordEl} />
          </div>
          <div className="form-control mt-1" style={{ display:this.state.isLogin ? 'none' : 'inline' }}>
            <label htmlFor="dpassword">Confirm Password</label>
            <input type="password" id="dpassword" name="dpas" onChange={this.updateInfo} />
          </div>
          <div className="custom-file" style={{ display:this.state.isLogin ? 'none' : 'inline' }}>
            <input type="file" className="custom-file-input" id="customFile" onChange={ this.uploadFile } />
            <label className="custom-file-label" htmlFor="customFile">Choose file</label>
          </div>
          <div className="form-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={this.switchModeHandler}>
              Switch to {this.state.isLogin ? 'Signup' : 'Login'}
            </button>
          </div>
        </form>
        {/* <input type="file" onChange={ this.uploadFile } />
        <button onClick={ this.upload }>upload</button>
        { this.state.url ? <img src={ this.state.url } /> : null } */}
      </>
    );
  }
}

export default AuthPage;