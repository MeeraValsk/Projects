import React from "react";
import { useState,useRef } from "react";

import { Toast } from 'primereact/toast';
        
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
// import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

 const navigate= useNavigate(null);
  const toast = useRef(null);
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/api/v1/users/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    try {
      const response = await fetch(url, options);
      const data=await response.json()
       console.log(data)
       console.log(data.statusCode);
        if(data.statuscode===200){
            console.log(data.token)
            toast.current.show({ severity: 'success', summary: 'success', detail:data.message ,life:3000});
            //here stroing token inn localstorage for subsequent request
            localStorage.setItem('jwt_token',data.token);
            setTimeout(()=>{ navigate("/",{replace:true});},3000)
           
            
         }else if(data.statuscode===400){
          console.log("hi");
           toast.current.show({ severity: 'error', summary: 'Error', detail:data.message ,life:3000});
        }
      
    } catch (e) {
       console.log(e)
    }
  };

  return (
    <>
    <form
      className="flex   justify-content-center bg-container"
      onSubmit={onSubmitForm}
    >
      <div className="surface-0 shadow-2 flex flex-column  justify-content-start align-items-start md:justify-content-center md:align-items-center border-round login-card border-blue-500 mt-8">
        <div className="flex flex-column mb-3 w-9 u border-blue-500 ">
          <label
            htmlFor="username"
            className="text-black-alpha-60 mb-1"
            style={{ fontSize: "14px", fontWeight: "bold", color: "white" }}
           
          >
            Username
          </label>
          <InputText
            type="text"
            value={username}
            id="username"
            placeholder="Enter Username......"
            className="w-12"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-column mb-3 gap-2 w-9 u">
          <label
            htmlFor="Password"
            className="text-black-alpha-60 mb-1 w-12"
            style={{ fontSize: "14px", fontWeight: "bold", color: "white" }}
          >
            Password
          </label>
          <InputText
            type="password"
            value={password}
            id="password"
            placeholder="Enter Username......"
            className="w-12"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <Password className="w-100"  toggleMask /> */}
        </div>

        <div className="flex flex-row justify-content-between w-9">
          <div className="flex">
            <Checkbox
              id="RemeberMe"
              onChange={(e) => setChecked(e.checked)}
              checked={checked}
            ></Checkbox>
            <label htmlFor="RemeberMe" className="ml-2">
              Remember Me
            </label>
          </div>
          <div>
            <Link
              to="/forget-password"
              style={{
                textDecoration: "none",
                color: "blue",
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              ForgetPassword
            </Link>
          </div>
        </div>
        <div className="flex justify-content-center mt-5 mb-3">
          <Button label="SignUp" icon="pi pi-user" type="submit" />
        </div>
      </div>
    </form>
     <Toast ref={toast}  position="top-center"/>
     </>
  );
};

export default Signup;
