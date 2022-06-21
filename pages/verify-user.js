import styles from "../styles/verify-user.module.css";
import Input from "../app/components/input/Input";
import Button from "../app/components/button/Button";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { login } from "../app/redux/userSlice";
import Loader from "../app/components/loader/Loader";
import Meta from "../app/components/meta/Meta";

const VerifyUser = () => {
  const router = useRouter();
  const [verifyCode, setVerifyCode] = useState("");
  const {
    token,
    userInfo,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleVerfiCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/email-verify`,
        {
          email: userInfo?.email,
          verifyCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast.success(data.message);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(login(data));
      router.push("/");
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
        <Meta title="Email Verification - Works lee" />
        <section className={styles.verifyUser}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className={styles.row}>
            <form className={styles.form} onSubmit={handleVerfiCode}>
              <label htmlFor="code">Verify Code</label>
              <Input
                type="text"
                placeholder="Enter your code"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
              />
              <Button type="submit" className="app_btn" text="Verify Code" />
            </form>
          </div>
        </div>
      </section>
        </>
      )}
    </>
  );
};

export default VerifyUser;
