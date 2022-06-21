import Meta from "../app/components/meta/Meta";
import styles from "../styles/Home.module.css";
import Button from "../app/components/button/Button";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Loader from "../app/components/loader/Loader";
import toast from "react-hot-toast";
import { login } from "../app/redux/userSlice";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user?.userInfo?.isEmailVerified) {
        setLoading(false);
      } else if (!user?.userInfo?.isEmailVerified) {
        dispatch(login(user));
        toast.error("Please verify your email first.");
        router.push("/verify-user");
      }
    }else setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Meta title={"Works Lee - Home"} />
          <section className={styles.home}>
            <div className="container">
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Welcome to WorksLee</h1>
                <p className={styles.heroDescription}>
                  #1 marketplace for local works and services
                </p>
                <Button text="Post a Work" className="app_btn" />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
