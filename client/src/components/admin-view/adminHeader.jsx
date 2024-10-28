import React from 'react'
import { Button } from '../ui/button'
import { Menu,LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/auth/authSlice';

const AdminHeader = ({setIsOpen,isOpen}) => {

  const dispatch=useDispatch()
  
  const handleLogout=()=>{
    dispatch(logoutUser());
  }

  return (
    <div className='flex items-center justify-between px-4 py-3 border-b '>
      <Button onClick={()=>setIsOpen(!isOpen)} className='lg:hidden '>
        <Menu size={20} />
      </Button>
      <div className='flex flex-1 justify-end'>
        <Button onClick={()=>handleLogout()}className='inline-flex items-center gap-2 shadow text-sm font-medium'>
        <LogOut />
          logout
        </Button>
      </div>
    </div>
  )
}

export default AdminHeader