import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useLocation } from "react-router-dom";
import { InputOtp } from 'primereact/inputotp';
import { useState } from "react";



const ChangePassword=()=>{
    const [token, setTokens] = useState();


   const location= useLocation();
   const{state}=location;
    return(<div className="flex justify-content-center py-8">
        <div className="shadow-3 border-round px-4 py-2 flex flex-column justify-content-start   change-password">
            <h2 className="text-center">Change Password</h2>
        <p style={{fontSize:"14x",fontWeight:"600",maxWidth:"350px", lineHeight:"27px",textAlign:"left" }} className="mb-3 text-gray-600 ">We have sent a  4 digit OTP to your Mobile Number+{state.mobile}</p>
        <div className="flex flex-column" >
            <label htmlFor="otp" className="mb-4 text-900" style={{fontSize:"17px",fontWeight:"bold",}} >One Time Passcode:</label>
            <InputOtp  id="otp" value={token} onChange={(e) => setTokens(e.value)} integerOnly/>
        </div>
        <div className="resend-otp-button mb-2">
            <Button label="Resend OTP" severity="info" text  style={{textAlign: "left", paddingLeft:"0px" /* Align text to the left */
    }}/>
        </div>
        <div className="verify-button w-12 mb-4">
            <Button label="Verify & Login" className="bg-blue-500 w-full"/>
        </div>
        </div>
    </div>)
}
export default ChangePassword