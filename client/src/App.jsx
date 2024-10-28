import { Route, Routes } from "react-router-dom";
import Authlayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Adminlayout from "./components/admin-view/layout";
import AdminDashBoard from "./pages/admin-view/dashboard";
import { Products } from "./pages/admin-view/Products";
import { Orders } from "./pages/admin-view/orders";
import Features from "./pages/admin-view/Features";
import Shoplayout from "./components/shop-view/layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/shop-view/Home";
import Listing from "./pages/shop-view/Listing";
import Checkout from "./pages/shop-view/Checkout";
import Account from "./pages/shop-view/Account";
import Checkauth from "./components/common/Checkauth";
import Unauthorized from "./pages/unauthorized";
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from "react";
import { checkAuth } from "./store/auth/authSlice";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const {isAuthenticated,user,isLoading} = useSelector((state)=>state.auth);

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch])

  if(isLoading) return <Skeleton className="w-[600px] h-[600px] rounded-full" />

  

  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth"
          element={
            <Checkauth isAuthenticated={isAuthenticated} user={user}>
              <Authlayout />
            </Checkauth>
          }
        >
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Route>
        <Route
          path="/admin"
          element={
            <Checkauth isAuthenticated={isAuthenticated} user={user}>
              <Adminlayout />
            </Checkauth>
          }
        >
          <Route path="dashboard" element={<AdminDashBoard />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="orders" element={<Orders />}></Route>
          <Route path="features" element={<Features />}></Route>
        </Route>
        <Route
          path="/shop"
          element={
            <Checkauth isAuthenticated={isAuthenticated} user={user}>
              <Shoplayout />
            </Checkauth>
          }
        >
          <Route path="home" element={<Home />}></Route>
          <Route path="listing" element={<Listing />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
          <Route path="account" element={<Account />}></Route>
        </Route>
        <Route path='/unauth-page' element={<Unauthorized />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
