import React, { useState } from "react";
import { json, Link } from "react-router-dom";

import { InputText } from "primereact/inputtext";

import { Checkbox } from "primereact/checkbox";
import { Password } from 'primereact/password';
import { Button } from "primereact/button";

const Login = () => {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [servererror, setServerError] = useState("");

  const onSumbitForm = async (e) => {
    e.preventDefault();
    console.log('hi')
    const url = "http://localhost:3000/api/v1/users/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password: password }),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok === true) {
        const data = await response.json();
        console.log(data);
      }
    } catch (e) {
      console.log(e.message);
    }
  };


const onEmail=(e)=>{

    console.log(e.target.value);
    setEmail(e.target.value)

}
const onPassword=(e)=>{
    console.log(e.target.value);
    setPassword(e.target.value)
}

  return (
    <form onSubmit={onSumbitForm}>
      <div className="flex align-items-center justify-content-center">
        <div className="surface-0 p-4 shadow-2 border-round w-full lg:w-6">
          <div>
            <label htmlFor="email" className="block text-900 font-medium mb-2">
              Email
            </label>
            <InputText value={email} onChange={onEmail} />

            <label
              htmlFor="password"
              className="block text-900 font-medium mb-2"
            >
              Password
            </label>
          

            <div className="flex align-items-center justify-content-between mb-6">
              <div className="flex align-items-center">
                <Checkbox
                  id="rememberme"
                  onChange={(e) => setChecked(e.checked)}
                  checked={checked}
                  className="mr-2"
                />
                <label htmlFor="rememberme">Remember me</label>
              </div>
              <Link
                to="/forget-password"
                className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              label="Sign In"
              icon="pi pi-user"
              className="w-full"
              type="submit"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
