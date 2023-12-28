//imports
import React from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import ProfileCard from "../layout/ProfilePage/ProfileCard";

//material-ui
import { useDispatch } from "react-redux";

//hooks
import { useEffect } from "react";

//store
import { Activate } from "../store/navbarSlice";

function Profile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Activate({ user: null }));
  }, []);
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <ProfileCard />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
