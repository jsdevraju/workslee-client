import Link from "next/link";
import React from "react";

const FooterLink = ({ title, link_name, className }) => {
  return (
    <>
      <div className={className}>
        <h3>{title}</h3>
        <ul>
          {link_name.map(({ name, path }, index) => (
            <li key={index}>
              <Link href={path}>
                <a>{name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FooterLink;
