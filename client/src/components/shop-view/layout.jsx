import React from 'react'
import ShopHeader from './ShopHeader'
import { Outlet } from 'react-router-dom'

const Shoplayout = () => {
  return (
    <div className='flex flex-col overflow-hidden bg-white'>
        <ShopHeader />
        <main className='flex flex-col w-full '>
            <Outlet />
        </main>
    </div>
  )
}

export default Shoplayout