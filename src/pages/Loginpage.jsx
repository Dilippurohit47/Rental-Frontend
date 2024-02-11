import React, { useState } from "react";
import "../styles/login.scss"
import {setLogin} from "../redux/userReducer"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast";





const Loginpage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({email , password})
      })
      
      const loggedIn = await response.json() 
// console.log("login",loggedIn)

      if(loggedIn?.success === true ){
        dispatch(
          setLogin({
            user:loggedIn?.user,
            token:loggedIn?.token
          })
        )
        toast.success(loggedIn?.message)
        navigate("/")
      }
      else{
        toast.error(loggedIn?.message)
      }


    } catch (error) {
      console.log( "login failed",error.message)
      
    }

  }

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button type="submit">Log In</button>
        </form>
        <a href="/register">Dont have an account ? sign In Here</a>
      </div>
    </div>
  );
};

export default Loginpage;
