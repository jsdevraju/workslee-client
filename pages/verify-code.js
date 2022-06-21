import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../app/components/button/Button";
import Input from "../app/components/input/Input";
import styles from "../styles/forgot.module.css";
import axios from 'axios'
import toast from "react-hot-toast";
import Loader from "../app/components/loader/Loader";
import Meta from "../app/components/meta/Meta";

const VerifyCode = () => {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleVerifyCode = async (e) =>{
    e.preventDefault();
    setLoading(true)
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/verify/password/code`, {
          email,
          resetCode
        })
        setLoading(false)
        toast.success("Now you can change your password");
        router.push("/change-password");
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error(error.response.data.message);
    }
  } 

  return (
    <>
      {loading ? <Loader /> : (
        <>
        <Meta title="Works Lee - Verify Code" />
        <section className={styles.forgot}>
        <div className="container">
          <div className={styles.row}>
            <div className={styles.forgotContainer}>
              <h1>Verification Email</h1>
              <form className={styles.form} onSubmit={handleVerifyCode}>
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  placeholder="Please enter your email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                />
                <label htmlFor="code">Verify Code</label>
                <Input
                  type="text"
                  placeholder="Please enter your code"
                  value={resetCode}
                  name="code"
                  onChange={(e) => setResetCode(e.target.value)}
                  id="code"
                />
                <Button text="Change Password" className="app_btn" type="submit" />
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

export default VerifyCode;
