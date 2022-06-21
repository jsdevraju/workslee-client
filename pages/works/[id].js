import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../../styles/jobDetails.module.css";
import axios from "axios";
import { useState } from "react";
import { BiFace, BiTime } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail, MdOutlineLocationOn } from "react-icons/md";
import moment from 'moment'
import Meta from "../../app/components/meta/Meta";

const JobDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);

  const getSingleDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/job/${id}`
      );
      setData(data?.job);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    id && getSingleDetails();
  }, [id]);


  return (
    <>
     <Meta title={`Profile ${data?.title}`} />
      <section className={styles.details}>
        <div className="container">
            {/* Left Side */}
          <div className={styles.row}>
            <div className={styles.leftRow}>
              <div className={styles.jobDetails}>
                <div className={styles.header}>
                <h1>{data?.title}</h1>
                <p>{data?.category}</p>
                </div>
                <div className={styles.description}>
                    <h4>Description</h4>
                  <p>{data?.description}</p>
                </div>
                <div className={styles.location}>
                    <h4>Location</h4>
                  <p><MdOutlineLocationOn /> {data?.location?.formattedAddress}</p>
                </div>
                <div className={styles.timeDate}>
                  <div className={styles.wrapper}>
                    <div className={styles.date}>
                      <div className={styles.icon}>
                        <BiTime />
                      </div>
                      <div className={styles.info}>
                      <h4>Week Days</h4>
                      <p>Sun,Mon,Tue,Wed,Thu,Fri,Sat</p>
                      </div>
                    </div>
                    <div className={styles.date}>
                      <div className={styles.icon}>
                        <BiTime />
                      </div>
                      <div className={styles.info}>
                      <h4>What Time</h4>
                      <p>{data?.whatTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.taskType}>
                  <div className={styles.taskLeft}>
                    <h4>Task Type</h4>
                    <p>{data?.taskType}</p>
                  </div>
                  <div className={styles.taskRight}>
                    <h4>Task Posted</h4>
                    <p>{moment(data?.createAt).startOf('hour').fromNow()}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Left Side */}
            <div className={styles.rightRow}>
              <div className={styles.clientInfo}>
                <div className={styles.price}>
                  <p>Budget</p>
                  <h1>৳${data?.price}</h1>
                  <p>Apply for the Work</p>
                </div>
                <div className={styles.aboutClient}>
                  <h3>About the client</h3>
                  <p>{data?.postedBy?.fullname}</p>
                  <div className={styles.review}>
                    <AiFillStar color="#f59e0b" size={20} />
                    <AiFillStar color="#f59e0b" size={20} />
                    <AiFillStar color="#f59e0b" size={20} />
                    <AiFillStar color="#f59e0b" size={20} />
                    <AiFillStar color="#f59e0b" size={20} />
                  </div>
                </div>
                <div className={styles.membership}>
                  <p>
                    <BiTime /> Member since {moment(data?.createAt).format("MMM Do YY")}
                  </p>
                </div>
                <div className={styles.verifyBadge}>
                  <h4>Badges</h4>
                  <p
                    className={
                        data?.postedBy?.idVerify ? styles.idTrue : styles.idFalse
                    }
                  >
                    <span>
                      <FaUserAlt />
                    </span>
                    ID Verified
                  </p>
                  <p
                    className={
                        data?.postedBy?.isEmailVerified ? styles.phTrue : styles.phFalse
                    }
                  >
                    <span>
                      <MdEmail />
                    </span>
                    Email Verified
                  </p>
                  <p
                    className={
                        data?.postedBy?.faceVerify ? styles.faTrue : styles.faFalse
                    }
                  >
                    <span>
                      <BiFace />
                    </span>
                    Face Verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobDetails;
