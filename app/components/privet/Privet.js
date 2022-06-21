import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userSlice";
import Loader from "../loader/Loader";

const Privet = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      setLoading(false);
    } else if (!user?.token) {
      dispatch(login(user));
      toast.error("You are not authenticated! Please login and try again.");
      router.push("/login");
    }
  }, []);
  return <>{loading ? <Loader /> : children}</>;
};

export default Privet;
