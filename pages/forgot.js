import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../app/components/button/Button";
import Input from "../app/components/input/Input";
import styles from "../styles/forgot.module.css";
import axios from "axios";
import Meta from "../app/components/meta/Meta";
import Loader from "../app/components/loader/Loader";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/forgot/password`, {
        email,
      });
      setLoading(false);
      toast.success("Please check your email to reset your password");
      router.push("/verify-code");
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
          <Meta title="Works Lee - Forgot Password" />
          <section className={styles.forgot}>
            <div className="container">
              <div className={styles.row}>
                <div className={styles.forgotContainer}>
                  <h1>Forgot Password</h1>
                  <form className={styles.form} onSubmit={handleForgot}>
                    <label htmlFor="email">Send Reset Code</label>
                    <Input
                      type="email"
                      placeholder="Please enter your email"
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                    />
                    <Button
                      text="Send Code"
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

export default Forgot;
