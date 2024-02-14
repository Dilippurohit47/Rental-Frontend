import React, { useEffect, useState } from "react";
import "../styles/Register.scss";
import { FaEyeSlash } from "react-icons/fa";

import Image from "../assets/addImage.png";

import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast";

const Registerpage = () => {
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [showPassword, setshowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setformData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

const navigate =  useNavigate()
  const [passwordMatch,setpasswordMatch ] = useState(true)


  useEffect(() =>{
    if(formData.password === formData.confirmPassword  || formData.confirmPassword === ""){
      setpasswordMatch(true) 
    }else{
      setpasswordMatch(false)
    }
  },[formData])



  
  const [loadingButton,setloadingButton] = useState(true)

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setloadingButton(false)
    try {
      const register_form = new FormData()

      for (var key in formData){
        register_form.append(key , formData[key])
      }
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/auth/register`,({
        method:"POST",
        body:register_form
      }))

      const data = await response.json() 

      if(response.ok){
        toast.success(data.message)
        navigate("/login")
    setloadingButton(true)

      }
      else{
        setloadingButton(true)

        toast.error(data?.message)

      }

    } catch (error) {
      setloadingButton(true)

      toast.error("internal server error")

    }


  }


  return (
    <div className="register">
      <div className="register_content">
        <form className="from" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            value={formData.firstName}
            required
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            value={formData.lastName}
            required
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
          />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formData.password}
            required
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            required
            onChange={handleChange}
          />
          <i onClick={() => setshowPassword(!showPassword)}>
            <FaEyeSlash />
          </i>

        {
          !passwordMatch &&(
            <p style={{color:"red"}}>
              Passwords does not matched
            </p>
          )
        }


          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
          />

          <label htmlFor="image">
            <img src={Image} alt="add profile photo" />
            <p>Upload your Photo</p>
          </label>

{
    formData.profileImage && (
        <img  src={URL.createObjectURL(formData.profileImage)} alt="profile photo" style={{maxWidth:"80px"}}  />
    )
}
  {
    loadingButton ?  <button typeof="submit" disabled={!passwordMatch}>REGISTER</button> : <p>Processing...</p>
  }
         
        </form>
        <a href="/login">Already have and account </a>
      </div>
    </div>
  );
};

export default Registerpage;
