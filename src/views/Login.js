import React, { useState } from "react";
import "../assets/css/Login.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userFlag, setUserFlag] = useState(true);
  const [emailFlag, setEmailFlag] = useState(true);
  const [passwordFlag, setPasswordFlag] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this state variable
const [correctPassword,setCorrectPassword]=useState(true)
  const navigate = useNavigate()
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validatePassword = (password) => {
    if (!password) {
      return false;
    } else {
      return true;
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    validateUser();
  };

  const validateUser = async () => {
    let passwordIsValid = validatePassword(password);
    setUserFlag(true);
    setCorrectPassword(true); // Reset the password validation flag


    if (passwordIsValid) {
      setEmailFlag(true);
      setPasswordFlag(true);
      submitUser();
    } else {
      setEmailFlag(false);
      setPasswordFlag(false);
    }
  };

  // const submitUser = async () => {
  //   try {
  //     const response = await axios.post(
  //       'https://monkfish-app-wyvrc.ondigitalocean.app/login',
  //       {
  //         email: email,
  //         password: password,
  //       }
  //     );

  //     const result = await response.data;
  //     // console.log(result);

  //     if (result.status === 'error') {
  //       console.log(result.message);
  //       setUserFlag(false);
  //     }
  //     if (result.status === 'success') {
  //       console.log("result", result);
  //       console.log("role", result.role_id);

  //                 if(result.role_id === 1){
  //         console.log(result.token);
  //         setUserFlag(true);
  //         navigate('/admin/dashboard')
  //       }
  //       else{
  //         console.log("unauthorized access")
  //         setUserFlag(false)
  //       }

  //       // setUserContext(result.user)
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
  axios.defaults.withCredentials = true
  const submitUser = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/login/post',
        {
          email: email,
          password: password,
        }
      );

      const result = response.data; // Remove the await here
      console.log("status", result)
      setUserFlag(true);
      setCorrectPassword(true);


      if (result.Status === 'error') {
        console.log(result.message);
        setUserFlag(false);
      }


      if (result.Status === "Succses") {
        if (result.role === "admin") {
          setUserFlag(true);
          navigate("/admin/dashboard")
        }
        else {
          setUserFlag(false)
        }
      }




      else if (result.Status === 'Faield') {
        // alert(result.Error)
setCorrectPassword(false)  
      console.log("password not match")
      }



    } catch (err) {
      console.log(err.message);
    }
  };


  return (
    <div className="container">

      <div id="login-form">
        <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">Email:</label>
          <input type="text" id="username" name="username" value={email}
            onChange={handleEmailChange} />
          <label htmlFor="password" >Password:</label>
          <input type="password" id="password" name="password" value={password}
            onChange={handlePasswordChange} />
          {!userFlag && (
          <p style={{ color: 'red' }}>
            Unauthorized access.
          </p>
        )}
        {!correctPassword && (
          <p style={{ color: 'red' }}>Incorrect Password</p>
        )}
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>

  );
};

export default LoginForm;
