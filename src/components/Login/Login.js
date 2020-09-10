import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';


function Login() {

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    newUser:false,
    isSignedIn: false,
    name :'',
    email:'',
    password:'',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };


 const googleSignIn = ()=>{
  handleGoogleSignIn()
  .then ( res => {
    handleResponse(res, true)
  })
}

const fbSignIn = ()=>{
  handleFbSignIn()
  .then( res => {
    handleResponse(res, true)
  })
}

const signOut = ()=>{
  handleSignOut()
  .then ( res => {
  handleResponse(res, false)
  })
}

const handleResponse = (res, redirect)=>{
  setUser(res)
  setLoggedInUser(res)
  if(redirect){
    history.replace(from);
  }
}

const handleBlur = (e)=>{
  let isFieldValid;
  if (e.target.name === 'email'){
     isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
  }

  if ( e.target.name === 'password'){
    const isPasswordValid = e.target.value.length>6;
    const passwordHasNumber =  /\d{1}/.test(e.target.value);
    isFieldValid = isPasswordValid && passwordHasNumber;
  }
  if (isFieldValid){
    const newUserInfo = {...user};
    newUserInfo[e.target.name]= e.target.value;
    setUser(newUserInfo);
  }
}

const handleSubmit = (e)=>{
  //console.log(user.email, user.password, user.name);
 if ( newUser && user.email && user.password){
  createUserWithEmailAndPassword(user.name, user.email, user.password)
  .then ( res =>{
    handleResponse(res, true)
  })
 }

 if ( !newUser && user.email && user.password){
  signInWithEmailAndPassword(user.email, user.password)
  .then ( res =>{
    handleResponse(res, true)
  })
 }

 e.preventDefault();
}


  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut} > Sign out </button> :
        <button onClick={googleSignIn} > Sign in </button>
      }
      <br/>
      <button onClick={fbSignIn} >Sign in using facebook</button>

      {
        user.isSignedIn && <div>
          <p> welcome, {user.name} </p>
          <p> Your email: {user.email} </p>
          <img src={user.photo} alt=""/>
        </div> 
      }

      <h1>Our won Authentication</h1>
      <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        { newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name"/>}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder="Input Your Email" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} id="" placeholder="Input Your Password" required/>
        <br/>
        <input type="submit" value={newUser ? "Sign Up":"Sign In"}/>
      </form>
      <p style={{color:'red'}} > {user.error} </p>
      {user.success && <p style={{color:'green'}} > User {newUser ? 'Created':'Log In'} successfully done </p>}
      
    </div>
  );
}

export default Login;
