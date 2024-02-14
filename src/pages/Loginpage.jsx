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
const [buttonLoading , setbuttonLoading] = useState(true)

  const handleSubmit = async(e) =>{
    e.preventDefault();
setbuttonLoading(false)
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({email , password})
      })
      
      const loggedIn = await response.json() 

      if(loggedIn?.success === true ){
        dispatch(
          setLogin({
            user:loggedIn?.user,
            token:loggedIn?.token
          })
        )
setbuttonLoading(true)
        toast.success(loggedIn?.message)
        navigate("/")
      }
      else{
        setbuttonLoading(true)
        toast.error(loggedIn?.message)
      }


    } catch (error) {
setbuttonLoading(true)
  toast.error("internal server error")
      
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

          {
          buttonLoading ? <button type="submit" >Log In</button> : <>
          <p>Wait</p>
          </>

          }
        </form>
        <a href="/register">Dont have an account ? sign In Here</a>
      </div>
    </div>
  );
};

export default Loginpage;
