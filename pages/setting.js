import styles from "../styles/setting.module.css";
import Button from "../app/components/button/Button";
import Input from "../app/components/input/Input";
import Image from "next/image";
import { categories } from "../app/category";
import { useState } from "react";
import Privet from "../app/components/privet/Privet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { storage } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { BsTrash } from "react-icons/bs";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { login } from '../app/redux/userSlice'
import Meta from "../app/components/meta/Meta";

const initialState = {
  fullname: "",
  email: "",
  phoneNo: Number(0),
  avatar: "",
  skills: [],
};

const Setting = () => {
  const [hideEdit, setHideEdit] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [userInfo, setUserInfo] = useState(initialState);
  const { fullname, email, phoneNo, avatar, skills } = userInfo;
  const [progress, setProgress] = useState(null);
  const { token } = useSelector((state) => state?.user);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const uploadFile = (e) => {
    const storageRef = ref(storage, `profile_img/${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        return toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setUserInfo({ ...userInfo, avatar: downloadUrl });
        });
      }
    );
  };

  // Delete Images
  const deleteImage = () => {
    if (window.confirm("Are you sure to delete this image?")) {
      const deleteRef = ref(storage, avatar);
      deleteObject(deleteRef).then(() => {
        setAvatar(null);
      });
    } else return toast.warning(`You can't able to do that`);
  };

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
      dispatch(login({token, userInfo:data?.userInfo}))
      localStorage.setItem('user', JSON.stringify({token, userInfo:data?.userInfo}))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    token && getUserInfo();
  }, [token]);

  const updateUserInfo = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/update/me`,
        userInfo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: true,
        }
      );
      toast.success(data?.message);
      setUserInfo(data?.userInfo);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/update/password`,
        {
          newPassword,
          oldPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: true,
        }
      );
      localStorage.removeItem("user");
      dispatch(login({}))
      toast.success(data?.message);
      setUserInfo(data?.userInfo);
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };


  const overlayHide = () =>{
   setHideEdit(!hideEdit);
   
  }
  const passwordOverlayHide = () =>{
    setHidePassword(!hidePassword);
  }

  return (
    <>
      <Privet>
      <Meta title={`Profile ${!userInfo?.fullname ? "loading" : userInfo?.fullname} - Setting`} />
        <section className={styles.setting}>
          <div className="container">
            <div className={styles.row}>
              <div className={styles.header}>
                <h1>Profile Details</h1>
                <div className={styles.btnGrp}>
                  <Button
                    onClick={() => setHideEdit(!hideEdit)}
                    text="Edit Profile"
                    type="button"
                    className="app_btn"
                  />
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.profileImg}>
                  <Image
                    src={
                      userInfo?.avatar ||
                      `https://cdn-icons-png.flaticon.com/512/3135/3135715.png`
                    }
                    alt={userInfo?.fullname}
                    width={100}
                    height={100}
                  />
                </div>
                <div className={styles.profileInfo}>
                  <p>Full Name</p>
                  <h5>{userInfo?.fullname}</h5>
                </div>
                <div className={styles.profileInfo}>
                  <p>Contact Phone</p>
                  <h5>+880 {userInfo?.phoneNo}</h5>
                </div>
                <div className={styles.profileInfo}>
                  <p>Communication </p>
                  <h5>Email, Phone</h5>
                </div>
                <div className={styles.profileInfo}>
                  <p>Address</p>
                  <h5>Null</h5>
                </div>
              </div>
            </div>
            {/* CHange Password */}
            <div className={styles.passHeader}>
              <h1>Change Password</h1>
              <div className={styles.btnGrp}>
                <Button
                  onClick={() => setHidePassword(!hidePassword)}
                  text="Change Password"
                  type="button"
                  className="app_btn"
                />
              </div>
            </div>
          </div>

          {/* Model Update userInfo */}
          <div
            className={
              hideEdit ? `${styles.model} ${styles.modelShow}` : styles.model
            }
          >
            <div className={styles.modelHeader}>
              <h1>Edit You Profile</h1>
              <Image
                src={
                  avatar ||
                  userInfo?.avatar ||
                  `https://cdn-icons-png.flaticon.com/512/3135/3135715.png`
                }
                alt={userInfo?.fullname}
                width={100}
                height={100}
                style={{
                  borderRadius: "100%",
                }}
              />

              <Input
                type="file"
                name="avatar"
                id="avatar"
                onChange={uploadFile}
                accept="image/*"
              />
              {avatar && (
                <BsTrash
                  onClick={deleteImage}
                  size={30}
                  style={{
                    position: "absolute",
                    color: "red",
                    top: "80px",
                    cursor: "pointer",
                  }}
                />
              )}
            </div>

            <form className={styles.editProfile} onSubmit={updateUserInfo}>
              <div className={styles.formGroup}>
                <label htmlFor="fullname">Full Name</label>
                <Input
                  type="text"
                  name="fullname"
                  id="fullname"
                  onChange={handleChange}
                  value={fullname}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={email}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phoneNo">Number</label>
                <Input
                  type="text"
                  name="phoneNo"
                  id="phoneNo"
                  onChange={handleChange}
                  value={phoneNo}
                />
              </div>
              <div className={styles.formGroup}>
                <h2>Skiils</h2>
                {categories.map(({ name, img }, index) => (
                  <div
                    onClick={() =>
                      setUserInfo({ ...userInfo, skills: [name, ...skills] })
                    }
                    key={index}
                    className={styles.category}
                  >
                    <div className={styles.categoryImg}>
                      <Image
                        src={img}
                        width={20}
                        height={20}
                        alt="Razu Islam"
                      />
                    </div>
                    <h5>{name}</h5>
                    <div className={styles.dot}></div>
                  </div>
                ))}
              </div>
              <Button text="Save Change" type="submit" className="app_btn" />
            </form>
          </div>
          {/* Password Change Model */}
          <div className={
              hidePassword ? `${styles.passwordModel} ${styles.passwordModelShow}` : styles.passwordModel
            }>
            <form className={styles.editProfile} onSubmit={updatePassword}>
              <div className={styles.formGroup}>
                <label htmlFor="newPassword">New Password</label>
                <Input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="oldPassword">Old Password</label>
                <Input
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                />
              </div>
              <Button
                text="Update Password"
                type="submit"
                className="app_btn"
              />
            </form>
          </div>
          <div
            className={
              hideEdit
                ? `${styles.overlay} ${styles.overlayShow}`
                : styles.overlay
            }
            onClick={overlayHide}
          ></div>
          <div
            className={
              hidePassword
                ? `${styles.overlay} ${styles.overlayShow}`
                : styles.overlay
            }
            onClick={passwordOverlayHide}
          ></div>
        </section>
      </Privet>
    </>
  );
};

export default Setting;
