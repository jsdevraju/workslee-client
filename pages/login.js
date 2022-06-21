import styles from "../styles/Login.module.css";
import Meta from "../app/components/meta/Meta";
import Button from "../app/components/button/Button";
import Input from "../app/components/input/Input";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { login } from "../app/redux/userSlice";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from '../app/components/loader/Loader';

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token } = useSelector((state) => state.user);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //When User Try to login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        formData
      );
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(login(data));
      toast.success(data.message);
      router.push("/");
      setFormData({});
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (token) router.push("/");
  }, [token]);

  return (
    <>
      {loading ? (
        <Loader  />
      ) : (
        <>
         <Meta title="Works Lee - Login" />
          <section className={styles.login}>
            <div className="container">
              <div className={styles.loginContainer}>
                <h1 className={styles.loginTitle}>Login Now</h1>
                <p className={styles.smText}>Now you have need to login</p>
                <form className={styles.loginForm} onSubmit={handleLogin}>
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
                  <Button text="LOGIN NOW" className="app_btn" type="submit" />
                </form>
                <p
                  style={{
                    fontSize: "0.8em",
                    marginTop: "1em",
                  }}
                >
                  if you don't have an account?
                  <Link href="/login">
                    <a
                      style={{
                        color: "blue",
                        fontWeight: "600",
                      }}
                    >
                      register
                    </a>
                  </Link>
                  now please
                </p>
                <p
                  style={{
                    fontSize: "0.8em",
                    marginTop: "1em",
                  }}
                >
                  forgot password?{" "}
                  <Link href="/forgot">
                    <a
                      style={{
                        color: "blue",
                        fontWeight: "600",
                      }}
                    >
                      forgot password
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Login;
