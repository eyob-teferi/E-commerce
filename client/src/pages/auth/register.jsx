import Form from '@/components/common/form'
import { registerFormControls } from '@/config'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '@/store/auth/authSlice'
import { useToast } from "@/hooks/use-toast"



const Register = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {toast}=useToast();

  const [formData,setFormData]=useState({
    userName:'',
    email:'',
    password:''
  })

  const onSubmit=(e)=>{
    e.preventDefault();
    
    dispatch(registerUser(formData)).then((data)=>{
      if(data?.payload.success){
        toast({
          description: data?.payload.message,
        })
        navigate('/auth/login')
      }else{
        toast({
          description: data?.payload.message,
        })
      } 
    });

  }
  return (
    <div className='w-full mx-auto max-w-md space-y-6 '>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-foreground tracking-tight'>Create a new account</h1>
        <p>already have an account
          <Link  className='ml-2 font-medium text-primary hover:underline' to='/auth/login'>Login</Link>
        </p>
      </div>
      <Form
       formControl={registerFormControls}
       formData={formData}
       setFormData={setFormData}
       onSubmit={onSubmit}
       buttonText={'Sign up'}
       />
    </div>
  )
}

export default Register