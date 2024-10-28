import Form from '@/components/common/form'
import {loginFormControls } from '@/config'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from "@/hooks/use-toast"
import { loginUser } from '@/store/auth/authSlice'

const Login = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {toast}=useToast();

  const [formData,setFormData]=useState({
    email:'',
    password:''
  })

  const onSubmit=(e)=>{
    e.preventDefault();
    
    dispatch(loginUser(formData)).then((data)=>{
      if(data?.payload.success){
        toast({
          description: data?.payload.message,
        })
        if(data?.payload.user.role==='user'){
          navigate('/shop/home')
        }else{
          navigate('/admin/dashboard')
        }
      }else{
        toast({
          description: data?.payload.message,
        })
      } 
    });
  }
  return (
    <div className='w-full mx-auto max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-foreground tracking-tight'>Sign in to your account</h1>
        <p>Don't have an account?
          <Link  className='ml-2 font-medium text-primary hover:underline' to='/auth/register'>Register</Link>
        </p>
      </div>
      <Form
       formControl={loginFormControls}
       formData={formData}
       setFormData={setFormData}
       onSubmit={onSubmit}
       buttonText={'Sign in'}
       />
    </div>
  )
}

export default Login