import styles from "../styles/Profile.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiFace } from "react-icons/bi";
import Privet from "../app/components/privet/Privet";
import { useEffect, useState } from "react";
import axios from "axios";
import Meta from "../app/components/meta/Meta";
import Loader from "../app/components/loader/Loader";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const { token } = useSelector((state) => state?.user);
  const [loading, setLoading] = useState(false);

  const getUserInfo = async () => {
    setLoading(true);
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
      setLoading(false);
      setUserInfo(data?.userInfo);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    token && getUserInfo();
  }, [token]);
  return (
    <>
      <Privet>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Meta title={`Profile ${ userInfo?.fullname === undefined ? "loading" : userInfo?.fullname}`} />
            <section className={styles.profile}>
              <div className="container">
                <div className={styles.row}>
                  <div className={styles.leftCol}>
                    <div className={styles.profileImg}>
                      <Image
                        src={
                          userInfo?.avatar ||
                          `https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1655695358~hmac=259979e139face93090ce2bd9bc3f73c`
                        }
                        alt={userInfo?.fullname}
                        width={100}
                        height={100}
                      />
                      <h1>{userInfo?.fullname}</h1>
                      <div className={styles.rating}>
                        <StarRatings
                          rating={7 || userInfo?.ratings}
                          starRatedColor="#fab005"
                          numberOfStars={5}
                          name="rating"
                        />
                      </div>
                      <span>{userInfo?.numOfReviews} Reviews</span>
                    </div>
                    <div className={styles.verifyBadge}>
                      <h4>Badges</h4>
                      <p
                        className={
                          userInfo?.idVerify ? styles.idTrue : styles.idFalse
                        }
                      >
                        <span>
                          <FaUserAlt />
                        </span>
                        ID Verified
                      </p>
                      <p
                        className={
                          userInfo?.isEmailVerified
                            ? styles.phTrue
                            : styles.phFalse
                        }
                      >
                        <span>
                          <MdEmail />
                        </span>
                        Email Verified
                      </p>
                      <p
                        className={
                          userInfo?.faceVerify ? styles.faTrue : styles.faFalse
                        }
                      >
                        <span>
                          <BiFace />
                        </span>
                        Face Verified
                      </p>
                    </div>
                  </div>
                  <div className={styles.rightCol}>
                    <div className={styles.profileInfo}>
                      <h2>Skills</h2>
                      <div className={styles.skills}>
                        {userInfo?.skills?.map((skill, index) => (
                          <p key={index}>{skill}</p>
                        ))}
                      </div>
                      <h2>Reviews</h2>
                      <div className={styles.reviews}>
                        <div className={styles.leftReview}>
                          <h1>{userInfo?.ratings}</h1>
                          <div className={styles.rating}>
                            <StarRatings
                              rating={7 || userInfo?.ratings}
                              starRatedColor="#fab005"
                              numberOfStars={5}
                              name="rating"
                            />
                          </div>
                          <span>{userInfo?.numOfReviews} Reviews</span>
                        </div>
                        <div className={styles.rightReview}>
                          <div className={styles.progress}>
                            <p>5</p>
                            <div className={styles.progressBar}></div>
                          </div>
                          <div className={styles.progress}>
                            <p>4</p>
                            <div className={styles.progressBar}></div>
                          </div>
                          <div className={styles.progress}>
                            <p>3</p>
                            <div className={styles.progressBar}></div>
                          </div>
                          <div className={styles.progress}>
                            <p>2</p>
                            <div className={styles.progressBar}></div>
                          </div>
                          <div className={styles.progress}>
                            <p>2</p>
                            <div className={styles.progressBar}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </Privet>
    </>
  );
};

export default Profile;
