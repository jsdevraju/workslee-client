import styles from "./Footer.module.css";
import Image from "next/image";
import FooterLink from "../../components/footer/FooterLink";
import {
  FaDribbble,
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import Icon from "../icon/Icon";
const Footer = () => {
  const resourceMenu = [
    {
      name: "Install App",
      path: "/",
    },
    {
      name: "Categories",
      path: "/",
    },
    {
      name: "Why WorksLee",
      path: "/",
    },
  ];
  const linksMenu = [
    {
      name: "Become a WorksLee",
      path: "/",
    },
    {
      name: "About us",
      path: "/",
    },
    {
      name: "Find Works",
      path: "/",
    },
  ];
  const legalMenu = [
    {
      name: "Privacy Policy",
      path: "/",
    },
    {
      name: "Terms & Conditions",
      path: "/",
    },
    {
      name: "Licensing",
      path: "/",
    },
  ];

  return (
    <>
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.row}>
            <div className={styles.leftSide}>
              <Image
                src={"https://www.workslee.com/workslee-logo-light.svg"}
                alt="Razu Islam"
                width={200}
                height={"100%"}
                className="logo"
              />
              <p className={styles.footerText}>
                WorksLee is a peer-to-peer marketplace designed to help people
                manage their daily workload. It's a place where we are
                empowering small local entrepreneurs. and helping people to earn
                by part-time handy work.
              </p>
            </div>
            <div className={styles.rightSide}>
              <div className={styles.footer_links}>
                <FooterLink
                  title="RESOURCES"
                  link_name={resourceMenu}
                  className={styles.footerMenu}
                />
                <FooterLink
                  title="LINKS"
                  link_name={linksMenu}
                  className={styles.footerMenu}
                />
                <FooterLink
                  title="LEGAL"
                  link_name={legalMenu}
                  className={styles.footerMenu}
                />
              </div>
            </div>
          </div>
          {/* Social media Info */}
          <div className={styles.socialMedia}>
            <p className={styles.footerText}>
              © {new Date().getFullYear()} WorksLee. All Rights Reserved.
            </p>
            <div className={styles.socialMedia_icons}>
              <Icon icon={<FaFacebookF />} url="https://www.workslee.com" />
              <Icon icon={<FaLinkedin />} url="https://www.workslee.com" />
              <Icon icon={<FaTwitter />} url="https://www.workslee.com" />
              <Icon icon={<FaGithub />} url="https://www.workslee.com" />
              <Icon icon={<FaDribbble />} url="https://www.workslee.com" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
