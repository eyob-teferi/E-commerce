
import React from 'react'
import { Outlet } from 'react-router-dom'

const Authlayout = () => {
  return (
    <div className='flex min-h-screen w-full'>
        <div className='hidden lg:flex items-center justify-center bg-black w-1/2'>
            <div className='max-w-md text-center '>
                <h1 className='text-4xl font-extrabold tracking-tight text-white'>
                    Welcome to Ecommerce Shopping
                </h1>
            </div>
        </div>
        <div className='flex flex-1 items-center justify-center bg-background w-1/2 p-6'>
            <Outlet />
        </div>
    </div>
  )
}

export default Authlayout