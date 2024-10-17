import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ForgetPassword() {
  const[mobileNumber,setMobile]=useState("")
   const navigate=useNavigate();

  const onSubmitForget=(e)=>{
    e.preventDefault();
    navigate("/change-password",{state:{mobile:mobileNumber}})


  }
  return (
    <form onSubmit={onSubmitForget}>
    <div className='flex justify-content-center'>
      <div className='shadow-2 forget-card flex flex-column mt-5 border-round'>
        <div className='flex flex-column mb-2 p-3'>
            <label htmlFor="mobile" className='mb-1'>Mobile Number</label>
            <InputText type='text'value={mobileNumber} id="mobile" placeholder='Enter Mobile Number' className='custom-input' onChange={(e)=>{setMobile(e.target.value)}}/>
        </div>
        <div className='w-full p-3'>
            <Button label='Get Otp' className='w-full' type="submit"/>
        </div>
        </div>
    </div>
    </form>
    
  )
}

export default ForgetPassword