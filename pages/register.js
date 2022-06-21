import styles from "../styles/Login.module.css";
import Meta from "../app/components/meta/Meta";
import Button from "../app/components/button/Button";
import Input from "../app/components/input/Input";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../app/redux/userSlice'
import { useRouter } from 'next/router'
import { useEffect } from "react";
import Loader from "../app/components/loader/Loader";

const initialState = {
  username: "",
  fullname: "",
  email: "",
  password: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { username, fullname, email, password } = formData;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useSelector((state) => state.user);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() =>{
    if(token) router.push("/")
}, [token])


  //When User Try to register
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || username?.length < 3 || username?.length > 15)
      return toast.error(
        "Username must be 3 characters and less than 15 characters"
      );
    if (!fullname || fullname?.length < 5 || fullname?.length > 20)
      return toast.error(
        "Fullname must be 5 characters and less than 20 characters"
      );
    if (!password || password?.length > 8 || password?.length > 32)
      return toast.error(
        "Password must be 8 characters and less than 32 characters"
      );
      setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        formData
      );
       setLoading(false);
        localStorage.setItem("user", JSON.stringify(data))
        dispatch(login(data))
        toast.success(data.message);
        router.push("/");
        setFormData({});
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };


 
  return (
    <>
      {loading ? <Loader /> : (
        <>
        <Meta title="Works Lee - Create An Account" />
      <section className={styles.login}>
        <div className="container">
          <div className={styles.loginContainer}>
            <h1 className={styles.loginTitle}>Let's get started!</h1>
            <p className={styles.smText}>You first have to create an account</p>
            <form className={styles.loginForm} onSubmit={handleRegister}>
              <div className={styles.loginFormGroup}>
                <label htmlFor="email" className={styles.loginFormLabel}>
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className={styles.loginFormGroup}>
                <label htmlFor="fullname" className={styles.loginFormLabel}>
                  First Name
                </label>
                <Input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={fullname}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
              </div>
              <div className={styles.loginFormGroup}>
                <label htmlFor="username" className={styles.loginFormLabel}>
                  Username
                </label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </div>
              <div className={styles.loginFormGroup}>
                <label htmlFor="password" className={styles.loginFormLabel}>
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
              <Button text="CREATE ACCOUNT" className="app_btn" type="submit" />
            </form>
            <p
              style={{
                fontSize: "0.8em",
                marginTop: "1em",
              }}
            >
              if you already have an account?
              <Link href="/login">
                <a
                  style={{
                    color: "blue",
                    fontWeight: "600",
                  }}
                >
                  login
                </a>
              </Link>
              now please
            </p>
          </div>
        </div>
      </section>
        </>
      )}
    </>
  );
};

export default Register;
