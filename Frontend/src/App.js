//imports
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import EmailValidationPage from "./layout/emailValidation/EmailValidationPage";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SellVehiclePage from "./pages/SellVehiclePage";
import CarInfoPage from "./pages/CarInfoPage";
import Myads from "./pages/Myads";
import ErrorPage from "./layout/ErrorPage/ErrorPage";
import AdminLogin from "./layout/Admin/AdminLogin";
import AdminHome from "./layout/Admin/AdminHome";
import BikeInfoPage from "./pages/BikeInfoPage";
import AllUsedCars from "./layout/UsedCars/AllUsedCars";
import AllUsedBikes from "./layout/UsedBikes/AllUsedBikes";
import AllProducts from "./layout/AutoStoreMain/AllProducts";
import ShowAllVideos from "./layout/Videos/ShowAllVideos";
import MyCart from "./layout/Cart/MyCart";
import CheckoutPage from "./layout/Cart/CheckoutPage";
import Myorders from "./pages/Myorders";
import ForgetPasswordPage from "./layout/ForgetPassword/ForgetPasswordPage";
//hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

//store
import { AdminLoggedIn } from "./store/adminSlice";

//utils
import useAuth from "./utils/useAuth";

function App() {
  const user = useSelector((state) => state.authentication.user);
  const adminTokenFromStorage = localStorage.getItem("jwtToken");
  const adminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    if (adminTokenFromStorage) {
      dispatch(AdminLoggedIn({ token: adminTokenFromStorage }));
    }
  }, [dispatch, adminTokenFromStorage]);

  const isLoggedin = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element=<EmailValidationPage /> />
        <Route
          path="/profile/:userId"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/sell-vehicle/post-ad"
          element={user ? <SellVehiclePage /> : <Navigate to="/" />}
        />
        <Route
          path="/sell-vehicle/post-ad/car"
          element={user ? <CarInfoPage /> : <Navigate to="/" />}
        />
        <Route
          path="/sell-vehicle/post-ad/bike"
          element={user ? <BikeInfoPage /> : <Navigate to="/" />}
        />
        <Route
          path="/my-ads"
          element={user ? <Myads /> : <Navigate to="/" />}
        />
        <Route
          path="/my-orders"
          element={user ? <Myorders /> : <Navigate to="/" />}
        />
        <Route
          path="/my-cart"
          element={user ? <MyCart /> : <Navigate to="/" />}
        />
        <Route
          path="/checkout"
          element={user ? <CheckoutPage /> : <Navigate to="/" />}
        />

        <Route path="/used-cars" element=<AllUsedCars /> />
        <Route
          path="/forget-password"
          element={!user ? <ForgetPasswordPage /> : <Navigate to="/" />}
        />
        <Route path="/used-cars" element=<AllUsedCars /> />

        <Route path="/used-bikes" element=<AllUsedBikes /> />
        <Route path="/autostore" element=<AllProducts /> />
        <Route path="/videos" element=<ShowAllVideos /> />

        <Route
          path="/admin/*"
          element={
            adminLoggedIn ? (
              <>
                <AdminHome />
              </>
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
