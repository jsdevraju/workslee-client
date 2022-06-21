import Map from "../app/components/map/Map";
import PostJobCard from "../app/components/postJobCard/PostJobCard";
import styles from "../styles/Works.module.css";
import axios from "axios";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Meta from "../app/components/meta/Meta";
import { login } from "../app/redux/userSlice";
import Loader from "../app/components/loader/Loader";
import toast from "react-hot-toast";

const Works = ({ jobs }) => {
  const mapRef = useRef();
  const [showMap, setShowMap] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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
    } else setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Meta title={"Works Lee - find works"} />
          <section className={styles.Works}>
            <div className={styles.container}>
              <div className={styles.postedJob}>
                {/* Job Filter header */}
                <div className={styles.postHeader}>
                  <div className={styles.leftHeader}>
                    <h3>{jobs?.length} work found</h3>
                    <p>You can filter your result as well</p>
                  </div>
                  <div className={styles.rightHeader}>
                    <p onClick={() => setShowMap(!showMap)}>{showMap ? "Hide Map" : "Show Map"}</p>
                  </div>
                </div>
                {/* Job Filter end header */}
                {showMap && (
                  <div className={`${styles.map} ${styles.scrollMap}`}>
                    <Map
                      mapStyle={
                        "mapbox://styles/jsdevrazu/cl4ld602o003u14qqawx0xc5z"
                      }
                      mapRef={mapRef}
                      jobs={jobs}
                    />
                  </div>
                )}
                {jobs &&
                  jobs?.map((job) => <PostJobCard key={job._id} job={job} />)}
              </div>
              <div className={styles.map}>
                <Map
                  mapStyle={
                    "mapbox://styles/jsdevrazu/cl4ld602o003u14qqawx0xc5z"
                  }
                  mapRef={mapRef}
                  jobs={jobs}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs`);
  const jobs = data?.job;
  return { props: { jobs } };
};

export default Works;
