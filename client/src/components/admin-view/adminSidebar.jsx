import React from "react";
import {
  Shield,
  LayoutDashboard,
  ShoppingCart,
  BadgeCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const adminSideBarcontrols = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingCart />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

const AdminNav = ({setIsOpen}) => {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex flex-col gap-6 ">
      {adminSideBarcontrols.map((menuItem) => (
        <div
          onClick={() =>{
            navigate(menuItem.path);
            setIsOpen ? setIsOpen(false) :null;
          } }
          className="flex items-center cursor-pointer text-xl px-3 py-2 gap-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          key={menuItem.id}
        >
          {menuItem.icon}
          <p>{menuItem.label}</p>
        </div>
      ))}
    </nav>
  );
};

const AdminSideBar = ({isOpen,setIsOpen}) => {
  return (
    <>
      <Sheet open={isOpen} onOpenChange={()=>setIsOpen(!isOpen)}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full mt-4">
            <SheetHeader>
              <SheetTitle className="flex items-center border-b">
                <Shield size={30} />
                <p className="text-2xl font-extrabold mb-2">Admin Panel</p>
              </SheetTitle>
            </SheetHeader>
            <AdminNav setIsOpen={setIsOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden flex-col  gap-2 w-64 bg-background border-r p-6 lg:flex">
        <div className="flex  items-center gap-2">
          <Shield size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <AdminNav />
      </aside>
    </>
  );
};

export default AdminSideBar;
