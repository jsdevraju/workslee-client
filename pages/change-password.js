import { useState } from "react";
import Button from "../app/components/button/Button";
import Input from "../app/components/input/Input";
import styles from "../styles/forgot.module.css";
import Meta from "../app/components/meta/Meta";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Loader from "../app/components/loader/Loader";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/change-password`, {
        email,
        password,
      });
      setLoading(false);
      toast.success("Password Changed");
      router.push("/login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Meta title="Works Lee - Change Password" />
          <section className={styles.forgot}>
            <div className="container">
              <div className={styles.row}>
                <div className={styles.forgotContainer}>
                  <h1>Now Change Your Password</h1>
                  <form className={styles.form} onSubmit={handleChangePassword}>
                    <label htmlFor="email">Email</label>
                    <Input
                      type="email"
                      placeholder="Please enter your email"
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                    />
                    <label htmlFor="password">New Password</label>
                    <Input
                      type="password"
                      placeholder="Please enter password"
                      value={password}
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                    />
                    <Button
                      text="Change Password"
                      className="app_btn"
                      type="submit"
                    />
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ChangePassword;
