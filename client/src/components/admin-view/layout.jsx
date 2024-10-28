import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from './adminSidebar'
import AdminHeader from './adminHeader'
import { useState } from 'react'

export const Adminlayout = () => {

  const [isOpen,setIsOpen]=useState(false);

  return (
    <div className='w-full min-h-screen flex'>
        <AdminSideBar setIsOpen={setIsOpen} isOpen={isOpen} />
        <div className='flex flex-1 flex-col'>
            <AdminHeader setIsOpen={setIsOpen} isOpen={isOpen} />
            <main className='flex flex-col flex-1 bg-slate-100 p-4 md:p-6'>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default Adminlayout