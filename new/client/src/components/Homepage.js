import React,{ useEffect } from 'react';
import {Redirect} from 'react-router-dom'
import AuthContext from '../context/auth-context'

const Homepage=(props)=>
{
  const getData=()=>{
    const token=localStorage.getItem("token");
    const requestBody={
      query:`
      query {
        blogs {
          title
          image
          body
          creator
          created
        }
      }
      `
    }

    fetch("http://localhost:8000/graphql",{
      method:'POST',
      body:JSON.stringify(requestBody),
      headers:{
        'Content-Type':'application/json',
        Authorization: 'Bearer ' + token
      }
    }).then(res => {
      return res.json();
    }).then((res)=>{
      console.log(res);
      if(res.errors && res.errors[0].message==="Unauthenticated"){
        props.history.push("/");
        // throw new Error("Unauthenticated user");
      }
    }).catch((err)=>{
      console.log(err);
    })

  }

  const logout=()=>{
    localStorage.removeItem("token");
    props.history.push("/");
  }
  
  useEffect(()=>{
    getData();
  })
  return(
    <>
      Homepage
      <button onClick={ logout }>Logout</button>
    </>
  )
}

export default Homepage;