import styles from "./Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Button from "../button/Button";
import { BiUserCircle } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { login } from "../../redux/userSlice";
const Navbar = () => {
  const router = useRouter();
  const { token } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const [showMenu, setShowMenu] = useState(false);

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: true,
        }
      );
      setUserInfo(data?.userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    token && getUserInfo();
  }, [token]);

  const navMenu = [
    {
      name: "Find works",
      path: "/works",
      className: router.pathname == "/works" ? "nav_links active" : "nav_links",
    },
    {
      name: "About",
      path: "/about",
      className: router.pathname == "/about" ? "nav_links active" : "nav_links",
    },
    {
      name: "Login/Signup",
      path: "/register",
      className:
        router.pathname == "/register" ? "nav_links active" : "nav_links",
    },
    {
      name: "Become a Freelancer",
      path: "/freelancer",
      className:
        router.pathname == "/freelancer" ? "nav_links active" : "nav_links",
    },
  ];

  const tokenUser = [
    {
      name: "Find works",
      path: "/works",
      className: router.pathname == "/works" ? "nav_links active" : "nav_links",
    },
    {
      name: "About",
      path: "/about",
      className: router.pathname == "/about" ? "nav_links active" : "nav_links",
    },
    {
      name: "Become a Freelancer",
      path: "/freelancer",
      className:
        router.pathname == "/freelancer" ? "nav_links active" : "nav_links",
    },
  ];

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/logout`
      );
      localStorage.clear("user");
      dispatch(login(data));
      router.push("/login");
      toast.success("Loggout Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <nav className={styles.navbar}>
            <Link href={"/"}>
              <Image
                className="logo"
                src="https://www.workslee.com/workslee-logo.svg"
                alt="Razu Islam"
                width={200}
                height={"100%"}
              />
            </Link>
            <ul
              className={
                showMenu
                  ? `${styles.showNav} ${styles.nav_item}`
                  : styles.nav_item
              }
            >
              {token
                ? tokenUser.map(({ name, path, className }, index) => (
                    <li key={index}>
                      <Link href={path}>
                        <a className={className}>{name}</a>
                      </Link>
                    </li>
                  ))
                : navMenu.map(({ name, path, className }, index) => (
                    <li key={index}>
                      <Link href={path}>
                        <a className={className}>{name}</a>
                      </Link>
                    </li>
                  ))}
            </ul>
            {/* NavMenu */}
            <div
              className={showMenu ? "navMenu isActive" : "navMenu"}
              onClick={() => setShowMenu(!showMenu)}
            >
              <span className="bars"></span>
              <span className="bars"></span>
              <span className="bars"></span>
            </div>
            {token ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  position: "relative",
                }}
              >
                <Button
                  onClick={() => router.push("/create")}
                  text={"Post a Job"}
                  className="app_btn myBtn"
                  type="submit"
                />
                <div className="profile">
                  <Image
                    className="logo"
                    src={
                      userInfo?.avatar ||
                      "https://www.workslee.com/workslee-logo.svg"
                    }
                    alt="Razu Islam"
                    width={50}
                    height={50}
                    style={{
                      borderRadius: "100%",
                      cursor: "pointer",
                    }}
                    onClick={() => setShow(!show)}
                  />
                </div>
                <div
                  className={
                    show ? `${styles.popup} ${styles.show}` : styles.popup
                  }
                >
                  <h3>{userInfo?.fullname}</h3>
                  <ul>
                    <li>
                      <Link href="/profile">
                        <a className={styles.popLink}>
                          <BiUserCircle size={20} /> View Profile
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/setting">
                        <a className={styles.popLink}>
                          <FiSettings size={20} /> Setting
                        </a>
                      </Link>
                    </li>
                    <li className={styles.jobBtn}>
                      <Button
                        onClick={() => router.push("/create")}
                        text={"Post a Job"}
                        className="app_btn"
                        type="button"
                      />
                    </li>
                  </ul>
                  <Button
                    onClick={handleLogout}
                    text={"Logout"}
                    className="app_btn"
                    type="button"
                  />
                </div>
                <div
                  onClick={() => setShow(!show)}
                  className={
                    show
                      ? `${styles.overlay} ${styles.overlayShow}`
                      : styles.overlay
                  }
                ></div>
              </div>
            ) : null}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
