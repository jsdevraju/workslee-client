import Meta from "../app/components/meta/Meta";
import Button from "../app/components/button/Button";
import styles from "../styles/About.module.css";

const About = () => {
  return (
    <>
      <Meta title={"Works Lee - About"} />
      <section className={styles.about}>
        <div className="container">
          <div className={styles.aboutContent}>
            <h1 className={styles.aboutContentTitle}>About WorksLee</h1>
            <p className={styles.aboutDescription}>
              WorksLee is a peer-to-peer marketplace designed to help people
              manage their daily workload. It's a place where we are empowering
              small local entrepreneurs. and helping people to earn by part-time
              handy work.
            </p>
            <p className={styles.aboutDescription}>
              WorksLee creating the opportunity for more hardworking individuals
              to work for themselves and earn supplemental income completing
              tasks through . At WorksLee, we have created a platform that lets
              you connect with people from your area to get any job done
            </p>
            <Button text="Learn More" className="app_btn" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
