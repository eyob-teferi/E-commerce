import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HousePlugIcon } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'
import { useSelector } from "react-redux"
import { shoppingViewHeaderMenuItems } from "@/config"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ShoppingCart } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { UserCog } from "lucide-react"
import { LogOut } from "lucide-react"
import { useDispatch } from "react-redux"
import { logoutUser } from "@/store/auth/authSlice"

const MenuItems=()=>{
  return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center  gap-6  lg:flex-row ">
    {
      shoppingViewHeaderMenuItems.map(items=><Link key={items.id} to={items.path} className="text-sm font-medium">{items.label}</Link>)
    }
  </nav>
}


const HeaderRightItem=()=>{
   
  const dispatch=useDispatch()
  const handleLogout=()=>{
      dispatch(logoutUser());
  }

  const navigate=useNavigate()
  const {user}=useSelector(state=>state.auth)
  return <div className="flex lg:flex-row lg:items-center gap-4 flex-col">
      <Button  variant='outline' size='icon'>
        <ShoppingCart className="w-6 h-6" variant='outline' size='icon' />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar >
            <AvatarFallback >{user?.userName[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem onClick={()=>navigate('/shop/account')}>
            <UserCog className="mr-2 w-4 h-4"></UserCog>
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem onClick={()=>handleLogout()}>
            <LogOut className="mr-2 w-4 h-4"></LogOut>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  </div>
}

export const ShopHeader = () => {

  const {isAuthenticated,user}=useSelector(state=>state.auth)
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className=' flex items-center justify-between h-16 px-4 md:px-6 '>
        <Link to='/shop/home' className='flex items-center gap-2'>
          <HousePlugIcon className='h-6 w-6'></HousePlugIcon>
          <span className='font-bold'>Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='lg:hidden'>
              <MenuIcon className='h-6 w-6'></MenuIcon>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='max-w-xs w-full'>
            <MenuItems />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
            <HeaderRightItem />
          </div> 
      </div>

    </header>
  )
}


export default ShopHeader